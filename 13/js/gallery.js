import {renderGallery} from './drawPictures.js';
import {showBigPicture} from './big-picture.js';

let currentActivePictures = [];

const container = document.querySelector('.pictures');
const onContainerClick = (evt) => {
  const gallery = evt.target.closest('[data-gallery-id]');
  if (!gallery){
    return;
  } evt.preventDefault();
  const picture = currentActivePictures.find(
    (item) => item.id === + gallery.dataset.galleryId
  );
  showBigPicture(picture);
};

const renderImages = (pictures) => {
  currentActivePictures = pictures;
  renderGallery(pictures, container);
};

container.addEventListener('click', onContainerClick);

export {renderImages};
