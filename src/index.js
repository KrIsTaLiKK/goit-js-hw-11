import 'modern-normalize/modern-normalize.css';
import { lightbox } from './js/lightbox';
import {
  notifyFailureMsg,
  notifySuccessMsg,
  reportFailureMsg,
  reportMsgNotFoundImg,
  notifyFailureMsgEmptyRequest,
} from './js/notiflix';
import { refs } from './js/refs';
import { ImgApiService } from './js/img-api';
import { madePhotoCardMarkup } from './js/templates/photo-card';
import { SearchQueryIcons } from './js/components/searchQueryIcons';
import { onInputChangeToggleIcons } from './js/searchQueryToggleIcons';
import { upBtnVisible } from './js/scroll';
import { Loader } from './js/components/loader';

const imgApiService = new ImgApiService();
const searchQueryIcons = new SearchQueryIcons();
const loader = new Loader();

// ========= OBSERVER ===========

let observer = new IntersectionObserver(onLoad, {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
});

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.searchForm.addEventListener('input', onInputChangeToggleIcons);

// ========== FORM SUBMIT ==================

function onFormSubmit(e) {
  e.preventDefault();
  clearGalleryContainer();
  onInputChangeToggleIcons(e);

  const form = e.currentTarget;
  imgApiService.query = form.elements.searchQuery.value
    .trim()
    .toLowerCase()
    .split(' ')
    .join('');

  if (!imgApiService.query) {
    notifyFailureMsgEmptyRequest();
    return;
  }

  loader.show();

  imgApiService.resetPage();
  observer.unobserve(refs.target);

  renderInterfaceAfterSubmit(form);
}

// Рендер інтерфейсу після САБМІТУ

async function renderInterfaceAfterSubmit(form) {
  try {
    const data = await fetchData();

    if (!data.hits.length) {
      form.reset();
      searchQueryIcons.hide();
      loader.hide();

      reportMsgNotFoundImg();
      return;
    }

    notifySuccessMsg(data.totalHits);
    refs.body.classList.remove('overlay');
    observer.observe(refs.target);

    if (data.totalHits < imgApiService.showPerPage()) {
      observer.unobserve(refs.target);
    }

    window.addEventListener('scroll', upBtnVisible);
    searchQueryIcons.hideLupa();
  } catch (error) {
    fetchError();
  }
}

// Асинхронна функція
async function fetchData() {
  try {
    const { data } = await imgApiService.fetchFromApi();
    renderImgGallery(data.hits);
    loader.hide();
    checkTotalPages(data.totalHits);

    return data;
  } catch (error) {
    fetchError();
  }
}

// ============== ONLOAD ==================

function onLoad(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loader.show();

      imgApiService.incrementPage();
      fetchData();
    }
  });
}

function checkTotalPages(totalHits) {
  const totalPages = imgApiService.countTotalPages(totalHits);
  const currentPage = imgApiService.showCurrentPage();

  if (totalPages === currentPage) {
    observer.unobserve(refs.target);
    notifyFailureMsg();
  }
}

// Render photo-card markup
function renderImgGallery(data) {
  const markup = madePhotoCardMarkup(data);

  refs.containerGallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

function fetchError() {
  loader.hide();
  searchQueryIcons.show();
  reportFailureMsg();
}

function clearGalleryContainer() {
  refs.containerGallery.innerHTML = '';
}
