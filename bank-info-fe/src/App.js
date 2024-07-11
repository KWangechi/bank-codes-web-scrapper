// import logo from './logo.svg';
import "./App.css";
import "./index.css";

function App() {
  return (
    <div className="header mt-5">
      <div className="font-semibold text-4xl ml-12">Kenya Bank Code Search</div>

      <div className="bg-gray-400/10  h-52 mt-2 w-full flex justify-center ">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Bank/Branch Name..."
            className="rounded-md w-80 shadow-lg mt-6 px-2 py-3 text-md outline-blue-300"
          />
          {/* Should be inside the input bar */}
          <button className="bg-[#74C5D7] rounded-lg p-2 text-xl ml-4 px-6 text-white">
            Search
          </button>

          <div className="mt-6 flex justify-between">
            <select className="rounded-md w-80 shadow-lg mt-6 px-2 py-3 text-md">
              <option selected disabled>
                Filter By Name
              </option>
              <option>Bank 1</option>
            </select>

            <select
              className="rounded-md w-80 shadow-lg mt-6 ml-12 px-2 py-3 text-md"
              placeholder="Filter By Location"
            >
              <option selected disabled>
                Filter By Location
              </option>

              <option>Muranga</option>
            </select>

            <button className="rounded-md w-fit shadow-lg mt-6 ml-12 px-3 py-3 text-md bg-[#DD7E7E]/40 text-white text-md">
              Toggle Map View
            </button>
          </div>
        </div>
      </div>

      {/* <div className="results_container">
        <p>1 Result Found</p>

        <div className="result_card">
          <img src="https://via.placeholder.com/150" alt="Bank Logo" />
          <h2 className="bank_name">Ruiru Branch</h2>
          <span className="branch_code">Code: 007</span>
          <span className="open_status">Open</span>

          <div className="bank_paragraph">
            <p className="branch_name_title">Equity</p>
            <span className="code">Code: 68</span>
          </div>

          <div className="working_hours_container">
            <p className="working_hours_title">Working Hours</p>
            <span className="hours">9:00 AM - 5:00 PM</span>
          </div>

          <p>Muranga</p>
        </div>
      </div> */}
    </div>
  );
}

export default App;
