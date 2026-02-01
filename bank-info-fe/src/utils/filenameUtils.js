/**
 * Generates a filename for download files based on bank name
 * @param {string} bankName - The name of the bank
 * @param {string} fileType - The file type ('excel' or 'json')
 * @returns {string} The generated filename with extension
 */
export function generateDownloadFilename(bankName, fileType = "excel") {
  let filename = "bank_branches";

  if (bankName) {
    let bankPart = bankName.toLowerCase();

    // Find if "bank" exists in the name
    const bankIndex = bankPart.indexOf("bank");
    if (bankIndex > 0) {
      bankPart = bankName.substring(0, bankIndex);
    } else if (bankIndex === 0) {
      bankPart = bankName;
    } else {
      bankPart = bankName.split(" ").slice(0, 3).join(" ");
      if (bankPart.length > 20) {
        bankPart = bankPart.substring(0, 20);
      }
    }

    bankPart = bankPart
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "_");

    filename = `${bankPart.toLowerCase()}_branches`;
  }


  const extension = fileType === "json" ? "json" : "xlsx";
  return `${filename}.${extension}`;
}

/**
 * Generates Excel filename for download
 * @param {string} bankName - The name of the bank
 * @returns {string} The generated Excel filename
 */
export function generateExcelFilename(bankName) {
  return generateDownloadFilename(bankName, "excel");
}

/**
 * Generates JSON filename for download
 * @param {string} bankName - The name of the bank
 * @returns {string} The generated JSON filename
 */
export function generateJsonFilename(bankName) {
  return generateDownloadFilename(bankName, "json");
}
