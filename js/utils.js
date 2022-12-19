import { TIMEOUT_DELAY } from './consts.js';

export const checkStringLength = (string, length) => string.length <= length;

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const showAlert = (alertShowTime) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#dc143c';
  alertContainer.textContent = 'Не удалось загрузить фотографии';
  document.body.append(alertContainer);
  setTimeout(() => alertContainer.remove(), alertShowTime);
};

export const shuffleArray = (arr) => arr.map((a) => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map((a) => a[1]);

export const debounce = (callback, timeoutDelay = TIMEOUT_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
