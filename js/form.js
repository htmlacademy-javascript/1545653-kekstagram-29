

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const uploadFile = bodyElement.querySelector('#upload-file');
const uploadOverlay = bodyElement.querySelector('.img-upload__overlay');
const uploadModalCancel = bodyElement.querySelector('.img-upload__cancel');
const hashtagsField = formElement.querySelector('.text__hashtags');
const textField = formElement.querySelector('.text__description');

const HASHTAGS_COUNT_MAX = 5;
const SYMBOLS_VALID = /^#[a-za-яё0-9]{1,19}$/i;
const ErrorMessages = {
  INVALID_COUNT: `Максимум ${HASHTAGS_COUNT_MAX} хэштегов`,
  INVALID_PATTERN: 'Неверно составлен хэштег(и)',
  NOT_UNIQUE: 'Хэштеги должны быть уникальными'
};

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const normalizeTags = (tagsString) => tagsString
  .trim()
  .split(' ')
  .filter((item) => Boolean(item.length));

const hasValidCount = (tags) => normalizeTags(tags).length <= HASHTAGS_COUNT_MAX;
const hasValidTags = (tags) => normalizeTags(tags).every((tag) => SYMBOLS_VALID.test(tag));
const hasUniqueTags = (tags) => {
  const lowerCaseTags = normalizeTags(tags).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(hashtagsField, hasValidCount, ErrorMessages.INVALID_COUNT, 3, true);
pristine.addValidator(hashtagsField, hasValidTags, ErrorMessages.INVALID_PATTERN, 2, true);
pristine.addValidator(hashtagsField, hasUniqueTags, ErrorMessages.NOT_UNIQUE, 1, true);

const onFormSubmit = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

const showModal = () => {
  uploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
};

const hideModalForm = () => {
  formElement.reset();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  uploadModalCancel.removeEventListener('click', hideModalForm);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onClickCloseButton = () => {
  hideModalForm();
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideModalForm();
  }
}
hashtagsField.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});
textField.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

const onfileUploadChange = () => {
  showModal();
  uploadModalCancel.addEventListener('click', onClickCloseButton);
  document.addEventListener('keydown', onDocumentKeydown);
};
const renderModalForm = () => {
  uploadFile.addEventListener('change', onfileUploadChange);

};

formElement.addEventListener('submit', onFormSubmit);

export { renderModalForm };
