import { refs } from './refs';

export function upBtnVisible() {
  const { height: cardHeight } =
    refs.containerGallery.firstElementChild.getBoundingClientRect();

  // Если высота всего окна больше размера карточки, upBtn ПОКАЗАНА и вешаем в это время на нее СЛУШАТЕЛЬ СОБЫТИЯ
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

  // Если высота всего окна меньше размера карточки, upBtn СКРЫТА
  refs.upBtn.classList.add('is-hidden');
}
