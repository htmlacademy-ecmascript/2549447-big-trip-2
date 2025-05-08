import EditPointView from '../view/edit-point-view.js';
import TripPointView from '../view/trip-point-view.js';
import { remove, render, replace } from '../framework/render.js';

export default class TripEventPresenter {
  #point = null;
  #offersById = null;
  #destination = null;
  #offersByType = null;
  #onClickFavoriteButton = null;
  #tripPointListComponent = null;
  #tripPointComponent = null;
  #editPointComponent = null;
  #onOpenEditForm = null;
  #isOpenEdit = null;
  #allTypesEvent = null;
  #allNamesDestination = null;
  #tripPointsModel = null;

  constructor({point, offersById, destination, offersByType, onClickFavoriteButton, onOpenEditForm, allTypesEvent, allNamesDestination, tripPointsModel}) {
    this.#point = point;
    this.#offersById = offersById;
    this.#destination = destination;
    this.#offersByType = offersByType;
    this.#onClickFavoriteButton = onClickFavoriteButton;
    this.#onOpenEditForm = onOpenEditForm;
    this.#allTypesEvent = allTypesEvent;
    this.#allNamesDestination = allNamesDestination;
    this.#tripPointsModel = tripPointsModel;
  }

  init (tripPointListComponent, point) {
    this.#tripPointListComponent = tripPointListComponent;

    if (point) {
      this.#point = point;
    }

    const prevTripPointComponent = this.#tripPointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#tripPointComponent = new TripPointView({
      point: this.#point,
      offersById: this.#offersById,
      destination: this.#destination,
      onEditClick: this.#openEdit,
      onClickFavoriteButton: this.#toggleFavoriteState,
    });

    this.#editPointComponent = new EditPointView({
      point: this.#point,
      offersByType: this.#offersByType,
      destination: this.#destination,
      onEditClick: this.#closeEdit,
      onFormSubmit: this.#saveEdit,
      allTypesEvent: this.#allTypesEvent,
      allNamesDestination: this.#allNamesDestination,
      tripPointsModel: this.#tripPointsModel,
    });

    if (prevTripPointComponent === null || prevEditPointComponent === null) {
      render(this.#tripPointComponent, this.#tripPointListComponent);
      return;
    }

    replace(this.#tripPointComponent, prevTripPointComponent);
    remove(prevTripPointComponent);
    remove(prevEditPointComponent);
  }

  #replacePointToEdit = () => {
    replace(this.#editPointComponent, this.#tripPointComponent);
  };

  #replaceEditToPoint = () => {
    replace(this.#tripPointComponent, this.#editPointComponent);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#closeEdit();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #toggleFavoriteState = () => {
    this.#onClickFavoriteButton({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #openEdit = () => {
    this.#onOpenEditForm();
    this.#replacePointToEdit();
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#isOpenEdit = true;
  };

  #closeEdit = () => {
    this.#editPointComponent.reset(this.#point);
    this.#replaceEditToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#isOpenEdit = false;
  };

  #saveEdit = (parseStateToPoint) => {
    this.#point = parseStateToPoint;
    this.#replaceEditToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#isOpenEdit = false;
  };

  resetView = () => {
    if (this.#isOpenEdit) {
      this.#closeEdit();
    }
  };
}
