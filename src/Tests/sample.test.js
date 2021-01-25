import { Winners } from "./testHelpers";
import StarParse from "../StarParse";
import StarResults from "../StarResults";

function ElectionResultsFromText(csv) {
  const { candidates, votes } = StarParse(csv);
  return StarResults(candidates, votes);
}

const csv = `Adam,Becky,Cindy,Dylan,Eliza
0,0,5,3,3
4,0,3,3,2
0,0,0,3,1
2,0,0,3,4
0,0,0,0,0
1,5,0,3,5
0,0,0,0,0
`;

test("Single Winner Tie", () => {
  const { single } = ElectionResultsFromText(csv);
  const expected = [["Dylan", "Eliza"], [], ["Cindy", "Adam", "Becky"]];
  expect(Winners(single)).toEqual(expected);
});
