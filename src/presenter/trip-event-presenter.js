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

  constructor({point, offersById, destination, offersByType, onClickFavoriteButton, onOpenEditForm}) {
    this.#point = point;
    this.#offersById = offersById;
    this.#destination = destination;
    this.#offersByType = offersByType;
    this.#onClickFavoriteButton = onClickFavoriteButton;
    this.#onOpenEditForm = onOpenEditForm;
  }

  init (tripPointListComponent) {
    this.#tripPointListComponent = tripPointListComponent;

    // const prevTripPointComponent = this.#tripPointComponent;
    // const prevEditPointComponent = this.#editPointComponent;

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
    });

    render(this.#tripPointComponent, this.#tripPointListComponent);

    // replace(this.#editPointComponent, prevEditPointComponent);
    // remove(prevTripPointComponent);
    // remove(prevEditPointComponent);
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
    this.#replaceEditToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#isOpenEdit = false;
  };

  reset = () => {
    if (this.#isOpenEdit) {
      this.#closeEdit();
    }
  };
}
