import ListSortView from '../view/list-sort-view.js';
import TripPointListView from '../view/trip-point-list-view.js';
import NewPointView from '../view/new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import TripPointView from '../view/trip-point-view.js';
import { render } from '../render.js';

export default class TripEventsPresenter {
  tripPointListComponent = new TripPointListView();

  constructor({tripEventsContainer}) {
    this.tripEventsContainer = tripEventsContainer;
  }

  init() {
    render(new ListSortView(), this.tripEventsContainer);
    render(this.tripPointListComponent, this.tripEventsContainer);
    render(new NewPointView(), this.tripPointListComponent.getElement());
    render(new EditPointView(), this.tripPointListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new TripPointView(), this.tripPointListComponent.getElement());
    }
  }
}
