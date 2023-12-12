export function madePhotoCardMarkup(data) {
  return data
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
}
