// import logo from './logo.svg';
import "./App.css";
import "./index.css"

function App() {
  return (
    <div className="">
      <div className=" bg-blue-500">Kenya Bank Code Search</div>

      <div className="search-bar">
        <input type="text" placeholder="Enter Bank Code" />
        <button>Search</button>

        <select >
          <option>Bank 1</option>
        </select>

        <select>
          <option>Muranga</option>
        </select>

        <button className="toggle_map_btn">Toggle Map View</button>
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
