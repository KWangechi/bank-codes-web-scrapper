import {
  // InformationCircleIcon,
  PencilSquareIcon,
  // QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import BankLocationSuggestion from "./BankLocationSuggestion";

export default function Header({ onShowSuggestion, children }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-background-dark border-b border-primary/10 dark:border-primary/20">
      <div className="flex justify-between items-center mx-6">
        <div className="flex items-center space-x-2 font-bold text-xl p-4">
          <img src="/bank16.png" alt="Bank Logo" className="h-4 w-4" />
          <span className="text-xl font-bold tracking-tight text-primary dark:text-white">
            Kenya Bank Info Finder
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/KWangechi/bank-codes-web-scrapper"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:text-primary flex items-center gap-1 hover:bg-none transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <span className="text-gray-800">
              <i className="fa-brands fa-github text-lg"></i>
            </span>
            <span>GitHub</span>
          </a>

          <a
            href="https://x.com/Keshi72438439/status/1819783749535449136"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:text-primary flex items-center gap-1 hover:bg-none transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <span className="text-blue-400">
              <i className="fa-brands fa-twitter text-lg"></i>
            </span>
            <span>Twitter</span>
          </a>

          <button
            onClick={handleClickOpen}
            className="text-sm font-medium hover:text-primary flex items-center gap-1 hover:bg-none transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <PencilSquareIcon className="h-5 w-5 text-gray-800" />
            <span>Suggestions</span>
          </button>
        </nav>
      </div>

      {/* Dialog for suggestions */}
      <Dialog open={open} onClose={handleClose} className="w-full">
        <BankLocationSuggestion handleClose={handleClose} />
      </Dialog>

      {/* Disclaimer */}
      {/* <InformationCircleIcon className="h-4 w-4 text-yellow-600" /> */}
      {/* <h2 className="text-yellow-600 italic text-md font-medium">
          <span className="font-bold">Disclaimer:</span> Data is still under
          review
        </h2> */}

    </header>
  );
}
