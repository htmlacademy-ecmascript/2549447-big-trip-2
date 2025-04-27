import TripEventsPresenter from './presenter/trip-events-presenter.js';
import TripPointsModel from './model/trip-points-model.js';

const tripEventsElement = document.querySelector('.trip-events');

const tripPointsModel = new TripPointsModel();
const tripEventsPresenter = new TripEventsPresenter({
  tripEventsContainer: tripEventsElement,
  tripPointsModel: tripPointsModel,
});

tripEventsPresenter.init();
