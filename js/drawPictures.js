const galleryTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createGallery = ({url, description, likes, comments, id}) => {

  const gallery = galleryTemplate.cloneNode(true);

  gallery.querySelector('.picture__img').src = url;
  gallery.querySelector('.picture__img').alt = description;
  gallery.querySelector('.picture__likes').textContent = likes;
  gallery.querySelector('.picture__comments').textContent = comments.length;
  gallery.dataset.galleryId = id;
  return gallery;
};

const renderGallery = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) =>{
    const gallery = createGallery(picture);
    fragment.append(gallery);
  });
  container.append(fragment);

};

export {renderGallery};
