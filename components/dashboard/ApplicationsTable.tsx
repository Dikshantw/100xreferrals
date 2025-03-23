import Application from "@/app/types/applicationTypes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";

interface ApplicationTableProps {
  submissions: Application[];
  isLoading: boolean;
  handleStatusUpdate: (id: string, status: "accepted" | "rejected") => void;
}

const ApplicationsTable = ({
  submissions,
  isLoading,
  handleStatusUpdate,
}: ApplicationTableProps) => {
  return (
    <>
      <Card className="border-0">
        <CardHeader>
          <CardTitle>Applications</CardTitle>
          <CardDescription>
            Manage and review all scholarship applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-10 text-center">Loading applications...</div>
          ) : (
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
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium text-foreground">
                        {submission.name}
                      </TableCell>
                      <TableCell className="hover:font-semibold hover:text-foreground">
                        {submission.email}
                      </TableCell>
                      <TableCell className="hover:font-semibold hover:text-foreground">
                        {submission.phone}
                      </TableCell>
                      <TableCell className="hover:font-semibold hover:text-foreground">
                        <a
                          href={submission.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-links hover:underline hover:text-hovered"
                        >
                          {submission.github.replace("https://github.com/", "")}
                        </a>
                      </TableCell>
                      <TableCell className="text-links hover:font-semibold hover:text-hovered">
                        <a
                          href={submission.bestProject}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline "
                        >
                          View Project
                        </a>
                      </TableCell>
                      <TableCell className="hover:font-semibold hover:text-foreground">
                        {submission.scholarship || "None"}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            submission.status === "accepted"
                              ? "bg-green-900 text-green-200"
                              : submission.status === "rejected"
                              ? "bg-red-900 text-red-200"
                              : "bg-yellow-900 text-yellow-200"
                          }`}
                        >
                          {submission.status.charAt(0).toUpperCase() +
                            submission.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 text-green-600 hover:text-green-800 hover:bg-green-100 dark:hover:bg-green-900"
                            onClick={() =>
                              handleStatusUpdate(submission.id, "accepted")
                            }
                            disabled={submission.status === "accepted"}
                            title="Accept Application"
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Accept</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-100 dark:hover:bg-red-900"
                            onClick={() =>
                              handleStatusUpdate(submission.id, "rejected")
                            }
                            disabled={submission.status === "rejected"}
                            title="Reject Application"
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Reject</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ApplicationsTable;
