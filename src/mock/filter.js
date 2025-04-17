import { filter } from '../utils/filter.js';

function generateFilter(tripPoints) {
  return Object.entries(filter).map(
    ([filterType, filterPoints]) => ({
      type: filterType,
      count: filterPoints(tripPoints).length,
    }),
  );
}

export {
  generateFilter,
};
