// import logo from './logo.svg';
import "./App.css";
import "./index.css";

function App() {
  return (
    <div className="header mt-12 ml-12">
      <div className="font-semibold text-4xl ml-12">Kenya Bank Code Search</div>

      <div className="bg-gray-400 opacity-40 h-40 mt-2 w-full">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter Bank Name"
            className="rounded-md w-100 h-10 shadow-lg mt-6 ml-12"
          />
          {/* Should be inside the input bar */}
          <button className="bg-blue-400 rounded-lg p-2 text-xl ml-4">Search</button>

          <div className="mt-6 ml-12 ">
          <select>
            <option>Bank 1</option>
          </select>

          <select>
            <option>Muranga</option>
          </select>

          <button className="toggle_map_btn">Toggle Map View</button>
          </div>
        </div>
      </div>

      <div className="results_container">
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
      </div>
    </div>
  );
}

export default App;
