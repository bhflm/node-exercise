exports.calculateRemainingPages = (count, resultsPerPage) =>
  count !== 0 ? Math.ceil(count / resultsPerPage) : 0;

exports.buildPageQueriesArray = pagesLeft => {
  const pages = [];
  // Start from page 1 since we've already requested the first one;
  for (let i = 1; i <= pagesLeft; i += 1) {
    pages.push(`?page=${i}`);
  }
  // Shift the first page since we've already requested it
  pages.shift();
  return pages;
};
