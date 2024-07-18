// request the banks-info.json file to get the banks info
import data from "../banks_info.json";
let banks;
let branch;
let branches = [];
let bank = null;

function getAllBanks() {
  banks = data;

  console.log(banks);



  // get the banks info from the JSON file
  //   fetch("../banks_info.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // create an array of objects with bank names and codes
  //       banks = data.map((bank) => ({
  //         name: bank.bank_name,
  //         code: bank.bank_code,
  //       }));
  //     });
}
// fetch(
//   "../../../banks_info.json"
// )
//   .then((response) => response.json())
//   .then((data) => {
//     // create an array of objects with bank names and codes
//     banks = data.map((bank) => ({
//       name: bank.bank_name,
//       code: bank.bank_code,
//     }));

//     console.log(banks);

//     // sort the banks array alphabetically by name
//     banks.sort((a, b) => a.name.localeCompare(b.name));

//     // create a new array of objects with only the unique bank names
//     const uniqueBanks = [...new Set(banks.map((bank) => bank.name))].map(
//       (name) => ({
//         name,
//       })
//     );

//     //

//     // render the banks in the dropdown menu
//     uniqueBanks.forEach((bank) => {
//       const option = document.createElement("option");
//       option.textContent = bank.name;
//       option.value = bank.name;
//       document.getElementById("bank-dropdown").appendChild(option);
//     });

//     // handle the change event of the dropdown menu
//     document.getElementById("bank-dropdown").addEventListener("change", () => {
//       const selectedBank = document.getElementById("bank-dropdown").value;
//       const bankInfo = banks.find((bank) => bank.name === selectedBank);

//       // render the bank's info in the table
//       document.getElementById("bank-name").textContent = bankInfo.name;
//       document.getElementById(
//         "bank-code"
//       ).textContent = `Code: ${bankInfo.code}`;

//       // fetch the branch details from the bank's API endpoint
//       fetch(`https://api.example.com/branches/${bankInfo.code}`)
//         .then((response) => response.json())
//         .then((branchDetails) => {
//           // render the branch details in the table
//           document.getElementById("branch-name").textContent =
//             branchDetails.name;
//           document.getElementById(
//             "branch-code"
//           ).textContent = `Code: ${branchDetails.code}`;
//           document.getElementById("branch-address").textContent = "";
//           document.getElementById("open-status").textContent =
//             branchDetails.open ? "Open" : "Closed";
//           document.getElementById("working-hours").textContent =
//             branchDetails.workingHours;
//           document.getElementById(
//             "equity-code"
//           ).textContent = `Code: ${branchDetails.equityCode}`;
//           document.getElementById("equity-name").textContent =
//             branchDetails.equityName;
//           document.getElementById("equity-address").textContent =
//             branchDetails.equityAddress;
//           document.getElementById("equity-working-hours").textContent =
//             branchDetails.equityWorkingHours;

//           // fetch the branch's photo from the bank's API endpoint
//           fetch(`https://api.example.com/photos/${bankInfo.code}`)
//             .then((response) => response.blob())
//             .then((blob) => {
//               const url = URL.createObjectURL(blob);
//               document.getElementById("bank-logo").src = url;
//             });
//         });
//     });
//   });
// getBanksInfo();

export { bank, banks, branch, branches, getAllBanks };
