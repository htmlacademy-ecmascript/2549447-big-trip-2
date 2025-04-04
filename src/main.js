import ListFilterView from './view/list-filter-view.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import { render } from './render.js';
import TripPointsModel from './model/trip-points-model.js';

const tripMainElement = document.querySelector('.trip-main');
const tripContolsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const tripPointsModel = new TripPointsModel();
const tripEventsPresenter = new TripEventsPresenter({
  tripEventsContainer: tripEventsElement,
  tripPointsModel,
});

render(new ListFilterView(), tripContolsFiltersElement);

tripEventsPresenter.init();
