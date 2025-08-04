import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" class="gallery-image" />
          <div class="image-info">
            <p><b>Likes:</b> ${likes}</p>
            <p><b>Views:</b> ${views}</p>
            <p><b>Comments:</b> ${comments}</p>
            <p><b>Downloads:</b> ${downloads}</p>
          </div>
        </a>
      </li>
    `
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  document.querySelector('.loader').style.display = 'block';
}

export function hideLoader() {
  document.querySelector('.loader').style.display = 'none';
}

export function showLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more');
  if (loadMoreBtn) loadMoreBtn.style.display = 'block';
}

export function hideLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more');
  if (loadMoreBtn) loadMoreBtn.style.display = 'none';
}

export function showBottomLoader() {
  document.querySelector('.loader-bottom').style.display = 'block';
}

export function hideBottomLoader() {
  document.querySelector('.loader-bottom').style.display = 'none';
}

export function showLoadingText() {
  const loadingText = document.querySelector('.loading-text');
  if (loadingText) loadingText.style.display = 'block';
}

export function hideLoadingText() {
  const loadingText = document.querySelector('.loading-text');
  if (loadingText) loadingText.style.display = 'none';
}

export function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-item');
  if (galleryItem) {
    const { height } = galleryItem.getBoundingClientRect();
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  }
}
