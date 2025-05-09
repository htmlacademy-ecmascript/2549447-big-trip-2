import AbstractView from '../framework/view/abstract-view.js';

function createFilterTemplate(filter, isChecked) {
  const {type, count} = filter;

  return `<div class="trip-filters__filter">
      <input
        id="filter-${ type }"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${ type }"
        ${isChecked ? 'checked' : ''}
        ${count === 0 ? 'disabled' : ''}
      />
      <label class="trip-filters__filter-label" for="filter-everything">${ type }</label>
    </div>`;
}

function createListFilterTemplate(filterItems) {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterTemplate(filter, index === 0))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
}

export default class ListFilterView extends AbstractView {
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createListFilterTemplate(this.#filters);
  }
}
