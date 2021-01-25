import React, { useState } from "react";
import StarParse from "./StarParse";
import StarResults from "./StarResults";
import Results from "./Results";
import "./styles.css";

const defaultCSV = `Adam,Becky,Cindy,Dylan,Eliza
// By default, the election is a TIE between Dylan and Eliza.

// Edit the LAST number in the following row to change the election results
// If you leave it as 3, the election is a TIE
// If you set it below 3, Dylan wins!
// If you set it above 3, Eliza wins!

0,0,5,3,3

// The remaining rows are ballots for each of the other voters in the election.
4,0,3,3,2
0,0,0,3,1
2,0,0,3,4
0,0,0,0,0
1,5,0,3,5
0,0,0,0,0
`;

export default function App() {
  const [csv, setCsv] = useState(defaultCSV);
  const [results, setResults] = useState("");

  return (
    <div className="App">
      <h1>STAR Election Data Processor</h1>
      <p>
        Copy your election data from a spreadsheet with one column per candidate
        and one row per voter. The first row should be list the candidate names.
        Subsequent rows should contain numbers in the range 0-5 representing the
        score each voter gave each candidate.
      </p>
      <textarea
        rows="10"
        spellCheck="false"
        onBlur={(e) => setCsv(e.target.value)}
        defaultValue={defaultCSV}
      />
      <button
        onClick={() => {
          const { candidates, votes } = StarParse(csv);
          const cvr = StarResults(candidates, votes);
          setResults(cvr);
        }}
      >
        Process STAR Election
      </button>
      {!!results && <Results data={results} />}
    </div>
  );
}
