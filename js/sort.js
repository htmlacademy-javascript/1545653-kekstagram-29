import {renderImages} from './gallery.js';
import {debounce, getRandomInteger} from './util.js';

const COUNT_RANDOM_PHOTOS = 10;
const TIMEOUT = 500;

const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM:'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filtersList = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

const getFilters = (pictures, filterButton) => {
  if (filterButton.id === FilterType.DEFAULT) {
    return pictures;
  }
  if (filterButton.id === FilterType.RANDOM) {
    const firstElement = getRandomInteger(0, pictures.length - COUNT_RANDOM_PHOTOS);
    return pictures.slice(firstElement, firstElement + COUNT_RANDOM_PHOTOS);
  }
  if (filterButton.id === FilterType.DISCUSSED) {
    return pictures.slice().sort((a, b)=>(b.comments.length - a.comments.length));
  }
};

const onFiltersClick = (evt, pictures) =>{
  if (evt.target.classList.contains('img-filters__button')){
    filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));

    const filterButton = evt.target;
    filterButton.classList.add('img-filters__button--active');

    document.querySelectorAll('.picture').forEach((element)=>element.remove());
    renderImages(getFilters(pictures, filterButton));
  }
};

const addFilterListener = (pictures) => {
  filtersList.addEventListener('click', debounce((evt) => {
    onFiltersClick(evt, pictures);
  }, TIMEOUT));
};

const showFilters = (pictures) => {
  filtersList.classList.remove('img-filters--inactive');
  addFilterListener(pictures);
};

export {showFilters};
