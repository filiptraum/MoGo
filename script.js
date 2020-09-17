// moveToID
function moveToID(Selector) {
  const moveToThis = document.querySelector(Selector);
  moveToThis.scrollIntoView();
}

document.addEventListener("DOMContentLoaded", () => {
  // GAMBURGER

  const gamburger = document.querySelector('.gamburger');
  const navItems = document.querySelector('.header__menu');

  let menuOpen = false;
  gamburger.addEventListener('click', () => {
    if (!menuOpen) {
      gamburger.classList.add('open');
      menuOpen = true;
      navItems.style.transform = 'rotateX(0deg)';
    } else {
      gamburger.classList.remove('open');
      menuOpen = false;
      navItems.style.transform = 'rotateX(90deg)';
    }
  });

  // scroll-up
  const wrapper = document.querySelector('.wrapper');
  if (wrapper.clientWidth > 800) {

    // scroll-up
    const offset = 1050;
    const scrollUp = document.querySelector(".scroll-up");
    const scrollUpSvgPath = document.querySelector(".scroll-up__svg-path");
    const pathLength = scrollUpSvgPath.getTotalLength();

    scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';

    const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

    const updateDashoffset = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const dashoffset = pathLength - (getTop() * pathLength / height);

      scrollUpSvgPath.style.strokeDashoffset = dashoffset;
    }

    window.addEventListener("scroll", () => {
      // scroll up
      updateDashoffset();

      if (getTop() > offset) {
        // scroll up
        scrollUp.classList.add("scroll-up_active");
        // fixed-slider
      } else {
        // scroll up
        scrollUp.classList.remove("scroll-up_active");
      }
    });

    scrollUp.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    updateDashoffset();

  }

  // about focus
  const aboutItems = document.querySelectorAll(".about__item");

  aboutItems.forEach(item => {
    item.addEventListener('focus', () => {
      item.classList.add("_active-anim");
    });
    item.addEventListener('blur', () => {
      item.classList.remove("_active-anim");
    });
    item.addEventListener('mouseover', () => {
      item.classList.add("_active-anim");
    });
    item.addEventListener('mouseout', () => {
      item.classList.remove("_active-anim");
    });
  });

  // facts HOver
  if (wrapper.clientWidth > 650) {
    const factsItem = document.querySelectorAll(".facts__item");

    factsItem.forEach(item => {
      if (item.classList.contains("facts__item1")) {
        item.addEventListener("mouseover", () => {
          item.classList.add("_active1");
        });
      }
      if (item.classList.contains("facts__item5")) {
        item.addEventListener("mouseover", () => {
          item.classList.add("_active5");
        });
      } else if (!item.classList.contains("facts__item5") && !item.classList.contains("facts__item1")) {
        item.addEventListener("mouseover", () => {
          item.classList.add("_active");
        });
      }
      item.addEventListener('mouseout', () => {
        item.classList.remove("_active");
        item.classList.remove("_active1");
        item.classList.remove("_active5");
      });
    });

    function widthFacts() {
      const factItem = document.querySelector(".facts__item");
      let fWidth = factItem.clientWidth + "px";

      factsItem.forEach(item => {
        if (item.classList.contains("facts__item5")) {
          item.style.setProperty('--fWidthMi', `-${fWidth}`);
        }
        if (item.classList.contains("facts__item1")) {
          item.style.setProperty('--fWidthPl', fWidth);
        } else if (!item.classList.contains("facts__item5") && !item.classList.contains("facts__item1")) {
          item.style.setProperty('--fWidthPl', fWidth);
          item.style.setProperty('--fWidthMi', `-${fWidth}`);
        }
      });
    }
    widthFacts();
  }

  // team hover effect
  const teamItems = document.querySelectorAll(".team__image");
  const teamIcon = document.querySelectorAll(".team__icon");

  teamItems.forEach((item) => {
    item.addEventListener("mouseover", () => {
      item.classList.add("_active-anim");
    });
    item.addEventListener("mouseout", () => {
      item.classList.remove("_active-anim");
    });

    item.addEventListener("focus", () => {
      item.classList.add("_active");
      item.classList.add("_active-anim");
    });
    item.addEventListener("blur", () => {
      item.classList.remove("_active");
      item.classList.remove("_active-anim");
    });
  });

  teamIcon.forEach((item) => {


    item.addEventListener("focus", () => {
      const blockHover = item.parentElement;
      blockHover.parentElement.classList.add("_active");
      blockHover.parentElement.classList.remove("_active-anim");
    });
    item.addEventListener("blur", () => {
      const blockHover = item.parentElement;
      blockHover.parentElement.classList.remove("_active");
    });
    item.addEventListener("mouseover", () => {
      const blockHover = item.parentElement;
      blockHover.parentElement.classList.remove("_active-anim");
    });
    item.addEventListener("mouseout", () => {
      const blockHover = item.parentElement;
      blockHover.parentElement.classList.add("_active-anim");
    });
  });

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

      const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

      position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

      setPosition();
      checkBtns();
    });

    sliderBtnPrev.addEventListener('click', () => {

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

  sliderText(".shop-slider", ".shop-slider__track", "#shop__left-arrow", "#shop__right-arrow", ".shop-slider__item");
  sliderText(".quote__slider", ".quote__track", "#quote__left-arrow", "#quote__right-arrow", ".quote__item");
  sliderText(".testimonial__slider", ".testimonial__track", "#testimonial__left-arrow", "#testimonial__right-arrow", ".testimonial__item");

  window.addEventListener('keyup', (e) => {
    if (e.ctrlKey & e.shiftKey & e.keyCode === 73) {
      alert("При колапсировании блоков не пугайтесь, просто перезагрузите страницу");
    }
  });

  // serviceBtnChange
  const changeBtn = (itemsSelector, btnSelector, contentSelector, activeContent, activeBtn) => {
    const itemsBlock = document.querySelector(itemsSelector);
    const btn = document.querySelectorAll(btnSelector);
    const content = document.querySelectorAll(contentSelector);

    function hideContent() {
      content.forEach(item => {
        item.classList.remove(activeContent);
      });

      btn.forEach(item => {
        item.classList.remove(activeBtn);
      });
    }

    function showContent(i = 0) {
      content[i].classList.add(activeContent);
      btn[i].classList.add(activeBtn);
    }

    hideContent();
    showContent();

    itemsBlock.addEventListener('click', (e) => {
      const target = e.target;
      if (target.classList.contains(btnSelector.replace(/\./, ""))) {
        btn.forEach((item, i) => {
          if (target == item) {
            hideContent();
            showContent(i);
          }
        });
      }
    });
  };

  changeBtn(".slider", ".slider__line", ".slider__item", "_active-slider", "_active-line");
  changeBtn(".service2__items", ".service2__button", ".service2__hidden-text", "service2_active", "activeBtn");

  const sections = document.querySelectorAll('section');

  const options = {
    threshold: 0.7
  };

  let observer = new IntersectionObserver(navCheck, options);

  function navCheck(entries) {
    entries.forEach(entry => {
      const introItemActive = document.querySelector('#bannerLine');
      const workItemActive = document.querySelector('#workLine');
      const blogItemActive = document.querySelector('#blogLine');
      const contactsItemActive = document.querySelector('#contactsLine');

      const introItemLine = document.querySelector('#bannerItemLine');
      const workItemLine = document.querySelector('#workItemLine');
      const blogItemLine = document.querySelector('#blogItemLine');
      const contactsItemLine = document.querySelector('#contactsItemLine');

      if (entry.target.classList.contains('banner')) {
        introItemActive.classList.add('_active-line');
        introItemLine.classList.add('_active-slider');
      } else {
        introItemActive.classList.remove('_active-line');
        introItemLine.classList.remove('_active-slider');
      }

      if (entry.target.classList.contains('work')) {
        workItemActive.classList.add('_active-line');
        workItemLine.classList.add('_active-slider');
      } else {
        workItemActive.classList.remove('_active-line');
        workItemLine.classList.remove('_active-slider');
      }

      if (entry.target.classList.contains('blog')) {
        blogItemActive.classList.add('_active-line');
        blogItemLine.classList.add('_active-slider');

      } else {
        blogItemActive.classList.remove('_active-line');
        blogItemLine.classList.remove('_active-slider');
      }

      if (entry.target.classList.contains('links')) {
        contactsItemActive.classList.add('_active-line');
        contactsItemLine.classList.add('_active-slider');

      } else {
        contactsItemActive.classList.remove('_active-line');
        contactsItemLine.classList.remove('_active-slider');
      }

      if (!entry.target.classList.contains('banner') &&
        !entry.target.classList.contains('work') &&
        !entry.target.classList.contains('blog') &&
        !entry.target.classList.contains('links')) {
        introItemActive.classList.remove('_active-line');
        workItemActive.classList.remove('_active-line');
        blogItemActive.classList.remove('_active-line');
        contactsItemActive.classList.remove('_active-line');

        introItemLine.classList.remove('_active-slider');
        workItemLine.classList.remove('_active-slider');
        blogItemLine.classList.remove('_active-slider');
        contactsItemLine.classList.remove('_active-slider');
      }
    });
  }

  sections.forEach(section => {
    observer.observe(section);
  });


  // open shop
  const wrap = document.querySelector(".wrapper");
  const siteBody = document.querySelector('.body');
  const shopCloseBtnItem = document.querySelector("#shop_button-close");
  const shopOpenBtnItem = document.querySelector('#header-shop');
  const shopPopup = document.querySelector('.shop');

  shopCloseBtnItem.addEventListener("click", shopClose);
  shopOpenBtnItem.addEventListener("click", shopOpen);

  function shopClose() {
    wrap.classList.remove('shop-open_wrap');
    siteBody.classList.remove("shop-open_body");
    shopPopup.classList.add("shop_close");
    shopCloseBtnItem.style.transform = "translateX(-30px) scale(1.6)";
  }

  function shopOpen() {
    wrap.classList.add('shop-open_wrap');
    siteBody.classList.add("shop-open_body");
    shopPopup.classList.remove("shop_close");
    shopCloseBtnItem.style.transform = "translateX(0px) scale(1)";
  }

  // shop-slider__button
  const sliderBuyBtn = document.querySelectorAll('#shop-slider__button');

  sliderBuyBtn.forEach(e => {
    e.addEventListener("click", () => {
      alert("Поздравляю! Ваша покупка: 'ничего', успешно добавлена в корзинку ");
    });
  })

  // open input
  const searchBtn = document.querySelector("#header-search");
  const inputArea = document.querySelector(".header__search-input");
  const inputAreaBox = document.querySelector(".header__search-input_box");
  const inputBtnClose = document.querySelector(".header-close-search");


  searchBtn.addEventListener("click", openInput);
  inputBtnClose.addEventListener("click", closeInput);

  function openInput() {
    searchBtn.style.display = "none";
    inputBtnClose.style.display = "flex";
    inputArea.classList.add("_open");
    inputAreaBox.classList.add("_close");
  };

  function closeInput() {
    searchBtn.style.display = "flex";
    inputBtnClose.style.display = "none";
    inputArea.classList.remove("_open");
    inputAreaBox.classList.remove("_close");
  };

  // animation 
  const animItems = document.querySelectorAll("._anim_items");

  if (animItems.length > 0) {
    window.addEventListener('scroll', animationScrolling);

    function animationScrolling() {
      for (let index = 0; index < animItems.length; index++) {
        const animItem = animItems[index];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offsetFunc(animItem).top;
        const animStart = 4;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;
        if (animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
          animItem.classList.add("_anim-active");
        } else {
          if (!animItem.classList.contains('_active-no-hide')) {
            animItem.classList.remove("_anim-active");
          }
        }
      }
    }

    function offsetFunc(el) {
      const rect = el.getBoundingClientRect();
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
      }
    }

    setTimeout(() => {
      animationScrolling();
    }, 300);
  }
});