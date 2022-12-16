import { MAX_LENGTH_STRING, MAX_COUNT_HASHTAG, MAX_LENGTH_HASHTAG, ErrorMessage } from './consts.js';
import { checkStringLength, isEscapeKey } from './utils.js';
import { onScaleButtonClick, scaleContainer } from './photo-scale.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const imgUploadField = document.querySelector('#upload-file');
const editImg = document.querySelector('.img-upload__overlay');
const submitButton = document.querySelector('.img-upload__submit');
const closeButton = form.querySelector('.img-upload__cancel');
const hashtagsField = form.querySelector('.text__hashtags');
const commentsField = form.querySelector('.text__description');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
const slider = document.querySelector('.effect-level__slider');
const sliderWrapper = document.querySelector('.effect-level');
const effectValue = document.querySelector('.effect-level__value');
const onEffectListChange = document.querySelector('.effects__list');

let errorMessage = '';
const error = () => errorMessage;

const Effect = {
  chrome: {
    filter: 'grayscale',
    units: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    }
  },
  sepia: {
    filter: 'sepia',
    units: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    }
  },
  marvin: {
    filter: 'invert',
    units: '%',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    }
  },
  phobos: {
    filter: 'blur',
    units: 'px',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    }
  },
  heat: {
    filter: 'brightness',
    units: '',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    }
  }
};

const initEffects = () => {
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => parseFloat(value),
    },
  });
};

const onFilterButtonChange = (evt) => {
  const evtHandler = evt.target.value;

  if (evtHandler === 'none') {
    sliderWrapper.classList.add('hidden');
    imgPreview.style.filter = 'none';
  } else {
    sliderWrapper.classList.remove('hidden');
    imgPreview.removeAttribute('class');
    imgPreview.classList.add(`effects__preview--${evtHandler}`);
    slider.noUiSlider.updateOptions(Effect[evtHandler].options);
    slider.noUiSlider.on('update', () => {
      effectValue.value = slider.noUiSlider.get();
      imgPreview.style.filter = `${Effect[evtHandler].filter}(${effectValue.value}${Effect[evtHandler].units})`;
    });
  }
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

const closeUploadPopup  = () => {
  editImg.classList.add('hidden');
  body.classList.remove('modal-open');
  scaleContainer.removeEventListener('click', onScaleButtonClick);
  onEffectListChange.removeEventListener('change', onFilterButtonChange);
  document.removeEventListener('keydown', onButtonEscKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
  imgPreview.removeAttribute('class');
  imgPreview.removeAttribute('style');
  form.reset();
};

function onButtonEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeUploadPopup();
  }
}

function onCloseButtonClick() {
  closeUploadPopup();
}

const addFieldListeners = (field) => {
  field.addEventListener('focus', () => {
    document.removeEventListener('keydown', onButtonEscKeydown);
  });

  field.addEventListener('blur', () => {
    document.addEventListener('keydown', onButtonEscKeydown);
  });
};

const buttonAdjustment = () => {
  submitButton.disabled = !pristine.validate();
};

const onImgUploadFieldchange = () => {
  editImg.classList.remove('hidden');
  body.classList.add('modal-open');
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown',onButtonEscKeydown);
  sliderWrapper.classList.add('hidden');
  scaleContainer.addEventListener('click', onScaleButtonClick);
  onEffectListChange.addEventListener('change', onFilterButtonChange);
  addFieldListeners(commentsField);
  addFieldListeners(hashtagsField);
  buttonAdjustment();
};

const getUniqueHashtags = (hashtags) => {
  const uniqueSet = new Set(hashtags);
  return hashtags.length === uniqueSet.size;
};

const hashtagsHandler = (string) => {
  errorMessage = '';

  const inputText = string.toLowerCase().trim();

  if(!inputText) {
    return true;
  }

  const inputHashtags = inputText.split(/\s+/);

  if(inputHashtags.length === 0) {
    return true;
  }

  const rules = [
    {
      check: inputHashtags.some((item) => item[0] !== '#'),
      error: ErrorMessage.START_WITH,
    },

    {
      check: inputHashtags.some((item) => item.length === 1),
      error: ErrorMessage.ONLY_ONE_GRID,
    },

    {
      check: inputHashtags.some((item) => !/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/.test(item)),
      error: ErrorMessage.UNACCEPTABLE_SYMBOLS,
    },

    {
      check: inputHashtags.some((item) => item.length > MAX_LENGTH_HASHTAG),
      error: ErrorMessage.MAX_LENGTH_HASHTAG,
    },

    {
      check: inputHashtags.some((item) => item.indexOf('#', 1) >= 1),
      error: ErrorMessage.SEPARATED_BY_SPACES,
    },

    {
      check: !getUniqueHashtags(inputHashtags),
      error: ErrorMessage.NO_REPEAT,
    },

    {
      check: inputHashtags.length > MAX_COUNT_HASHTAG,
      error: ErrorMessage.MAX_COUNT_HASHTAG,
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;

    if(isInvalid) {
      errorMessage = rule.error;
    }

    return !isInvalid;
  });
};

const commentHandler = (string) => {
  errorMessage = '';

  const inputText = string.trim();

  if(!inputText) {
    return true;
  }

  const rule = {
    check: !checkStringLength(inputText, MAX_LENGTH_STRING),
    error: ErrorMessage.MAX_LENGTH_COMMENT,
  };

  const isInvalid = rule.check;

  if(isInvalid) {
    errorMessage = rule.error;
  }

  return !isInvalid;
};

const validateForm = () => {
  pristine.addValidator(hashtagsField, hashtagsHandler, error);
  pristine.addValidator(commentsField, commentHandler, error);
  buttonAdjustment();
};

const onHashtagInput = () => buttonAdjustment();

const onCommentInput = () => buttonAdjustment();

const renderUploadForm = () => {
  imgUploadField.addEventListener('change', onImgUploadFieldchange);
  hashtagsField.addEventListener('input', onHashtagInput);
  commentsField.addEventListener('input', onCommentInput);
  validateForm();
};

export { renderUploadForm, initEffects };
