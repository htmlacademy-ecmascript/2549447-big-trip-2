import ListFilterView from '../view/list-filter-view.js';
import { generateFilter } from '../mock/filter.js';
import ListSortView from '../view/list-sort-view.js';
import TripPointListView from '../view/trip-point-list-view.js';
import EmptyPointsListView from '../view/empty-points-list-view.js';
import { render } from '../framework/render.js';
import { generateSortItem } from '../mock/sort.js';
import TripEventPresenter from './trip-event-presenter.js';

export default class TripEventsPresenter {
  #tripMainElement = document.querySelector('.trip-main');
  #tripContolsFiltersElement = this.#tripMainElement.querySelector('.trip-controls__filters');
  #tripEventsContainer = null;
  #tripPointsModel = null;

  #tripPointListComponent = new TripPointListView();

  #tripPointsList = [];

  #pointPresentersList = new Map();

  constructor({tripEventsContainer, tripPointsModel}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripPointsModel = tripPointsModel;
  }

  init() {
    this.#renderFilters();

    this.#tripPointsList = [...this.#tripPointsModel.tripPoints];

    this.#renderTripPointsList();
  }

  #renderFilters() {
    const filters = generateFilter(this.#tripPointsModel.tripPoints);
    render(new ListFilterView({filters}), this.#tripContolsFiltersElement);
  }

  #renderTripPointsList() {
    if (this.#tripPointsList.length === 0) {
      render(new EmptyPointsListView(), this.#tripEventsContainer);
      return;
    }

    const sortItems = generateSortItem(this.#tripPointsList);

    render(new ListSortView({sortItems}), this.#tripEventsContainer);
    render(this.#tripPointListComponent, this.#tripEventsContainer);

    for (const point of this.#tripPointsList) {
      const tripEventPresenter = new TripEventPresenter({
        point,
        offersById: [...this.#tripPointsModel.getOfferById(point.type, point.offers)],
        destination: this.#tripPointsModel.getDestinationById(point.destination),
        offersByType: this.#tripPointsModel.getOfferByType(point.type),
        onClickFavoriteButton: this.#handlePointChange,
        onOpenEditForm: this.#handleOpenEditPoin,
      });

      this.#pointPresentersList.set(point.id, tripEventPresenter);

      tripEventPresenter.init(this.#tripPointListComponent.element);
    }
  }

  #handlePointChange = (updatedPoint) => {
    this.#tripPointsList.map((point, index, array) => point.id === updatedPoint.id ? array.splice(index, 1, updatedPoint) : point);

    // this.#tripPointsList.map((point) => point.id === updatedPoint.id ? updatedPoint : point);

    this.#pointPresentersList.get(updatedPoint.id).init(this.#tripPointListComponent.element);

    // console.log(this.#tripPointListComponent);
  };

  #handleOpenEditPoin = () => {
    this.#pointPresentersList.forEach((pointPresenter) => pointPresenter.reset());
  };
}
