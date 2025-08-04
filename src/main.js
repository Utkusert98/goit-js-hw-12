import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  showBottomLoader,
  hideBottomLoader,
  smoothScroll,
  showLoadingText,
  hideLoadingText,
} from './js/render-functions.js';

const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

let searchQuery = '';
let currentPage = 1;
const PER_PAGE = 15;
let totalHits = 0;

searchForm.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSubmit(event) {
  event.preventDefault();
  showLoader();
  const newQuery = event.target.elements['search-text'].value.trim();

  if (newQuery === searchQuery && currentPage > 1) {
    return;
  }

  searchQuery = newQuery;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();

  if (!searchQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term',
      position: 'topRight',
    });
    return;
  }

  try {
    showLoader();
    const data = await getImagesByQuery(searchQuery, currentPage, PER_PAGE);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'No images found. Try another word!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    if (data.totalHits > PER_PAGE) {
      showLoadMoreButton();
    }

    if (data.hits.length < PER_PAGE || currentPage * PER_PAGE >= totalHits) {
      hideLoadMoreButton();
      showEndMessage();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Fetch error. Try again later.',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    hideLoader();
  }
}

async function handleLoadMore() {
  currentPage += 1;

  try {
    showBottomLoader();
    showLoadingText();
    hideLoadMoreButton();

    const data = await getImagesByQuery(searchQuery, currentPage, PER_PAGE);
    createGallery(data.hits);
    smoothScroll();

    if (currentPage * PER_PAGE >= totalHits) {
      showEndMessage();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images.',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    hideBottomLoader();
    hideLoadingText();
  }
}

function showEndMessage() {
  if (currentPage * PER_PAGE >= totalHits && totalHits > PER_PAGE) {
    iziToast.info({
      title: 'Info',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  }
}
