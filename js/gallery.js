import {renderGallery} from './drawPictures.js';
import {showBigPicture} from './big-picture.js';

const container = document.querySelector('.pictures');

const renderImages = (pictures) => {
  container.addEventListener('click', (evt) => {
    const gallery = evt.target.closest('[data-gallery-id]');
    if (!gallery){
      return;
    }

    evt.preventDefault();
    const picture = pictures.find(
      (item) => item.id === + gallery.dataset.galleryId
    );
    showBigPicture(picture);
  });


  renderGallery(pictures, container);
};

export {renderImages};
