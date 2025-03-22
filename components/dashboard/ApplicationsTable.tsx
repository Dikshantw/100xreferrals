import Application from "@/app/types/applicationTypes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ApplicationTableProps {
  submissions: Application[];
}

const ApplicationsTable = ({ submissions }: ApplicationTableProps) => {
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
};

export default ApplicationsTable;
