import { MAX_LENGTH_STRING, MAX_COUNT_HASHTAG, MAX_LENGTH_HASHTAG, ErrorMessage } from './consts.js';
import { checkStringLength, isEscapeKey } from './utils.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const imgUploadField = document.querySelector('#upload-file');
const editImg = document.querySelector('.img-upload__overlay');
const submitButton = document.querySelector('.img-upload__submit');
const closeButton = form.querySelector('.img-upload__cancel');
const hashtagsField = form.querySelector('.text__hashtags');
const commentsField = form.querySelector('.text__description');

let errorMessage = '';

const error = () => errorMessage;

const checkPristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

const closeUploadPopup  = () => {
  editImg.classList.add('hidden');
  body.classList.remove('modal-open');
  form.reset();
};

const onButtonEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeUploadPopup();
    document.removeEventListener('keydown', onButtonEscKeydown);
  }
};

const onCloseButtonClick = () => {
  closeUploadPopup();
  document.removeEventListener('keydown', onButtonEscKeydown);
};

const addFieldListeners = (field) => {
  field.addEventListener('focus', () => {
    document.removeEventListener('keydown', onButtonEscKeydown);
  });

  field.addEventListener('blur', () => {
    document.addEventListener('keydown', onButtonEscKeydown);
  });
};

const buttonAdjustment = () => {
  submitButton.disabled = !checkPristine.validate();
};

const onImgUploadFieldchange = () => {
  editImg.classList.remove('hidden');
  body.classList.add('modal-open');
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown',onButtonEscKeydown);
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
  checkPristine.addValidator(hashtagsField, hashtagsHandler, error);
  checkPristine.addValidator(commentsField, commentHandler, error);
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

export { renderUploadForm };
