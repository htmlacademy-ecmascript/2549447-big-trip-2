import ListSortView from '../view/list-sort-view.js';
import TripPointListView from '../view/trip-point-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import TripPointView from '../view/trip-point-view.js';
import { render, RenderPosition } from '../render.js';

export default class TripEventsPresenter {
  tripPointListComponent = new TripPointListView();

  constructor({tripEventsContainer, tripPointsModel}) {
    this.tripEventsContainer = tripEventsContainer;
    this.tripPointsModel = tripPointsModel;
  }

  init() {
    this.tripPointsList = [...this.tripPointsModel.getTripPoints()];

    render(new ListSortView(), this.tripEventsContainer);
    render(this.tripPointListComponent, this.tripEventsContainer);

    for (let i = 1; i < this.tripPointsList.length; i++) {
      render(new TripPointView({
        point: this.tripPointsList[i],
        offers: [...this.tripPointsModel.getOfferById(this.tripPointsList[i].type, this.tripPointsList[i].offers)],
        destination: this.tripPointsModel.getDestinationById(this.tripPointsList[i].destination)

      }), this.tripPointListComponent.getElement());
    }

    render(new EditPointView({
      point: this.tripPointsList[0],
      offers: this.tripPointsModel.getOfferByType(this.tripPointsList[0].type),
      destination: this.tripPointsModel.getDestinationById(this.tripPointsList[0].destination)
    }), this.tripPointListComponent.getElement(), RenderPosition.AFTERBEGIN);
  }
}
