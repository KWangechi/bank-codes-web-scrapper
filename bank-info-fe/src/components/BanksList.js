// this component will return all the banks and their branches
// Purpose is separation of concerns, have this component do things related to the Array<Banks>

import { NoResultCard } from "./NoResultCard";
import { ResultCard } from "./ResultCard";

export function BanksList({ banksList }) {
    // console.log(`${banksList}`);
  // if there is no searchTerm, return all the banks
  // else return only the filtered banks

  // if there is no data, return a NoResultCard component

  // add a search bar component to filter banks by name

  //   TODO:  add a pagination component to display the results in smaller chunks

  // TODO: add a sort button to sort the results by bank name or branch name

  // TODO: add a filter button to filter the results by bank type or branch type

  // TODO: add a map button to display the results on a map (using a map library like Google Maps or Leaflet)

  // TODO: add a bookmark button to save the results for later use

  // TODO: add a share button to share the results on social media

  // TODO: add a print button to print the results

  // TODO: add a download button to download the results as a CSV file

  return (
    <>
      {banksList.length > 0 ? (
        banksList.map((bank) => (
            bank?.branches.map((branch) => (
              <ResultCard
                key={`${bank.bank_code} - ${branch.branch_code} `}
                bank={bank}
                branch={branch}
              />
            ))
        ))
      ) : (
        <NoResultCard/>
      )}
    </>
  );
}
