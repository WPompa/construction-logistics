const getPagination = (page = 1, limit = 5, totalCount = 0) => {
  const currentPage = Math.max(1, Number(page));
  const currentLimit = Math.max(1, Number(limit));

  const offset = (currentPage - 1) * currentLimit;

  const totalPages = Math.ceil(totalCount / currentLimit);

  return {
    limit: currentLimit,
    offset,
    metadata: {
      totalCount,
      totalPages,
      currentPage,
      perPage: currentLimit,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    },
  };
};

module.exports = getPagination;
