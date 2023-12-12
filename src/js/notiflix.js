import Notiflix from 'notiflix';

const notifyOptions = {
  width: '500px',
  borderRadius: '20px',
  fontSize: '25px',
  useIcon: false,
};

const reportOptions = {
  titleFontSize: '25px',
  messageFontSize: '25px',
  buttonFontSize: '20px',
  width: '520px',
  svgSize: '0px',
  backOverlayClickToClose: true,
};

export function notifySuccessMsg(totalHits) {
  Notiflix.Notify.success(
    `😊Hooray!
       We found ${totalHits} images!`,
    notifyOptions
  );
}

export function notifyFailureMsg() {
  Notiflix.Notify.failure(
    "We're sorry, but you've reached the end of search results 😪",
    notifyOptions
  );
}

export function reportFailureMsg() {
  return Notiflix.Report.failure(
    'Oops!',
    'Something went wrong! Try reloading the page!',
    'Okay',
    reportOptions
  );
}

export function reportMsgNotFoundImg() {
  return Notiflix.Report.failure(
    'Sorry!',
    'There are no images matching your search query. Please try again.',
    'Okay',
    reportOptions
  );
}
