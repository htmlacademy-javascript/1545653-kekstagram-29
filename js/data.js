import {getRandomInteger} from './util.js';

const POSTS_NUMBER = 25;

let currentPostNumber = 0;
let currentCommentNumber = 0;

const MESSAGES_OPTIONS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Кошкин',
  'Рыбкин',
  'Собачкин',
  'Овечкин',
  'Кукарейкин',
  'Муравьедов',
  'Птенчиков',
  'Лосев',
  'Лососев',
  'Хрюшин'
];
const DESCRIPTION_WHO = NAMES;

const DESCRIPTION_WHERE = [
  ' на даче',
  ' на работе',
  ' дома',
  ' на природе'
];

const DESCRIPTION_ACTION = [
  ' кушает',
  ' прыгает',
  ' квакает',
  ' играет в карты',
  ' читает стихотворение',
  ' спит'
];

const generateRandomComment = () => {
  currentCommentNumber++;
  const commentObject = {
    id:currentCommentNumber,
    avatar: (`img/avatar-${getRandomInteger(1, 6)}.svg`),
    message: MESSAGES_OPTIONS[getRandomInteger(0, MESSAGES_OPTIONS.length - 1)],
    name: NAMES[getRandomInteger(0, NAMES.length - 1)]
  };
  return commentObject;
};

const generateDescription = () =>
  DESCRIPTION_WHO[getRandomInteger(0, DESCRIPTION_WHO.length - 1)] +
  DESCRIPTION_ACTION[getRandomInteger(0, DESCRIPTION_ACTION.length - 1)] +
  DESCRIPTION_WHERE[getRandomInteger(0, DESCRIPTION_WHERE.length - 1)];

const createPost = () => {
  currentPostNumber ++;
  return {
    id: currentPostNumber,
    url: (`photos/${currentPostNumber}.jpg`),
    Description: generateDescription(),
    likes: getRandomInteger(15, 200),
    comments: Array.from({length:getRandomInteger(0, 6)}, generateRandomComment)
  };
};

const allPosts = Array.from({length:POSTS_NUMBER}, createPost);

export {allPosts};
