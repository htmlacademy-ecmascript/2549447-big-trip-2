import AbstractView from '../framework/view/abstract-view.js';

function createSortItemTempalate (sort, currentSortType) {
  const {type, count} = sort;

  return `<div class="trip-sort__item  trip-sort__item--${ type }">
      <input id="sort-${ type }"
      class="trip-sort__input  visually-hidden"
      type="radio" name="trip-sort"
      value="sort-${ type }"
      data-sort-type="${ type }"
      ${currentSortType === type ? 'checked' : ''}
      ${count === 0 || type === 'event' || type === 'offers' ? 'disabled' : ''}
      />
      <label class="trip-sort__btn" for="sort-${ type }">${ type }</label>
    </div>`;
}

function createListSortTemplate(sortItems, currentSortType) {
  const sortItemsTemplate = sortItems
    .map((sortItem) => createSortItemTempalate(sortItem, currentSortType))
    .join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${ sortItemsTemplate }
  </form>`;
}

export default class ListSortView extends AbstractView {
  #sortItems = null;
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({sortItems, currentSortType, onSortTypeChange}) {
    super();
    this.#sortItems = sortItems;
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createListSortTemplate(this.#sortItems, this.#currentSortType, this.#handleSortTypeChange);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
