//import { Winners } from "./testHelpers";
import StarParse from "../StarParse";
import StarResults from "../StarResults";
//import sumArray from "../StarResults";

function ElectionResultsFromText(csv) {
  const { candidates, votes } = StarParse(csv);
  return StarResults(candidates, votes);
}

test("Prop Test 1", () => {
  const csv = `c1, c2, c3, c4, c5, c6, c7, c8
  4, 0, 3, 3, 3, 1, 3, 2
  4, 0, 0, 4, 2, 1, 0, 1
  1, 0, 1, 4, 3, 0, 3, 0
  2, 3, 0, 1, 3, 3, 3, 0
  1, 1, 1, 0, 2, 4, 3, 3
  2, 4, 2, 0, 0, 4, 0, 4
  1, 4, 1, 2, 2, 0, 1, 1
  1, 1, 3, 3, 2, 3, 0, 3
  4, 1, 2, 4, 3, 4, 4, 4
  3, 4, 4, 4, 0, 4, 3, 2
  0, 1, 1, 3, 0, 0, 1, 2
  4, 2, 0, 3, 2, 2, 0, 1
  0, 2, 2, 3, 2, 3, 2, 1
  2, 3, 3, 3, 2, 3, 4, 1
  2, 3, 1, 2, 1, 4, 2, 3
  `;

  const results = ElectionResultsFromText(csv);
  //propWinners = [];
  //results.prop.winners.foreach((w,i) => {
  //  propWinners.push(w.name);
  //});
  const expectedWinners = ["c4", "c6", "c1"];
  const expectedSplitPoints = [0.8, 0.6, 0.0];
  const expectedSpentAbove = [0, 3.0, 4.5];
  const expectedWeightOnSplits = [4.0, 4.0, 1.5];

  //const expected = ["c4", "c1", "c1"];
  var propWinners = [];
  var winners = results.pr.winners;
  for (let i = 0; i < winners.length; i++) {
    propWinners.push(winners[i].name);
  }
  var propSplitPoints = results.pr.debuginfo.splitPoints;
  var propSpentAbove = results.pr.debuginfo.spentAboves;
  var propWeightOnSplits = results.pr.debuginfo.weight_on_splits;
  //console.log(results.pr);
  //console.log(results.prop.debuginfo);

  expect(propWinners).toEqual(expectedWinners);
  expect(propSplitPoints).toEqual(expectedSplitPoints);
  expect(propSpentAbove).toEqual(expectedSpentAbove);
  expect(propWeightOnSplits).toEqual(expectedWeightOnSplits);
});

test("Prop Test 2", () => {
  const csv = `c1, c2, c3, c4, c5, c6, c7, c8
  3, 4, 0, 1, 3, 0, 0, 1
  4, 4, 1, 2, 4, 2, 4, 3
  4, 2, 4, 2, 4, 1, 1, 0
  1, 1, 1, 1, 0, 4, 1, 0
  0, 3, 2, 1, 0, 3, 1, 1
  3, 4, 0, 1, 3, 4, 2, 4
  0, 3, 1, 2, 0, 4, 1, 2
  2, 1, 0, 1, 3, 4, 3, 1
  3, 0, 0, 2, 2, 1, 3, 4
  2, 0, 0, 1, 1, 3, 0, 0
  4, 2, 4, 3, 3, 0, 3, 4
  3, 4, 4, 4, 1, 0, 4, 2
  0, 2, 4, 1, 1, 0, 2, 4
  4, 0, 4, 1, 4, 1, 0, 2
  3, 1, 2, 4, 4, 2, 2, 0
  `;

  const results = ElectionResultsFromText(csv);
  //propWinners = [];
  //results.prop.winners.foreach((w,i) => {
  //  propWinners.push(w.name);
  //});
  const expectedWinners = ["c1", "c6", "c2"];
  const expectedSplitPoints = [0.8, 0.8, 0.4];
  const expectedSpentAbove = [0, 0, 3];
  const expectedWeightOnSplits = [4.0, 4.0, 1];

  //const expected = ["c4", "c1", "c1"];
  var propWinners = [];
  var winners = results.pr.winners;
  for (let i = 0; i < winners.length; i++) {
    propWinners.push(winners[i].name);
  }
  var propSplitPoints = results.pr.debuginfo.splitPoints;
  var propSpentAbove = results.pr.debuginfo.spentAboves;
  var propWeightOnSplits = results.pr.debuginfo.weight_on_splits;
  //console.log(propWinners);
  //console.log(results.prop.debuginfo);

  expect(propWinners).toEqual(expectedWinners);
  expect(propSplitPoints).toEqual(expectedSplitPoints);
  expect(propSpentAbove).toEqual(expectedSpentAbove);
  expect(propWeightOnSplits).toEqual(expectedWeightOnSplits);
});

test("Prop Test 3", () => {
  const csv = `c1, c2, c3, c4, c5, c6, c7, c8
  0, 0, 3, 2, 3, 0, 2, 1
  3, 2, 4, 4, 4, 3, 4, 2
  3, 3, 2, 1, 2, 4, 3, 0
  4, 3, 1, 2, 0, 4, 4, 2
  4, 2, 1, 0, 2, 2, 1, 0
  1, 0, 2, 1, 1, 1, 4, 2
  3, 0, 3, 0, 2, 2, 0, 4
  2, 0, 2, 4, 1, 3, 0, 2
  1, 4, 0, 1, 1, 1, 2, 4
  2, 3, 4, 2, 0, 2, 3, 3
  0, 0, 3, 3, 0, 0, 2, 3
  1, 2, 3, 4, 3, 3, 1, 4
  2, 3, 0, 0, 2, 4, 4, 3
  2, 1, 1, 1, 2, 1, 3, 0
  1, 0, 4, 3, 1, 3, 0, 0
  `;

  const results = ElectionResultsFromText(csv);
  //propWinners = [];
  //results.prop.winners.foreach((w,i) => {
  //  propWinners.push(w.name);
  //});
  const expectedWinners = ["c7", "c3", "c1"];
  const expectedSplitPoints = [0.8, 0.6, 0.4];
  const expectedSpentAbove = [0, 2, 2];
  const expectedWeightOnSplits = [4.0, 4.0, 2];

  //const expected = ["c4", "c1", "c1"];
  var propWinners = [];
  var winners = results.pr.winners;
  for (let i = 0; i < winners.length; i++) {
    propWinners.push(winners[i].name);
  }

  var propSplitPoints = results.pr.debuginfo.splitPoints;
  var propSpentAbove = results.pr.debuginfo.spentAboves;
  var propWeightOnSplits = results.pr.debuginfo.weight_on_splits;
  //console.log(propWinners);
  //console.log(results.prop.debuginfo);

  expect(propWinners).toEqual(expectedWinners);
  expect(propSplitPoints).toEqual(expectedSplitPoints);
  expect(propSpentAbove).toEqual(expectedSpentAbove);
  expect(propWeightOnSplits).toEqual(expectedWeightOnSplits);
});
