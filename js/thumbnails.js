import  { DEFAULT_RENDERED_COMMENTS, STEP_ADDED_COMMENTS } from './consts.js';

const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureCloseBtn = bigPicture.querySelector('.big-picture__cancel');
const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
const bigPictureCommentsLoaderBtn = bigPicture.querySelector('.comments-loader');
const bigPictureCounterComments = bigPicture.querySelector('.social__comment-count');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const bigPictureLike = bigPicture.querySelector('.likes-count');

let photos = [];
let actualComments = [];
let countRenderedComments = DEFAULT_RENDERED_COMMENTS;

const getThumbnailTemplate = ({id, url, likes, comments}) => `<a href="#" class="picture js-picture" data-id="${id}">
    <img class="picture__img" src="${url}" width="182" height="182" alt="Случайная фотография">
    <p class="picture__info">
      <span class="picture__comments">${comments.length}</span>
      <span class="picture__likes">${likes}</span>
    </p>
  </a>
`;

const getCommentTemplate = ({avatar, message, name}) => `<li class="social__comment">
<img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
<p class="social__text">${message}</p>
</li>`;

const getCounterCommentsTemplate = (commentsCount) => `${Math.min(countRenderedComments, commentsCount)} из <span class="comments-count">${commentsCount}</span> комментариев`;

const getCounterComments = () => {
  bigPictureCounterComments.innerHTML = '';
  bigPictureCounterComments.insertAdjacentHTML('afterbegin', getCounterCommentsTemplate(actualComments.length));
};

const renderComments = () => {
  getCounterComments();

  bigPictureCommentsList.innerHTML = '';
  const commentsTemplate = actualComments.slice(0, countRenderedComments).map((comment) => getCommentTemplate(comment)).join('');
  bigPictureCommentsList.insertAdjacentHTML('afterbegin', commentsTemplate);

  if (countRenderedComments >= actualComments.length) {
    bigPictureCommentsLoaderBtn.removeEventListener('click', onBigPictureCommentsLoaderBtnClick);
    bigPictureCommentsLoaderBtn.classList.add('hidden');
  }
};

function onBigPictureCommentsLoaderBtnClick() {
  countRenderedComments += STEP_ADDED_COMMENTS;
  renderComments();
}

const initComments = ({comments}) => {
  actualComments = comments.slice();
  bigPictureCommentsList.innerHTML = '';

  if (comments.length === 0) {
    bigPictureCommentsLoaderBtn.classList.add('hidden');
    bigPictureCounterComments.innerHTML='Нет комментариев';
    return;
  }

  renderComments();
  bigPictureCommentsLoaderBtn.addEventListener('click', onBigPictureCommentsLoaderBtnClick);
};

const closeBigPicture = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  bigPictureCloseBtn.removeEventListener('click', onBigPictureCloseBtnClick);
  window.removeEventListener('keydown', onWindowEscKeydown);
  bigPictureCommentsLoaderBtn.classList.remove('hidden');
  bigPictureCommentsLoaderBtn.removeEventListener('click', onBigPictureCommentsLoaderBtnClick);
  countRenderedComments = DEFAULT_RENDERED_COMMENTS;
};

function onBigPictureCloseBtnClick() {
  closeBigPicture();
}

function onWindowEscKeydown() {
  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      closeBigPicture();
    }
  });
}

const openBigPicture = (photo) => {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPictureImg.setAttribute('src', photo.url);
  bigPictureCaption.textContent = photo.description;
  bigPictureLike.textContent = photo.likes;
  initComments(photo);

  bigPictureCloseBtn.addEventListener('click', onBigPictureCloseBtnClick);
  window.addEventListener('keydown', onWindowEscKeydown);
};

const onThumbnailClick = (evt) => {
  const target = evt.target;
  const picture = target.closest('.js-picture');
  const id = picture.dataset.id;
  const [ photo ] = photos.filter((element) => element.id === +id);

  openBigPicture(photo);
};

const createThumbnails = () => {
  photos.forEach((photo) => {
    picturesContainer.insertAdjacentHTML('afterbegin', getThumbnailTemplate(photo));
  });
};

const initThumbnails = (data) => {
  photos = data.slice();
  createThumbnails();
  const pictures = picturesContainer.querySelectorAll('.js-picture');
  pictures.forEach((picture) => picture.addEventListener('click', onThumbnailClick));
};

export { initThumbnails };
