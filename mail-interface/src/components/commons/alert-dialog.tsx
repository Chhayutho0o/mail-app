import {
  AlertDialog as Ad,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Icons } from "@/components/commons/icons";

type AlertDialogProps = {
  showDialog: boolean;
  setShowDialog: (open: boolean) => void;
  title: string;
  description?: string;
  isPending?: boolean;
  onAction: () => void;
};

export default function AlertDialog({
  showDialog = false,
  setShowDialog,
  title,
  description,
  isPending,
  onAction,
}: AlertDialogProps) {
  return (
    <Ad open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async (e) => {
              e.preventDefault();
              onAction();
            }}
            className="bg-red-600 focus:ring-red-600"
          >
            {isPending ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.trash className="mr-2 h-4 w-4" />
            )}
            <span>Delete</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </Ad>
  );
}
