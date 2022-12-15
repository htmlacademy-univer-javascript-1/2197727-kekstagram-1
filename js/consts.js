export const NAMES = [
  'Аркадий Шапулов',
  'Пион Розевский',
  'Нагарья Ларузьева',
  'Полина Завиная',
  'Страх Божий',
  'Марина Яшко',
  'Град Марсович',
  'Лона Поло',
  'Малина Малинская'
];

export const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

export const DESCRIPTIONS = [
  'Вперед и только вперед!',
  'Лучшее время...',
  'Когда пошли за цветами, но купили не цветы'
];

export const CountLike = {
  MIN: 15,
  MAX: 200
};

export const AvatarNumber = {
  MIN: 1,
  MAX: 6
};

export const CountComment = {
  MIN: 0,
  MAX: 23
};

export const DEFAULT_RENDERED_COMMENTS = 5;
export const MAX_COUNT_PHOTOS = 25;
export const STEP_ADDED_COMMENTS = 5;
export const MAX_LENGTH_STRING = 140;
export const MAX_COUNT_HASHTAG = 5;
export const MAX_LENGTH_HASHTAG = 20;

export const ErrorMessage = {
  START_WITH: 'Хэш-тег должен начинаться с символа #',
  UNACCEPTABLE_SYMBOLS: 'Хэш-тег содержит недопустимые символы',
  ONLY_ONE_GRID: 'Хэш-тег состоит из одной #',
  MAX_LENGTH_HASHTAG: `Максимальная длина одного хэш-тега ${MAX_LENGTH_HASHTAG} символов, включая #`,
  SEPARATED_BY_SPACES: 'Хэш-теги должны разделяться пробелами',
  NO_REPEAT: 'Хэш-тег не может быть использован дважды',
  MAX_COUNT_HASHTAG: `Нельзя указать больше ${MAX_COUNT_HASHTAG} хэш-тегов`,
  MAX_LENGTH_COMMENT: `Максимальная длина комментария ${MAX_LENGTH_STRING} символов`
};

export const PercentageScale = {
  STEP: 25,
  MIN: 25,
  MAX: 100
};
