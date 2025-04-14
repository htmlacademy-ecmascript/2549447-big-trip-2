import ListSortView from '../view/list-sort-view.js';
import TripPointListView from '../view/trip-point-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import TripPointView from '../view/trip-point-view.js';
import EmptyPointsListView from '../view/empty-points-list-view.js';
import { render, replace } from '../framework/render.js';

export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #tripPointsModel = null;

  #tripPointListComponent = new TripPointListView();

  #tripPointsList = [];

  constructor({tripEventsContainer, tripPointsModel}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripPointsModel = tripPointsModel;
  }

  init() {
    this.#tripPointsList = [...this.#tripPointsModel.tripPoints];

    this.#renderTripPointsList();
  }

  #renderTripPoint(point, offersById, destination, offersByType) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const tripPointComponent = new TripPointView({
      point,
      offersById,
      destination,
      onEditClick: () => {
        replacePointToEdit();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editPointComponent = new EditPointView({
      point,
      offersByType,
      destination,
      onEditClick: () => {
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToEdit() {
      replace(editPointComponent, tripPointComponent);
    }

    function replaceEditToPoint() {
      replace(tripPointComponent, editPointComponent);
    }

    render(tripPointComponent, this.#tripPointListComponent.element);
  }

  #renderTripPointsList() {
    if (this.#tripPointsList.length === 0) {
      render(new EmptyPointsListView(), this.#tripEventsContainer);
      return;
    }

    render(new ListSortView(), this.#tripEventsContainer);
    render(this.#tripPointListComponent, this.#tripEventsContainer);

    for (let i = 0; i < this.#tripPointsList.length; i++) {
      this.#renderTripPoint(
        this.#tripPointsList[i],
        [...this.#tripPointsModel.getOfferById(this.#tripPointsList[i].type, this.#tripPointsList[i].offers)],
        this.#tripPointsModel.getDestinationById(this.#tripPointsList[i].destination),
        this.#tripPointsModel.getOfferByType(this.#tripPointsList[i].type)
      );
    }
  }
}
