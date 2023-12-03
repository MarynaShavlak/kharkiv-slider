$(document).ready(function(){
  let currentSlide = 0;

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
  }


  $('.control-btn.next').on('click', nextSlide);
  $('.control-btn.prev').on('click', prevSlide);
  $('.thumbnail').on('click', function () {
    const index = $(this).index();
    goToSlide(index);
  });
})



