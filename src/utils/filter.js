import { FilterType } from '../const.js';

const filter = {
  [FilterType.EVERYTHING]: (tripPoints) => tripPoints.filter((point) => point !== undefined),
  [FilterType.FUTURE]: (tripPoints) => tripPoints.filter((point) => new Date() < new Date(point.dateFrom)),
  [FilterType.PRESENT]: (tripPoints) => tripPoints.filter((point) => new Date() > new Date(point.dateFrom) && new Date() < new Date(point.dateTo)),
  [FilterType.PAST]: (tripPoints) => tripPoints.filter((point) => new Date() > new Date(point.dateTo)),
};

export {
  filter,
};
