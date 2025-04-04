import { TRIP_POINT_CONUT } from '../const.js';
import { getRandomTripPoint } from '../mock/trip-point.js';
import { mockOffers } from '../mock/offer.js';
import { mockDestinations } from '../mock/destination.js';

export default class TripPointsModel {
  tripPoints = Array.from({length: TRIP_POINT_CONUT}, getRandomTripPoint);
  offers = mockOffers;
  destination = mockDestinations;

  getTripPoints() {
    return this.tripPoints;
  }

  getOffer() {
    return this.offers;
  }

  getOfferByType(type) {
    const allOffers = this.getOffer();
    return allOffers.find((offer) => offer.type === type);
  }

  getOfferById(type, itemsId) {
    const offersType = this.getOfferByType(type);
    return offersType.offers.filter((item) => itemsId.find((id) => item.id === id));
  }

  getDestination() {
    return this.destination;
  }

  getDestinationById(id) {
    const allDestination = this.getDestination();
    return allDestination.find((item) => item.id === id);
  }
}
