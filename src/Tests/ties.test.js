import { Winners } from "./testHelpers";
import StarParse from "../StarParse";
import StarResults from "../StarResults";

function ElectionResultsFromText(csv) {
  const { candidates, votes } = StarParse(csv);
  return StarResults(candidates, votes);
}

test("Condorcet Winner Test", () => {
  const csv = `Allison	Bill	Carmen	Doug
  5	2	1	4
  5	2	1	0
  5	2	1	0
  5	2	1	0
  5	3	4	0
  5	1	4	0
  5	1	4	0
  4	0	5	1
  3	4	5	0
  3	5	5	5
  `;
  const { single } = ElectionResultsFromText(csv);
  const expected = [["Allison"], ["Carmen"], ["Bill", "Doug"]];
  expect(Winners(single)).toEqual(expected);
});

test("Runner Up Tie Test", () => {
  const csv = `Allison	Bill	Carmen	Doug
  5	4	3	3
  4	5	1	1
  4	5	1	2
  3	5	1	0
  5	4	3	0
  5	0	4	1
  5	0	4	0
  4	0	5	1
  3	4	5	0
  3	5	5	4
  `;
  const { single } = ElectionResultsFromText(csv);
  const expected = [["Allison"], ["Bill", "Carmen"], ["Doug"]];
  expect(Winners(single)).toEqual(expected);
});

test("True Tie Test", () => {
  const csv = `Allison	Bill	Carmen	Doug
  5	4	1	4
  5	4	1	4
  2	4	1	2
  4	3	2	1
  0	5	4	4
  3	2	4	2
  3	1	5	3
  3	1	5	3
  1	3	2	2
  4	3	5	5
  `;
  const { single } = ElectionResultsFromText(csv);
  const expected = [["Allison", "Bill", "Carmen"], [], ["Doug"]];
  expect(Winners(single)).toEqual(expected);
});

test("PR Ties", () => {
  const csv = `Allison	Bill	Carmen	Doug
  5	4	1	4
  5	4	1	4
  2	4	1	2
  4	3	2	1
  0	5	4	4
  3	2	4	2
  3	1	5	3
  3	1	5	3
  1	3	2	2
  4	3	5	5
  `;

  const results = ElectionResultsFromText(csv);
  //propWinners = [];
  //results.prop.winners.foreach((w,i) => {
  //  propWinners.push(w.name);
  //});
  const expectedWinners = ["Allison", "Carmen", "Bill"];

  //const expected = ["c4", "c1", "c1"];
  var propWinners = [];
  var winners = results.pr.winners;
  for (let i = 0; i < winners.length; i++) {
    propWinners.push(winners[i].name);
  }

  //console.log(propWinners);
  //console.log(results.pr);

  expect(propWinners).toEqual(expectedWinners);
  expect(3).toEqual(results.pr.ties[0].length);
});
