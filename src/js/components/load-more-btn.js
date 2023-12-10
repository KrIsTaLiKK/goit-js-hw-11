export class LoadMoreBtn {
  constructor() {
    this.refs = this.getRefs();
  }

  getRefs() {
    const refs = {};
    refs.btnLoadMore = document.querySelector('.load-more');
    return refs;
  }

  show() {
    this.refs.btnLoadMore.hidden = false;
  }

  hide() {
    this.refs.btnLoadMore.hidden = true;
  }

  //   enable() {
  //     this.refs.button.disabled = false;
  //     // this.refs.label.textContent = 'Показать ещё';
  //     // this.refs.spinner.classList.add('is-hidden');
  //   }

  //   disable() {
  //     this.refs.button.disabled = true;
  //     // this.refs.label.textContent = 'Загружаем...';
  //     // this.refs.spinner.classList.remove('is-hidden');
  //
}
