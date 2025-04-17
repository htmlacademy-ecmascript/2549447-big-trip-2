import ListFilterView from './view/list-filter-view.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import { render } from './framework/render.js';
import TripPointsModel from './model/trip-points-model.js';
import { generateFilter } from './mock/filter.js';

const tripMainElement = document.querySelector('.trip-main');
const tripContolsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const tripPointsModel = new TripPointsModel();
const tripEventsPresenter = new TripEventsPresenter({
  tripEventsContainer: tripEventsElement,
  tripPointsModel,
});

const filters = generateFilter(tripPointsModel.tripPoints);

render(new ListFilterView({filters}), tripContolsFiltersElement);

tripEventsPresenter.init();
