const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const getData = () =>
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(ErrorText.GET_DATA);
    });

const sendData = (body, onSuccess) =>
  fetch(`${BASE_URL}${Route.SEND_DATA}`,
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      } else {
        onSuccess();
      }
    })
    .catch(() => {
      throw new Error(ErrorText.SEND_DATA);
    });

export {getData, sendData};