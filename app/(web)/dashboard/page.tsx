"use client";
import Application from "@/app/types/applicationTypes";
import ApplicationsTable from "@/components/dashboard/ApplicationsTable";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [submissions, setSubmissions] = useState<Application[]>([]);

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
    };
    fetchData();
  }, [router]);

  return (
    <>
      <ApplicationsTable submissions={submissions} />
    </>
  );
}
