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
}
