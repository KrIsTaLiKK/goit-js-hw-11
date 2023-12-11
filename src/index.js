import 'modern-normalize/modern-normalize.css';
import { lightbox } from './js/lightbox';
import {
  notifyFailureMsg,
  notifySuccessMsg,
  reportFailureMsg,
} from './js/notiflix';
import { ImgApiService } from './js/img-api';
import { refs } from './js/refs';
import { upBtnVisible } from './js/scroll';
import { Loader } from './js/components/loader';
import { SearchQueryIcons } from './js/components/searchQueryIcons';

const imgApiService = new ImgApiService();

// const loadMoreBtn = new LoadMoreBtn();

const searchQueryIcons = new SearchQueryIcons();
const loader = new Loader();

// ========= OBSERVER ===========
let options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(onLoad, options);

// ========= OBSERVER ===========

refs.searchForm.addEventListener('input', onInputChange);
refs.searchForm.addEventListener('submit', onFormSubmit);
// loadMoreBtn.refs.btnLoadMore.addEventListener('click', onLoadMore);

function onLoad(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loader.show();

      imgApiService.incrementPage();

      imgApiService
        .fetchImg()
        .then(data => {
          renderImgGallery(data.hits);
          loader.hide();

          checkTotalPages(data.totalHits);
        })
        .catch(fetchError);
    }
  });
}

// ========== FORM SUBMIT ==================

function onFormSubmit(e) {
  e.preventDefault();
  clearGalleryContainer();

  const form = e.currentTarget;
  imgApiService.query = form.elements.searchQuery.value.trim();

  if (!imgApiService.query) {
    return;
  }
  loader.show();

  imgApiService.resetPage();
  observer.unobserve(refs.target);

  imgApiService
    .fetchImg()
    .then(data => {
      if (!data.hits.length) {
        form.reset();
        searchQueryIcons.hide();
        loader.hide();

        reportFailureMsg();
        return;
      }

      notifySuccessMsg(data.totalHits);

      refs.body.classList.remove('overlay');
      renderImgGallery(data.hits);
      loader.hide();

      observer.observe(refs.target);

      // loadMoreBtn.show();
      window.addEventListener('scroll', upBtnVisible);

      searchQueryIcons.hideLupa();
      checkTotalPages(data.totalHits);
    })
    .catch(fetchError);
}

// Функция, которая при изменении инпута - показывает иконку лупы и кнопку крестик и УБИРАЕТ их, если инпут пустой
function onInputChange(e) {
  searchQueryIcons.refs.closeBtn.addEventListener('click', () => {
    refs.searchForm.reset();
    searchQueryIcons.hide();
  });

  searchQueryIcons.show();

  const form = e.currentTarget;
  imgApiService.query = form.elements.searchQuery.value
    .trim()
    .toLowerCase()
    .split(' ')
    .join('');

  if (!imgApiService.query) {
    searchQueryIcons.hide();
  }
}

function checkTotalPages(totalHits) {
  const totalPages = imgApiService.countTotalPages(totalHits);
  const currentPage = imgApiService.showCurrentPage();

  if (totalPages === currentPage) {
    // loadMoreBtn.hide();
    observer.unobserve(refs.target);
    notifyFailureMsg();
  }
}

// Функция, которая будет рендерить разметку

function renderImgGallery(data) {
  const markup = data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return ` <div class="photo-card">
      <a href='${largeImageURL}'>
      <img src="${webformatURL}" alt="${tags}" loading="lazy" height='270px' /></a>
      <div class="info">
      <div>
        <p class="info-item-likes">
          <b>❤ Likes:</b> ${likes}
        </p>
        <p class="info-item-views">
          <b>👀 Views:</b> ${views}
        </p>
        </div>
        <div>
        <p class="info-item-comments">
          <b>💬 Comments:</b> ${comments} 
        </p>
        <p class="info-item-downloads">
          <b>📥 Downloads:</b> ${downloads} 
        </p>
        </div>
      </div>
    </div>`;
      }
    )
    .join('');

  refs.containerGallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

function fetchError(error) {
  loader.hide();
  reportFailureMsg();
}

function clearGalleryContainer() {
  refs.containerGallery.innerHTML = '';
}
