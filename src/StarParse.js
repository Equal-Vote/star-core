import Papa from "papaparse";

// Parse a CSV string representing a CVR for a STAR election
export default function StarParse(csv) {
  // Start with vanilla CSV parsing and throw errors, if invalid
  var result = Papa.parse(csv, {
    dynamicTyping: true,
    header: false,
    skipEmptyLines: true,
    comments: "//"
  });
  if (result.errors.length > 0) {
    alert(JSON.stringify(result));
    return null;
  }

  // First row of CSV is header, remaining rows are data
  const header = result.data[0];
  const data = result.data
    .slice(1)
    .filter((row) => row.some((col) => col !== null));
  return { candidates: header, votes: data };
}
