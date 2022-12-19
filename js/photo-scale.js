import { PercentScale } from './consts.js';

const scaleValue = document.querySelector('.scale__control--value');
const scaleContainer = document.querySelector('.img-upload__scale');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');

const onScaleButtonClick = (evt) => {
  let scaleCount = PercentScale.MAX;
  const scaleInput = Number.parseInt(scaleValue.value, 10);
  const buttonScale = evt.target;

  if (buttonScale.tagName !== 'BUTTON') {
    return;
  }

  if (buttonScale.classList.contains('scale__control--bigger')) {
    scaleCount = Math.min(scaleInput + PercentScale.STEP, PercentScale.MAX);
    scaleValue.value = `${scaleCount}%`;
  } else {
    scaleCount = Math.max(scaleInput - PercentScale.STEP, PercentScale.MIN);
    scaleValue.value = `${scaleCount}%`;
  }

  imgPreview.style.transform = `scale(${scaleCount / 100})`;
};

const initScaleContainer = () => {
  scaleContainer.addEventListener('click', onScaleButtonClick);
};

const removeScaleContainer = () => {
  scaleContainer.removeEventListener('click', onScaleButtonClick);
};

export { initScaleContainer, removeScaleContainer };
