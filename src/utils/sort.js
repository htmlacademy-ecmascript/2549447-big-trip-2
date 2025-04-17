import { SortingType } from '../const.js';

const sort = {
  [SortingType.DAY]: (tripPoints) => tripPoints.filter((point) => point !== undefined),
  [SortingType.EVENT]: (tripPoints) => tripPoints.filter((point) => point !== undefined),
  [SortingType.TIME]: (tripPoints) => tripPoints.filter((point) => point !== undefined),
  [SortingType.PRICE]: (tripPoints) => tripPoints.filter((point) => point !== undefined),
  [SortingType.OFFERS]: (tripPoints) => tripPoints.filter((point) => point !== undefined),
};

export {
  sort,
};
