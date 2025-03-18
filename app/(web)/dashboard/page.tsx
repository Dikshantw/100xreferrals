"use client";
import Application from "@/app/types/applicationTypes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Github</TableHead>
              <TableHead>Best Project</TableHead>
              <TableHead>Scholarship</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell className="font-medium">{submission.name}</TableCell>
                <TableCell>{submission.email}</TableCell>
                <TableCell>{submission.phone}</TableCell>
                <TableCell>
                  <a
                    href={submission.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {submission.github.replace("https://github.com/", "")}
                  </a>
                </TableCell>
                <TableCell>
                  <a
                    href={submission.bestProject}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                  </a>
                </TableCell>
                <TableCell>{submission.scholarship || "None"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
