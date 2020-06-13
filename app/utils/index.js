exports.calculateRemainingPages = (count, resultsPerPage) => {
  const pagesLeft = count !== 0 ? Math.ceil(count / resultsPerPage) : 0;
  const queries = [];
  // Start from page 1 since we've already requested the first one;
  for (let i = 1; i <= pagesLeft; i += 1) {
    queries.push(`?page=${i}`);
  }
  // Shift the first page since we've already requested it
  queries.shift();
  return queries;
};

exports.mapResponseData = rawData =>
  rawData
    .map(each => (each.data ? each.data.results : []))
    .filter(each => !!each)
    .flat();
