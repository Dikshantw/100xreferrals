"use client";
import Application from "@/app/types/applicationTypes";
import ApplicationsStatusCards from "@/components/dashboard/ApplicationsStatusCards";
import ApplicationsTable from "@/components/dashboard/ApplicationsTable";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [submissions, setSubmissions] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  async function isAdmin() {
    const res = await fetch("/api/admin_check");
    const admin = await res.json();

    return admin.isAdmin;
  }

  async function getSubmissions() {
    const res = await fetch("/api/submissions");
    const data = await res.json();

    return data;
  }
  useEffect(() => {
    const fetchData = async () => {
      const admin = await isAdmin();
      if (!admin) {
        router.push("/login");
      }

      const data = await getSubmissions();
      setSubmissions(data);
      setIsLoading(false);
    };
    fetchData();
  }, [router]);

  return (
    <>
      <div className="container py-6 m-auto px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            100<span className="text-red-600">x</span>Devs
          </h1>
        </div>
        <ApplicationsStatusCards submissions={submissions} />
        <ApplicationsTable submissions={submissions} isLoading={isLoading} />
      </div>
    </>
  );
}
