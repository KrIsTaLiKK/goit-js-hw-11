import { refs } from './refs';

export function upBtnVisible() {
  const { height: cardHeight } =
    refs.containerGallery.firstElementChild.getBoundingClientRect();


  if (window.scrollY > cardHeight) {
    refs.upBtn.classList.remove('is-hidden');

    refs.upBtn.addEventListener('click', () => {
      window.scrollBy({
        top: -window.scrollY,
        behavior: 'smooth',
      });
    });
    return;
  }


  refs.upBtn.classList.add('is-hidden');
}
