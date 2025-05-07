import ListFilterView from '../view/list-filter-view.js';
import { generateFilter } from '../mock/filter.js';
import ListSortView from '../view/list-sort-view.js';
import TripPointListView from '../view/trip-point-list-view.js';
import EmptyPointsListView from '../view/empty-points-list-view.js';
import { render, RenderPosition } from '../framework/render.js';
import { generateSortItem } from '../mock/sort.js';
import TripEventPresenter from './trip-event-presenter.js';
import { SortingType } from '../const.js';
import { sortPointsByDay, sortPointsByTime, sortPointsByPrice } from '../utils/point.js';
import { remove } from '../framework/render.js';

export default class TripEventsPresenter {
  #tripMainElement = document.querySelector('.trip-main');
  #tripContolsFiltersElement = this.#tripMainElement.querySelector('.trip-controls__filters');
  #tripEventsContainer = null;
  #tripPointsModel = null;
  #listSortComponent = null;
  #tripPointListComponent = new TripPointListView();
  #tripPointsList = [];
  #pointPresentersList = new Map();
  #currentSortType = SortingType.DAY;

  constructor({tripEventsContainer, tripPointsModel}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripPointsModel = tripPointsModel;
  }

  init() {
    this.#renderFilters();

    this.#tripPointsList = [...this.#tripPointsModel.tripPoints];

    this.#renderSort();

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

    this.#sortPoints(this.#currentSortType);

    render(this.#tripPointListComponent, this.#tripEventsContainer);

    for (const point of this.#tripPointsList) {
      const tripEventPresenter = new TripEventPresenter({
        point,
        offersById: [...this.#tripPointsModel.getOfferById(point.type, point.offers)],
        destination: this.#tripPointsModel.getDestinationById(point.destination),
        offersByType: this.#tripPointsModel.getOfferByType(point.type),
        onClickFavoriteButton: this.#handlePointChange,
        onOpenEditForm: this.#handleOpenEditPoint,
        allTypesEvent: this.#tripPointsModel.allTypesEvent,
        allNamesDestination: this.#tripPointsModel.allNamesDestination,
        tripPointsModel: this.#tripPointsModel,
      });

      tripEventPresenter.init(this.#tripPointListComponent.element);
      this.#pointPresentersList.set(point.pointId, tripEventPresenter);
    }
  }

  #handlePointChange = (updatedPoint) => {
    this.#tripPointsList.map((point) => point.pointId === updatedPoint.pointId ? updatedPoint : point);
    this.#pointPresentersList.get(updatedPoint.pointId).init(this.#tripPointListComponent.element, updatedPoint);
  };

  #handleOpenEditPoint = () => {
    this.#pointPresentersList.forEach((pointPresenter) => pointPresenter.resetView());
  };

  #getSortItems = () => generateSortItem(this.#tripPointsList);

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#sortPoints(sortType);
    remove(this.#tripPointListComponent);
    this.#renderTripPointsList();
    remove(this.#listSortComponent);
    this.#renderSort();
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortingType.DAY:
        this.#tripPointsList.sort(sortPointsByDay);
        break;
      case SortingType.TIME:
        this.#tripPointsList.sort(sortPointsByTime);
        break;
      case SortingType.PRICE:
        this.#tripPointsList.sort(sortPointsByPrice);
        break;
    }

    this.#currentSortType = sortType;
  }

  #renderSort() {
    this.#listSortComponent = new ListSortView({
      sortItems: this.#getSortItems(),
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#listSortComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }
}
