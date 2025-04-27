import AbstractView from '../framework/view/abstract-view.js';

function createSortItemTempalate (sort, isChecked) {
  const {type, count} = sort;

  return `<div class="trip-sort__item  trip-sort__item--${ type }">
      <input id="sort-${ type }"
      class="trip-sort__input  visually-hidden"
      type="radio" name="trip-sort"
      value="sort-${ type }"
      ${isChecked ? 'checked' : ''}
      ${count === 0 || type === 'event' || type === 'offers' ? 'disabled' : ''}
      />
      <label class="trip-sort__btn" for="sort-${ type }">${ type }</label>
    </div>`;
}

function createListSortTemplate(sortItems) {
  const sortItemsTemplate = sortItems
    .map((sortItem, index) => createSortItemTempalate(sortItem, index === 0))
    .join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${ sortItemsTemplate }
  </form>`;
}

export default class ListSortView extends AbstractView {
  #sortItems = null;

  constructor({sortItems}) {
    super();
    this.#sortItems = sortItems;
  }

  get template() {
    return createListSortTemplate(this.#sortItems);
  }
}
