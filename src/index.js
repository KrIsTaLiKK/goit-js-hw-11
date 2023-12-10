import 'modern-normalize/modern-normalize.css';
import { lightbox } from './js/lightbox';
import { ImgApiService } from './js/img-api';
import { refs } from './js/refs';
import { upBtnVisible } from './js/scroll';
import { LoadMoreBtn } from './js/components/load-more-btn';
import { SearchQueryIcons } from './js/components/searchQueryIcons';

const imgApiService = new ImgApiService();

const loadMoreBtn = new LoadMoreBtn();

const searchQueryIcons = new SearchQueryIcons();

refs.searchForm.addEventListener('input', onInputChange);
refs.searchForm.addEventListener('submit', onFormSubmit);
loadMoreBtn.refs.btnLoadMore.addEventListener('click', onLoadMore);

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

function onLoadMore() {
  imgApiService.incrementPage();

  imgApiService
    .fetchImg()
    .then(data => {
      renderImgGallery(data.hits);
      checkTotalPages(data.totalHits);
    })
    .catch(fetchError);
}

function onFormSubmit(e) {
  e.preventDefault();
  clearGalleryContainer();

  const form = e.currentTarget;
  imgApiService.query = form.elements.searchQuery.value.trim();

  if (!imgApiService.query) {
    return;
  }

  imgApiService.resetPage();
  loadMoreBtn.hide();

  imgApiService
    .fetchImg()
    .then(data => {
      if (!data.hits.length) {
        return alert(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      renderImgGallery(data.hits);
      loadMoreBtn.show();
      window.addEventListener('scroll', upBtnVisible);

      checkTotalPages(data.totalHits);
      searchQueryIcons.hideLupa();
    })
    .catch(fetchError);
}

function checkTotalPages(totalHits) {
  const totalPages = imgApiService.countTotalPages(totalHits);
  const currentPage = imgApiService.showCurrentPage();
  if (totalPages === currentPage) {
    loadMoreBtn.hide();
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
  alert('Oops!Something went wrong! Try reloading the page!');
}

function clearGalleryContainer() {
  refs.containerGallery.innerHTML = '';
}
