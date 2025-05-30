import {dataObject} from "./js/data.js";

$(document).ready(function () {

  let currentSlide = 0;
  let currentThumbnailSlide = 0;


  initialize();

  function initialize() {
    addElementsToBody();
    attachEventHandlers();
    toggleActiveThumbClass(currentSlide);
  }

  function addElementsToBody() {
    const sliderWrap = $('<div>').addClass('slider-wrap');

    const titleElement = createTitleElement();
    const slider = createSlider();

    sliderWrap.append(slider);

    $('body').append(titleElement, sliderWrap);
  }

  function attachEventHandlers() {
    attachControlBtnHandlers('.control-btn', nextSlide, prevSlide);
    attachControlBtnHandlers('.thumbnail-control-btn', nextThumbnailSlide, prevThumbnailSlide);
    attachHoverHandlers('.control-btn');
    attachHoverHandlers('.thumbnail-control-btn');

    $('.thumbnail').on('click', function () {
      const index = $(this).index();
      goToSlide(index);
    });

  }

  function createTitleElement() {
    return $('<h1>').text(dataObject.title);
  }

  function createSlider() {
    let sliderContainer = $('<div>').attr('id', 'slider-container');
    let slider = $('<div>').addClass('slider');

    for (let i = 0; i < dataObject.images.length; i++) {
      let slide = $('<div>').addClass('slide');
      const { src, name, link, address } = dataObject.images[i];
      const imgElement = $('<img>').attr({
        src: 'images/' + src,
        alt: name,
      });
      const tooltip = $('<div>').addClass('slider__tooltip')
          .html(`
<strong>${name}</strong>
<address>${address}</address>

<span class="slider__locationWrap">
<i class="fa-solid fa-location-dot"></i>
<a href="${link}" class="slider__link" target="_blank">View on map</a>
</span>


`);
      slide.append(imgElement, tooltip);
      slider.append(slide);
    }

    const sliderControls = createSliderControls();
    const thumbnailsSlider = createThumbnailsSlider();
    return sliderContainer.append(slider, sliderControls, thumbnailsSlider);
  }

  function createSliderControls() {
    const sliderControls = $('<div>').addClass('slider-controls');
    const prevBtn = createControlButton(
      'prev',
      '<i class="fa-solid fa-square-caret-left"></i>',
    );
    const nextBtn = createControlButton(
      'next',
      '<i class="fa-solid fa-square-caret-right"></i>',
    );
    return sliderControls.append(prevBtn, nextBtn);
  }

  function createControlButton(className, html) {
    return $('<button>').addClass(`control-btn ${className}`).html(html);
  }

  function createThumbnailsSlider() {
    let thumbContainer = $('<div>').addClass('thumb-container');
    let thumbnailsSlider = $('<div>').addClass('thumbnails thumbnails-slider');


    for (let i = 0; i < dataObject.images.length; i++) {
      let thumbnail = $('<div>').addClass('thumbnail');

      const { src, name, link } = dataObject.images[i];

      // Create the thumbnail image
      const thumbnailImgSrc = 'images/' + src;
      const thumbnailImgElement = $('<img>').attr({
        src: thumbnailImgSrc,
        alt: 'Thumbnail ' + (i + 1),
        class: 'thumbnail__img',
      });


      thumbnail.append(thumbnailImgElement);

      thumbnailsSlider.append(thumbnail);
    }

    // Create thumbnail controls
    const thumbControls = createThumbnailControls();

    // Return the entire thumb container with controls and thumbnails
    return thumbContainer.append(thumbControls, thumbnailsSlider);
  }

  function createThumbnailControls() {
    const thumbControls = $('<div>').addClass('thumbnails-controls');
    const thumbPrevBtn = createControlButton(
      'thumbnail-control-btn prev',
      '<i class="fa-solid fa-caret-left"></i>',
    );
    const thumbNextBtn = createControlButton(
      'thumbnail-control-btn next',
      '<i class="fa-solid fa-caret-right"></i>',
    );
    return thumbControls.append(thumbPrevBtn, thumbNextBtn);
  }

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

    function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
    showThumbnailSlide(currentSlide);
    toggleActiveThumbClass(currentSlide);
  }

  function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
    showThumbnailSlide(currentSlide);
    toggleActiveThumbClass(currentSlide);
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
    currentSlide++;
    showSlide(currentSlide);
    showThumbnailSlide(currentThumbnailSlide);
    toggleActiveThumbClass(currentThumbnailSlide);

  }

  function prevThumbnailSlide() {
    currentThumbnailSlide--;
    currentSlide--;
    showSlide(currentSlide);
    showThumbnailSlide(currentThumbnailSlide);
    toggleActiveThumbClass(currentThumbnailSlide);

  }

  function attachHoverHandlers(selector) {
    $(selector).hover(
      function () {
        $(this).addClass('hovered');
      },
      function () {
        $(this).removeClass('hovered');
      },
    );
  }

  function attachControlBtnHandlers(selector, nextHandler, prevHandler) {
    $(`${selector}.next`).off('click').on('click', nextHandler);
  $(`${selector}.prev`).off('click').on('click', prevHandler);
  }
});
