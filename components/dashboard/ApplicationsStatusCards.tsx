import { Award, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Application from "@/app/types/applicationTypes";

interface StatusCardsProps {
  submissions: Application[];
}

const ApplicationsStatusCards = ({ submissions = [] }: StatusCardsProps) => {
  const stats = {
    totalApplication: submissions?.length || 0,
    scholarShipRequest: submissions?.filter(
      (application) =>
        application.scholarship && application.scholarship !== "None"
    ).length,
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Applications
          </CardTitle>
          <Users className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {stats.totalApplication}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Applications
          </CardTitle>
          <Clock className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">9</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            ScholarShip Request
          </CardTitle>
          <Award className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {stats.scholarShipRequest}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationsStatusCards;
