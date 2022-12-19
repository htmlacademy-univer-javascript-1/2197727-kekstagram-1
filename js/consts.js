export const MAX_LENGTH_STRING = 140;
export const MAX_COUNT_HASHTAG = 5;
export const MAX_LENGTH_HASHTAG = 20;
export const DEFAULT_RENDERED_COMMENTS = 5;
export const STEP_ADDED_COMMENTS = 5;
export const ALERT_SHOW_TIME = 5000;
export const MAX_COUNT_RANDOM_PHOTO = 10;
export const TIMEOUT_DELAY = 500;

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

export const PercentScale = {
  STEP: 25,
  MIN: 25,
  MAX: 100
};

export const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};
