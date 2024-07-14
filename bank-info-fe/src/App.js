// import logo from './logo.svg';
// import "./App.css";
import "./index.css";
import { banks, getAllBanks } from "./api/bank-store";
// import data from "../src/banks_info.json"

function App() {
  getAllBanks();
  console.log(banks);

  // const searchTerm = useState([]);

  return (
    <div className="header mt-5 h-screen">
      <div className="font-semibold text-4xl text-center text-[#695958]">
        Kenya Bank Code Search
      </div>
      <div className="bg-[#B6C8A9] text-center py-8 mt-5 shadow-sm">
        <h4 className="italic text-md mt-4 text-[#695958]">
          Search for all the Banks in Kenya, their codes, their branches info,
          and additional details such as Opening Hours. You can filter by Bank
          Name and Location.
        </h4>
        <div className="mt-6 flex justify-center">
          <input
            type="text"
            placeholder="Search Bank/Branch Name... e.g KCB"
            className="rounded-md w-2/3 md:w-1/2 shadow-lg px-4 py-3 text-md outline-none focus:ring-2 focus:ring-[#695958]"
          />
          <button className="ml-3 bg-[#695958] rounded-lg text-lg px-4 py-2 text-white shadow hover:bg-[#5a4d4d] transition duration-300">
            Search
          </button>
          <button className="ml-3 bg-[#695958] rounded-lg text-lg px-4 py-2 text-white shadow hover:bg-[#5a4d4d] transition duration-300">
            Filter
          </button>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <span className="font-semibold text-xl italic text-[#695958]">
          1 Result Found
        </span>
      </div>

      {/* {banks} */}
      <div className="mt-6 flex justify-center">
        <div className="rounded-lg shadow-xl bg-grey-200 w-3/4 p-6">
          <div className="flex items-center mb-4">
            <img
              src="https://simpauldesign.com/wp-content/uploads/2019/10/equity-bank-new-logo.png"
              alt="Bank Logo"
              className="h-16 w-16 rounded-lg"
            />
            <div className="ml-4 flex-grow">
              <h2 className="font-bold text-xl text-[#695958]">Ruiru Branch</h2>
              <div className="flex items-center text-gray-600">
                <span className="text-lg">Code: 007</span>
                <span className="mx-2">•</span>
                <span className="text-green-600 font-bold">Open</span>
              </div>
            </div>
            <div className="flex text-right">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.14 2 5 5.14 5 9c0 4.69 7 13 7 13s7-8.31 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
              </svg>
              <span className="ml-1 text-gray-500">Ruiru, Kenya</span>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-semibold text-[#695958]">Equity</p>
                <span className="text-gray-600">Code: 68</span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-[#695958]">Working Hours</p>
                <span className="text-gray-600">
                  8:00am - 5:00pm - Weekdays
                </span>
              </div>
            </div>
            <div className="mb-4">
              <p className="font-semibold text-[#695958]">Contact Info</p>
              <span className="text-gray-600">07898990899 | 0709008004</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
