import { createElement } from '../render.js';

function createTripPointItemTemplate() {
  return `<li class="trip-events__item">
  </li>`;
}

export default class TripPointItemtView {
  getTemplate() {
    return createTripPointItemTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
