import data from "../banks_info.json";

let banks;
let branches = [];
let totalBranches = 0;

function getAllBanks() {
  banks = data;

  // console.log(banks);

  branches = banks.map((bank) => {
    totalBranches += bank.branches.length;
    return bank.branches.map((branch) => ({
      branch_code: branch.branch_code,
      branch_name: branch.branch_name,
    }));
  });

  console.log(totalBranches);
}

export { banks, branches, getAllBanks };
