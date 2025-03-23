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

interface ApplicationTableProps {
  submissions: Application[];
  isLoading: boolean;
}

const ApplicationsTable = ({
  submissions,
  isLoading,
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
