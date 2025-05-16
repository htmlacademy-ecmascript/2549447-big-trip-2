import { FilterType } from '../const.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point !== undefined),
  [FilterType.FUTURE]: (points) => points.filter((point) => new Date() < new Date(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => new Date() > new Date(point.dateFrom) && new Date() < new Date(point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => new Date() > new Date(point.dateTo)),
};

export {
  filter,
};
