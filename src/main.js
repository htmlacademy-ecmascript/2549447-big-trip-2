import ListFilterView from './view/list-filter-view.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import { render } from './render.js';

const tripMainElement = document.querySelector('.trip-main');
const tripContolsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const tripEventsPresenter = new TripEventsPresenter({tripEventsContainer: tripEventsElement});

render(new ListFilterView(), tripContolsFiltersElement);

tripEventsPresenter.init();
