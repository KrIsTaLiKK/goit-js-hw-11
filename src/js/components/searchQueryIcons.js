import { refs } from '../refs';

export class SearchQueryIcons {
  constructor() {
    this.refs = refs;
  }

  // getRefs() {
  //   const refs = {};
  //   refs.closeBtn = document.querySelector('.close-button-wrap');
  //   refs.searchIcon = document.querySelector('.search-icon');
  //   return refs;
  // }

  show() {
    this.refs.closeBtn.classList.add('close-button-vizible');
    this.refs.searchIcon.classList.add('is-active');
  }

  hide() {
    this.refs.closeBtn.classList.remove('close-button-vizible');
    this.refs.searchIcon.classList.remove('is-active');
  }

  hideLupa() {
    this.refs.searchIcon.classList.remove('is-active');
  }
}
