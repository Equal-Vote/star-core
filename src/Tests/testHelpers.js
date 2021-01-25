function Winners(sut, expectedWinners) {
  var winners = sut.sections.map((section) =>
    section.candidates.map((index) => sut.candidates[index].name)
  );
  return winners;
}

export { Winners };
