import {isEscapeKey} from './util.js';

const Answers = {
  SUCCESS: 'success',
  ERROR: 'error'
};

const createSuccessMessage = (success = true) => {
  let typeMessage;
  if (success === true) {
    typeMessage = Answers.SUCCESS;
  } else {
    typeMessage = Answers.ERROR;
  }

  const currentMessageTemplate = document.querySelector(`#${typeMessage}`).content.querySelector(`.${typeMessage}`);
  const currentMessage = currentMessageTemplate.cloneNode(true);
  const currentButton = currentMessage.querySelector(`.${typeMessage}__button`);
  const bodyElement = document.querySelector('body');

  const removeElement = (element) => element.remove();

  const closeMessage = () => {
    removeElement(currentMessage);
    bodyElement.removeEventListener('keydown',onKeyDownPress);
    bodyElement.removeEventListener('click',onOutSideClick);
    currentButton.removeEventListener('click',onSuccessClick);
  };

  function onKeyDownPress (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  }

  function onSuccessClick () {
    closeMessage();
  }


  function onOutSideClick(evt) {
    if(evt.target === currentMessage){
      closeMessage();
    }
  }

  currentButton.addEventListener('click',onSuccessClick);
  bodyElement.addEventListener('keydown',onKeyDownPress);
  bodyElement.addEventListener('click',onOutSideClick);
  bodyElement.append(currentMessage);

};

export {createSuccessMessage};
