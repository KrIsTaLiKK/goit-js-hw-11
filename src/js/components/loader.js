export class Loader {
  constructor() {
    this.refs = document.querySelector('.loader');
  }

  show() {
    this.refs.classList.remove('is-hidden');
  }

  hide() {
    this.refs.classList.add('is-hidden');
  }
}
