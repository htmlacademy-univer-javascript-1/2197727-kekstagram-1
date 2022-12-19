const FILE_TYPES = ['png', 'jpeg', 'jpg', 'gif'];

const fileChooser = document.querySelector('.img-upload__start input[type=file]');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const pictureUrl = URL.createObjectURL(file);
    imgPreview.src = pictureUrl;
    effectPreviews.forEach((effect) => {
      effect.style.backgroundImage = `url(${pictureUrl})`;
    });
  }
});
