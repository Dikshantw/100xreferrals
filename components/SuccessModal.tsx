import { CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center">
          <CheckCircle className="h-8 w-8" />

          <DialogTitle className="text-xl font-bold mt-4">
            Application Submitted Successfully!
          </DialogTitle>
          <DialogDescription className="mt-2 text-center">
            Thank you for submitting your application. We&apos;ve received your
            information and will review it shortly.
            <span className="mt-2 block font-medium">
              Keep building amazing projects while we process your application.
              We&apos;ll notify you via email about the next steps.
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 mx-auto">
          <Button onClick={onClose} className="px-6">
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
