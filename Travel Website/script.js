let currentIndex = 0;

// Open Lightbox
function openLightbox(index) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const images = document.querySelectorAll('.gallery-img');

  currentIndex = index;
  lightbox.style.display = 'flex';
  lightboxImg.src = images[currentIndex].src;
}

// Close Lightbox
function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

// Change Image in Lightbox
function changeImage(direction) {
  const images = document.querySelectorAll('.gallery-img');
  currentIndex = (currentIndex + direction + images.length) % images.length;
  document.getElementById('lightbox-img').src = images[currentIndex].src;
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  if (document.getElementById('lightbox').style.display === 'flex') {
    if (e.key === 'ArrowRight') changeImage(1);
    if (e.key === 'ArrowLeft') changeImage(-1);
    if (e.key === 'Escape') closeLightbox();
  }
});

