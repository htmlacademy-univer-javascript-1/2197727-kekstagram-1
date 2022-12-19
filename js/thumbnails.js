import  { openBigPicture } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');

let photos = [];

const getThumbnailTemplate = ({id, url, likes, comments}) => `<a href="#" class="picture js-picture" data-id="${id}">
    <img class="picture__img" src="${url}" width="182" height="182" alt="Случайная фотография">
    <p class="picture__info">
      <span class="picture__comments">${comments.length}</span>
      <span class="picture__likes">${likes}</span>
    </p>
  </a>
`;

const onPicturesClick = (evt) => {
  const target = evt.target;
  const picture = target.closest('.js-picture');

  if ( picture ) {
    const id = picture.dataset.id;
    const [ photo ] = photos.filter((element) => element.id === +id);

    openBigPicture(photo);
  }
};

const createThumbnails = () => picturesContainer.insertAdjacentHTML('afterbegin', photos.map((photo) => getThumbnailTemplate(photo)).join(''));

const initThumbnails = (data) => {
  photos = data.slice();
  createThumbnails();
  picturesContainer.addEventListener('click', onPicturesClick);
};

const removeThumbnails = () => {
  const pictures = document.querySelectorAll('.js-picture');
  pictures.forEach((picture) => picture.remove());
};

export { initThumbnails, removeThumbnails };
