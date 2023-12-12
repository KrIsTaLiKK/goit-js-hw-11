import { SearchQueryIcons } from './components/searchQueryIcons';
import { refs } from './refs';

const searchQueryIcons = new SearchQueryIcons();

export function onInputChangeToggleIcons(evt) {
  searchQueryIcons.refs.closeBtn.addEventListener('click', () => {
    refs.searchForm.reset();
    searchQueryIcons.hide();
  });

  searchQueryIcons.show();

  if (!evt.data) {
    searchQueryIcons.hide();
  }
}
