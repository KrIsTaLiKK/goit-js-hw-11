import axios from 'axios';
import { refs } from './refs';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41113707-b787cf54455f04a9cbcdc6f85';

export class ImgApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  fetchImg() {
    const params = new URLSearchParams({
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: this.perPage,
    });

    return axios
      .get(`${BASE_URL}?key=${API_KEY}&${params}`)
      .then(({ data }) => {
        // console.log('FETCH', data);
        return data;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  showCurrentPage() {
    return this.page;
  }

  countTotalPages(totalHits) {
    return Math.ceil(totalHits / this.perPage);
  }
}
