export default function Header() {
  return (
    <div className="flex justify-between mx-4 my-2">
      <div className="flex items-center space-x-4 font-bold text-xl">
        <img src="/bank16.png" alt="Bank Logo" className="h-5 w-5"/>
        <span>Kenya Bank and Branch Finder</span>
      </div>
      <h3 className="text-yellow-500 italic">
        <strong>* Disclaimer:</strong> Not all data is complete or accurate,
        please bear with me as I make these corrections
      </h3>
    </div>
  );
}

