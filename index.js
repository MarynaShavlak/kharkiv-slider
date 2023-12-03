$(document).ready(function(){
  let currentSlide = 0;
  let currentThumbnailSlide = 0;

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

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function goToSlide(index) {
    showSlide(index);
    showThumbnailSlide(index);
  }


  function showThumbnailSlide(index) {
    console.log('click');
    const thumbnailSlider = $('.thumbnails-slider');
    console.log('thumbnailSlider: ', thumbnailSlider);
    const thumbnailSlideWidth = $('.thumbnail').width();
    console.log('thumbnailSlideWidth: ', thumbnailSlideWidth);

    if (index < 0) {
      index = thumbnailSlider.children().length - 1;
    } else if (index >= thumbnailSlider.children().length) {
      index = 0;
    }

    currentThumbnailSlide = index;

    const transformValue = -index * thumbnailSlideWidth;
    thumbnailSlider.css('transform', `translateX(${transformValue}px)`);
  }

  function nextThumbnailSlide() {
    showThumbnailSlide(currentThumbnailSlide + 1);
  }

  function prevThumbnailSlide() {
    showThumbnailSlide(currentThumbnailSlide - 1);
  }


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
})



