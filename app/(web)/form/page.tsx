"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import formSchema from "@/lib/zod-schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import SuccessModal from "@/components/SuccessModal";

type FormValues = z.infer<typeof formSchema>;

const FormPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      github: "",
      bestProject: "",
      scholarship: null,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const applicationData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        github: data.github,
        bestProject: data.bestProject,
        scholarship: data.scholarship || null,
      };

      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });
      const result = await res.json();
      if (!res.ok) {
        if (res.status === 409) {
          toast.error("This email or GitHub has already been submitted.");
        } else {
          toast.error(result.error || "Something went wrong.");
        }
        return;
      }
      setShowSuccessModal(true);
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  function handleCloseSuccessModal(): void {
    setShowSuccessModal(false);
  }

  return (
    <div className="container max-w-3xl m-auto px-8 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold ">Referral Application</h1>
        <Link href="/login">
          <Button variant="outline" className="hover:cursor-pointer">
            Admin Login
          </Button>
        </Link>
      </div>
      <Card className=" py-0 rounded-lg shadow-lg">
        <CardHeader className=" p-6 space-y-1.5 rounded-lg">
          <CardTitle className="">Student Information</CardTitle>
          <CardDescription>
            Fill out the form below to apply for a Super30 and Referrals.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Example@user.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+913456789064" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub Profile URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/username"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Must be unique and a valid GitHub profile URL
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bestProject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Best Project URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/username/project"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Link to your best project (GitHub, portfolio, etc.)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scholarship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      How much scholarship do you want based on your profile?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value || undefined}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="50%" />
                          </FormControl>
                          <FormLabel className="font-normal">50%</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="80%" />
                          </FormControl>
                          <FormLabel className="font-normal">80%</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="100%" />
                          </FormControl>
                          <FormLabel className="font-normal">100%</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="none" />
                          </FormControl>
                          <FormLabel className="font-normal">None</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full hover:cursor-pointer"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <SuccessModal open={showSuccessModal} onClose={handleCloseSuccessModal} />
    </div>
  );
};

export default FormPage;
