// Scroll reveal using IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        obs.unobserve(e.target);
      }
    });
  }, {threshold: 0.18});
  revealEls.forEach(el => io.observe(el));

  // Lightbox gallery
  const galleryButtons = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.querySelector('.lb-img');
  const lbClose = document.querySelector('.lb-close');
  const lbNext = document.querySelector('.lb-next');
  const lbPrev = document.querySelector('.lb-prev');

  const images = Array.from(galleryButtons).map(btn => btn.dataset.src);
  let current = -1;

  function openLightbox(idx){
    current = idx;
    lbImg.src = images[current];
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox(){
    lightbox.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    lbImg.src = '';
  }
  function nextImage(){ if(current < images.length -1) openLightbox(current+1); }
  function prevImage(){ if(current > 0) openLightbox(current-1); }

  galleryButtons.forEach((btn, i) => {
    btn.addEventListener('click', () => openLightbox(i));
  });
  lbClose.addEventListener('click', closeLightbox);
  lbNext.addEventListener('click', nextImage);
  lbPrev.addEventListener('click', prevImage);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // keyboard controls
  document.addEventListener('keydown', (e) => {
    if (lightbox.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    }
  });

  // Optional: Preload gallery images for smoother lightbox
  images.forEach(src => { const img = new Image(); img.src = src; });
});
