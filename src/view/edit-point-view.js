import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeDateTimeEdit } from '../utils/point.js';

function createEditPointTemplate(point, offersByType, destination, allTypesEvent, allNamesDestination) {
  const { pointId, type, basePrice, dateFrom, dateTo, offers } = point;
  const { descriptionPlace, name, pictures } = destination;

  const isCheckedTypeEvent = (typeEvent) => typeEvent === type ? 'checked' : '';
  const isCheckedOffer = (offersId, id) => offersId.some((offerId) => offerId === id) ? 'checked' : '';

  const eventStartEdit = humanizeDateTimeEdit(dateFrom);
  const eventEndEdit = humanizeDateTimeEdit(dateTo);

  return `<li class="trip-events__item"><form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${ pointId }">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${ type }.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${ pointId }" type="checkbox">

        <div class="event__type-list">
          ${ allTypesEvent.length > 0 ? `<fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${ allTypesEvent.map((typeEvent) => `<div class="event__type-item">
              <input id="event-type-${ typeEvent }" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${ typeEvent }" ${ isCheckedTypeEvent(typeEvent) }>
              <label class="event__type-label event__type-label--${ typeEvent }" for="event-type-${ typeEvent }">${ typeEvent }</label>
            </div>`).join('') }
          </fieldset>` : '' }
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${ pointId }">
          ${ type }
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${ pointId }" type="text" name="event-destination" value="${ name }" list="destination-list-${ pointId }">
        ${ allNamesDestination.length > 0 ? `<datalist id="destination-list-${ pointId }">
          ${ allNamesDestination.map((destinationName) => `<option value="${ destinationName }"></option>`).join('')}
        </datalist>` : '' }
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${ pointId }">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${ pointId }" type="text" name="event-start-time" value="${ eventStartEdit }">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${ pointId }">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${ pointId }" type="text" name="event-end-time" value="${ eventEndEdit }">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${ pointId }">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${ pointId }" type="text" name="event-price" value="${ basePrice }">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>

    <section class="event__details">
      ${ offersByType.offers.length > 0 ? `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${ offersByType.offers.map(({ title, price, id }) => `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${ id }" type="checkbox" name="event-offer-luggage" ${ isCheckedOffer(offers, id) }>
            <label class="event__offer-label" for="event-offer-luggage-${ id }">
              <span class="event__offer-title">${ title }</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${ price }</span>
            </label>
          </div>`).join('') }
        </div>
      </section>` : '' }

      ${ descriptionPlace !== undefined ? `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${ descriptionPlace }</p>
        ${ pictures.length > 0 ? `<div class="event__photos-container">
          <div class="event__photos-tape">
            ${ pictures.map(({ src, description }) => `<img class="event__photo" src="${ src }" alt="${ description }">`).join('') }
          </div>
        </div>` : ''}
      </section>` : ''}
    </section>
  </form></li>`;
}

export default class EditPointView extends AbstractStatefulView {
  #offersByType = null;
  #destination = null;
  #handleEditClick = null;
  #handleFormSubmit = null;
  #allTypesEvent = null;
  #allNamesDestination = null;
  #tripPointsModel = null;

  constructor ({ point, offersByType, destination, onEditClick, onFormSubmit, allTypesEvent, allNamesDestination, tripPointsModel }) {
    super();
    this._setState(EditPointView.parsePointToState(point));
    this.#offersByType = offersByType;
    this.#destination = destination;
    this.#handleEditClick = onEditClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#allTypesEvent = allTypesEvent;
    this.#allNamesDestination = allNamesDestination;
    this.#tripPointsModel = tripPointsModel;
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
  }

  get template() {
    return createEditPointTemplate(this._state, this.#offersByType, this.#destination, this.#allTypesEvent, this.#allNamesDestination);
  }

  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState(point),
    );
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    const offersByType = this.#tripPointsModel.getOfferByType(evt.target.value);
    this.#offersByType = offersByType;
    this.updateElement({
      type: evt.target.value,
      offersByType,
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const targetDestination = this.#tripPointsModel.destinations
      .find((destinationCheck) => destinationCheck.name === evt.target.value);
    const targetDestinationId = targetDestination ? targetDestination.destinationId : null;
    const emptyDestination = {
      descriptionPlace: undefined,
      name: evt.target.value,
    };
    const changeDestination = targetDestinationId ? this.#tripPointsModel.getDestinationById(targetDestinationId) : emptyDestination;
    this.#destination = changeDestination;
    this.updateElement({
      destination: changeDestination,
    });
  };

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    return { ...state };
  }
}
