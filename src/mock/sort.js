import { sort } from '../utils/sort.js';

function generateSortItem(tripPoints) {
  return Object.entries(sort).map(
    ([sortingType, sortingPoints]) => ({
      type: sortingType,
      count: sortingPoints(tripPoints).length,
    }),
  );
}

export {
  generateSortItem,
};
