import { PercentageScale } from './consts.js';

const scaleValue = document.querySelector('.scale__control--value');
const scaleContainer = document.querySelector('.img-upload__scale');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');

const onScaleButtonClick = (evt) => {
  let scaleCount = PercentageScale.MAX;
  const scaleInput = Number.parseInt(scaleValue.value, 10);
  const buttonScale = evt.target;

  if (buttonScale.tagName !== 'BUTTON') {
    return;
  }

  if (buttonScale.classList.contains('scale__control--bigger')) {
    scaleCount = Math.min(scaleInput + PercentageScale.STEP, PercentageScale.MAX);
    scaleValue.value = `${scaleCount}%`;
  } else {
    scaleCount = Math.max(scaleInput - PercentageScale.STEP, PercentageScale.MIN);
    scaleValue.value = `${scaleCount}%`;
  }

  imgPreview.style.transform = `scale(${scaleCount / 100})`;
};

export { onScaleButtonClick, scaleContainer };
