$(document).ready(function () {
  let currentSlide = 0;
  let currentThumbnailSlide = 0;

  $('.control-btn.next').on('click', nextSlide);
  $('.control-btn.prev').on('click', prevSlide);
  $('.thumbnail').on('click', function () {
    const index = $(this).index();
    goToSlide(index);
  });
  $('.thumbnail-control-btn.next').on('click', nextThumbnailSlide);
  $('.thumbnail-control-btn.prev').on('click', prevThumbnailSlide);
  $('.thumbnail').on('click', function () {
    const index = $(this).index();
    goToSlide(index);
  });

  toggleActiveThumbClass(currentSlide);

  function showSlide(index) {
    const slider = $('.slider');
    const slideWidth = $('.slide').width();

    if (index < 0) {
      index = slider.children().length - 1;
    } else if (index >= slider.children().length) {
      index = 0;
    }

    currentSlide = index;

    const transformValue = -index * slideWidth;
    slider.css('transform', `translateX(${transformValue}px)`);
  }

  function showThumbnailSlide(index) {
    const thumbnailSlider = $('.thumbnails-slider');
    const thumbnailSlideWidth = $('.thumbnail__img').width();

    if (index < 0) {
      index = thumbnailSlider.children().length - 1;
    } else if (index >= thumbnailSlider.children().length) {
      index = 0;
    }

    currentThumbnailSlide = index;

    let transformValue = -index * thumbnailSlideWidth;
    if(transformValue <= -1500) {
      transformValue = -1470;
    }
    thumbnailSlider.css('transform', `translateX(${transformValue}px)`);
    
  }

  function updateSlides() {
    showSlide(currentSlide);
    showThumbnailSlide(currentThumbnailSlide + 1);
    toggleActiveThumbClass(currentThumbnailSlide);
  }

  function nextSlide() {
    currentSlide++;
    updateSlides();
  }

  function prevSlide() {
    currentSlide--;
    updateSlides();
  }

  function goToSlide(index) {
    showSlide(index);
    showThumbnailSlide(index);
    toggleActiveThumbClass(index);
  }

  function toggleActiveThumbClass(index) {
    const thumbList = $('.thumbnail');
    thumbList.addClass('shaded', 4000, 'easeOutBounce');
    thumbList.eq(index).removeClass('shaded');
  }

  function nextThumbnailSlide() {
    currentThumbnailSlide++;
    showThumbnailSlide(currentThumbnailSlide);
  }

  function prevThumbnailSlide() {
    currentThumbnailSlide--;
    showThumbnailSlide(currentThumbnailSlide);
  }
});
