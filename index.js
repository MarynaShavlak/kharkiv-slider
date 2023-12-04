$(document).ready(function () {
  const dataObject = {
    title: 'Welcome to Kharkiv!!!',
    images: [
      '1.jpg',
      '2.jpg',
      '3.jpg',
      '4.jpg',
      '5.jpg',
      '6.jpg',
      '7.jpg',
      '8.jpg',
      '9.jpg',
      '10.jpg',
      '11.jpg',
      '12.jpg',
      '13.jpg',
      '14.jpg',
      '15.jpg',
      '16.jpg',
      '17.jpg',
      '18.jpg',
    ],
  };

  const titleElement = $('<h1>').text(dataObject.title);
 let sliderContainer = $('<div>').attr('id', 'slider-container');
  let slider = $('<div>').addClass('slider');

  for (let i = 0; i < dataObject.images.length; i++) {
    let slide = $('<div>').addClass('slide');
    const imgSrc = 'images/' + dataObject.images[i];
    const imgElement = $('<img>').attr({
      src: imgSrc,
      alt: 'Slide ' + (i + 1),
    });
    slide.append(imgElement);
    slider.append(slide);
  }

  const sliderControls = $('<div>').addClass('slider-controls');
  const prevBtn = $('<button>')
    .addClass('control-btn prev')
    .html('<i class="fa-solid fa-square-caret-left"></i>');
  const nextBtn = $('<button>')
    .addClass('control-btn next')
    .html('<i class="fa-solid fa-square-caret-right"></i>');
  sliderControls.append(prevBtn, nextBtn);
 
  const thumbContainer = $('<div>').addClass('thumb-container');
  const thumbControls = $('<div>').addClass('thumbnails-controls');
  const thumbPrevBtn = $('<button>')
    .addClass('thumbnail-control-btn prev')
    .html('<i class="fa-solid fa-caret-left"></i>');
  const thumbNextBtn = $('<button>')
    .addClass('thumbnail-control-btn next')
    .html('<i class="fa-solid fa-caret-right"></i>');
  thumbControls.append(thumbPrevBtn, thumbNextBtn);

 let thumbnailsSlider = $('<div>').addClass('thumbnails thumbnails-slider');

  for (let i = 0; i < dataObject.images.length; i++) {
    let thumbnail = $('<div>').addClass('thumbnail');
    const thumbnailImgSrc = 'images/' + dataObject.images[i];
    const thumbnailImgElement = $('<img>').attr({
      src: thumbnailImgSrc,
      alt: 'Thumbnail ' + (i + 1),
      class: 'thumbnail__img',
    });
    thumbnail.append(thumbnailImgElement);
    thumbnailsSlider.append(thumbnail);
  }

  $('body').append(
    titleElement,
    sliderContainer.append(slider, sliderControls,  thumbContainer.append(thumbControls, thumbnailsSlider)),
   
  );

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
    if (transformValue <= -1500) {
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
