const getPagination = (page, size) => {
  const limit = size;
  const offset = 0 + (page - 1) * limit;
  // console.log(limit, offset)
  return { limit, offset };
};
const getPagingData = (data1, page, limit) => {
  const { count: total, rows: data } = data1;
  const per_page = limit;
  const from = 1;
  const to = limit;
  const current_page = page ? +page : 0;
  const last_page = Math.ceil(total / limit);

  return { total, data, last_page, current_page, per_page, from, to };
};
module.exports = {
  getPagination,
  getPagingData,
};
