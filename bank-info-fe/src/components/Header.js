import {
  InformationCircleIcon,
  PencilSquareIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import BankLocationSuggestion from "./BankLocationSuggestion";

export default function Header({ onShowSuggestion }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 font-bold text-xl p-4">
          <img src="/bank16.png" alt="Bank Logo" className="h-5 w-5" />
          <span className="text-black">Kenya Bank Info Finder</span>
        </div>

        <div className="flex gap-x-4 py-4 mr-6 items-center">
          <a
            href="https://github.com/KWangechi/bank-codes-web-scrapper"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-x-2 bg-white text-gray-800 font-semibold px-4 py-1 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-200 transform hover:-translate-y-0.5"
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
            className="flex items-center gap-x-2 bg-white text-gray-800 font-semibold px-4 py-1 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <span className="text-blue-400">
              <i className="fa-brands fa-twitter text-lg"></i>
            </span>
            <span>Twitter</span>
          </a>

          <button
            onClick={handleClickOpen}
            className="flex items-center gap-x-2 bg-white text-gray-800 font-semibold px-4 py-1 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <PencilSquareIcon className="h-5 w-5 text-gray-800" />
            <span>Suggestions</span>
          </button>

          <span
            title="Can be a new branch location or a correction"
            className="hover:cursor-pointer"
          >
            <QuestionMarkCircleIcon className="w-5 h-5" />
          </span>
        </div>
      </div>

      {/* Dialog for suggestions */}
      {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sugg</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog> */}
      <Dialog open={open} onClose={handleClose} className="w-full">
        <BankLocationSuggestion handleClose={handleClose}/>
      </Dialog>

      {/* Disclaimer */}
      <div className="flex justify-center items-center space-x-2 bg-gray-200 p-2">
        <InformationCircleIcon className="h-4 w-4 text-yellow-600" />
        <h2 className="text-yellow-600 italic text-md font-medium">
          <span className="font-bold">Disclaimer:</span> Data is still under
          review
        </h2>
      </div>
    </>
  );
}
