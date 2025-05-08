import { TRIP_POINT_CONUT } from '../const.js';
import { getRandomTripPoint } from '../mock/trip-point.js';
import { mockOffers } from '../mock/offer.js';
import { mockDestinations } from '../mock/destination.js';

export default class TripPointsModel {
  #tripPoints = Array.from({length: TRIP_POINT_CONUT}, getRandomTripPoint);
  #offers = mockOffers;
  #destinations = mockDestinations;

  get tripPoints() {
    return this.#tripPoints;
  }

  get offers() {
    return this.#offers;
  }

  get allTypesEvent() {
    return this.offers.map((offer) => offer.type);
  }

  getOfferByType(type) {
    const allOffers = this.offers;
    return allOffers.find((offer) => offer.type === type);
  }

  getOfferById(type, itemsId) {
    const offersType = this.getOfferByType(type);
    return offersType.offers.filter((item) => itemsId.find((id) => item.id === id));
  }

  get destinations() {
    return this.#destinations;
  }

  getDestinationById(id) {
    const allDestinations = this.destinations;
    return allDestinations.find((item) => item.destinationId === id);
  }

  get allNamesDestination() {
    return this.destinations.map((destination) => destination.name);
  }
}
