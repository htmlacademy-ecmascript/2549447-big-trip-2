import { FilterType } from '../const.js';

const filter = {
  [FilterType.EVERYTHING]: (tripPoints) => tripPoints.filter((point) => point !== undefined),
  [FilterType.FUTURE]: (tripPoints) => tripPoints.filter((point) => point !== undefined),
  [FilterType.PRESENT]: (tripPoints) => tripPoints.filter((point) => point !== undefined),
  [FilterType.PAST]: (tripPoints) => tripPoints.filter((point) => point !== undefined),
};

export {
  filter,
};
