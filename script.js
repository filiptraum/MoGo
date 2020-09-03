// GAMBURGER

// const
const gamburger = document.querySelector('.gamburger');
const navItems = document.querySelector('.header__menu');

// function
let menuOpen = false;
gamburger.addEventListener('click', () => {
  if (!menuOpen) {
    gamburger.classList.add('open');
    menuOpen = true;
    navItems.style.left = 0;
  } else {
    gamburger.classList.remove('open');
    menuOpen = false;
    navItems.style.left = '-100%';
  }
});

// scroll-up
const wrapper = document.querySelector('.wrapper');
if (wrapper.clientWidth > 800) {

  // const
  const offset = 1000;
  const scrollUp = document.querySelector(".scroll-up");
  const scrollUpSvgPath = document.querySelector(".scroll-up__svg-path");
  const pathLength = scrollUpSvgPath.getTotalLength();

  scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
  scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';

  // get top (function)
  const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

  // updateDashoffset (function)
  const updateDashoffset = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const dashoffset = pathLength - (getTop() * pathLength / height);

    scrollUpSvgPath.style.strokeDashoffset = dashoffset;
  }

  // onScroll (function)

  window.addEventListener("scroll", () => {
    updateDashoffset();

    if (getTop() > offset) {
      scrollUp.classList.add('scroll-up_active');
    } else {
      scrollUp.classList.remove('scroll-up_active');
    }
  });

  // click

  scrollUp.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  updateDashoffset();
}

// sliderText
function sliderText(container, track, btnPrev, btnNext, items) {

  let position = 0;
  const slidesToShow = 1;
  const slidesToScroll = 1;
  const sliderContainer = document.querySelector(container);
  const sliderTrack = document.querySelector(track);
  const sliderBtnPrev = document.querySelector(btnPrev);
  const sliderBtnNext = document.querySelector(btnNext);
  const sliderItems = document.querySelectorAll(items);
  const itemsCount = sliderItems.length;
  const itemWidth = sliderContainer.clientWidth / slidesToShow;
  const movePosition = slidesToScroll * itemWidth;

  sliderItems.forEach((item) => {
    item.style.minWidth = `${itemWidth}px`;
  });

  sliderBtnNext.addEventListener('click', () => {
    
    sliderItems.forEach((item) => {
      item.style.filter = "blur(3px)";
    });

    setTimeout(() => {
      sliderItems.forEach((item) => {
        item.style.filter = "blur(0px)";
      });
    }, 450);

    const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

    position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

    setPosition();
    checkBtns();
  });

  sliderBtnPrev.addEventListener('click', () => {

     sliderItems.forEach((item) => {
       item.style.filter = "blur(3px)";
     });

     setTimeout(() => {
       sliderItems.forEach((item) => {
         item.style.transition = ".3s";
         item.style.filter = "blur(0px)";
       });
     }, 300);

    const itemsLeft = Math.abs(position) / itemWidth;

    position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

    setPosition();
    checkBtns();
  });

  function setPosition() {
    sliderTrack.style.transform = `translateX(${position}px)`;
  }

  function checkBtns() {
    sliderBtnPrev.disabled = position === 0;
    sliderBtnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
    if (sliderBtnPrev.disabled) {
      sliderBtnPrev.style.opacity = 0;
      sliderBtnPrev.style.pointerEvents = 'none';

    } else {
      sliderBtnPrev.style.opacity = 1;
      sliderBtnPrev.style.pointerEvents = 'visible';

    }
    if (sliderBtnNext.disabled) {
      sliderBtnNext.style.opacity = 0;
      sliderBtnNext.style.pointerEvents = 'none';
    } else {
      sliderBtnNext.style.opacity = 1;
      sliderBtnNext.style.pointerEvents = 'visible';
    }
  }
  checkBtns();
}

sliderText(".quote__slider", ".quote__track", "#quote__left-arrow", "#quote__right-arrow", ".quote__item");
sliderText(".testimonial__slider", ".testimonial__track", "#testimonial__left-arrow", "#testimonial__right-arrow", ".testimonial__item");

window.addEventListener('keyup', (e) => {
  if (e.ctrlKey & e.shiftKey & e.keyCode === 73) {
    alert("При колапсировании блоков не пугайтесь, просто перезагрузите страницу");
  }
  
});
