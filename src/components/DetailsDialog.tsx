import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";

type Props = {};

const DetailsDialog = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger aria-label="Open details">
        <span className="flex items-center px-2 py-1 text-white rounded-md bg-slate-800">
          What is this
          <HelpCircle className="w-5 h-5 ml-1" />
        </span>
      </DialogTrigger>
      <DialogContent className="w-[70vw] max-w-[100vw] md:w-[50vw]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Benvenuto a Clarity Quiz</DialogTitle>
          <DialogDescription>
            <p className="my-2 mt-4 ">
            Sei stanco di quiz banali e ripetitivi? Dì addio all'ordinario e abbraccia lo straordinario con Quizmefy! La nostra piattaforma sta rivoluzionando l'esperienza dei quiz e dei giochi di trivia sfruttando l'immenso potenziale dell'intelligenza artificiale.
            </p>
            <hr />
            {/* Other content can be added here */}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;
