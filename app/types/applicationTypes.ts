export default interface Application {
    id: string;
    name: string;
    email: string;
    phone: string;
    github: string;
    bestProject: string;
    scholarship: "50%" | "80%" | "100%" | "None" | null;
    createdAt: Date;
  }