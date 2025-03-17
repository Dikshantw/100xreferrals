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
import formSchema from "@/lib/zod-schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type FormValues = z.infer<typeof formSchema>;

const FormPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const submissions = await res.json();
      console.log(submissions);
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} />
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
                  <Input placeholder="+1234567890" {...field} />
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
                  <Input placeholder="https://github.com/username" {...field} />
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
                  <Input {...field} />
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
                  >
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="50%" />
                      </FormControl>
                      <FormLabel>50%</FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="80%" />
                      </FormControl>
                      <FormLabel>80%</FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="100%" />
                      </FormControl>
                      <FormLabel>100%</FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="none" />
                      </FormControl>
                      <FormLabel>None</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default FormPage;
