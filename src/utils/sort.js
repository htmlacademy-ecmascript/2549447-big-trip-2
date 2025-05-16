import { SortingType } from '../const.js';

function generateSortTypesList() {
  return Object.values(SortingType);
}

export {
  generateSortTypesList,
};
