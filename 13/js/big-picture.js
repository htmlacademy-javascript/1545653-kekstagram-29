const bigPictureElement = document.querySelector('.big-picture');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const bodyElement = document.querySelector('body');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
// const commentElement = document.querySelector('.social__comments').content.querySelector('.social__comment');
const commentElement = document.querySelector('.social__comment');
const totalCommentsNumberElement = bigPictureElement.querySelector('.comments-count');
const currentCommentsNumberElement = bigPictureElement.querySelector('.loaded-comments-count');

const createComment = ({avatar, name, message}) => {

  const comment = commentElement.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const showMoreComments = () => {
  const hiddenComments = commentListElement.querySelectorAll('.hidden');
  let shownCommentsNum = 5;
  if (hiddenComments.length < 5) {
    shownCommentsNum = hiddenComments.length;
  }
  for (let i = 0; i < shownCommentsNum; i++) {
    hiddenComments[i].classList.remove('hidden');
  }
  if (hiddenComments.length <= 5) {
    commentsLoaderElement.classList.add('hidden');
  }
  const allComments = commentListElement.querySelectorAll('.social__comment');
  currentCommentsNumberElement.textContent = allComments.length - (hiddenComments.length - shownCommentsNum);
};


const updateCounters = (comments) => {
  totalCommentsNumberElement.textContent = comments.length;
  currentCommentsNumberElement.textContent = comments.length;
  if (comments.length > 5) {
    currentCommentsNumberElement.textContent = 5;
    commentsLoaderElement.classList.remove('hidden');
  }
};

const renderComments = (comments) => {
  commentListElement.innerHTML = '';

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < comments.length; i++) {
    const comment = createComment(comments[i]);
    if (i >= 5) {
      comment.classList.add('hidden');
    }
    fragment.append(comment);
  }
  commentsLoaderElement.addEventListener('click', showMoreComments);
  commentListElement.append(fragment);

  updateCounters(comments);
};

const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('.modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => {
  hideBigPicture();
};
const renderPictureDetails = ({url, likes, description}) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.classList.add('hidden');
  // commentCountElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPictureDetails(data);
  renderComments(data.comments);
};

cancelButtonElement.addEventListener('click', onCancelButtonClick);

export {showBigPicture};
