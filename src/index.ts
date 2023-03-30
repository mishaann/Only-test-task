"use strict";

import Swiper, { Navigation, Pagination } from "swiper";

const totalSlides = 6;
const circleBtns = document.querySelectorAll(".small_circle");
const navigationBtns = document.querySelector(".nav-container");

//свайпер-оболочка
const swiperBtm = new Swiper(".bottom-swiper", {
  allowTouchMove: false,
  modules: [Navigation],
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
//для каждого nested-свайпера
const swiperElem = new Swiper(".elem-swiper", {
  nested: true,
  modules: [Navigation, Pagination],
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  navigation: {
    nextEl: ".nested-button-next",
    prevEl: ".nested-button-prev",
  },
  breakpoints: {
    1280: {
      freeMode: true,
      slidesPerView: 3,
    },
    600: {
      freeMode: true,
      slidesPerView: 2,
      spaceBetween: 30,
    },
    320: {
      freeMode: true,
      slidesPerView: 2,
      spaceBetween: 30,
    },
  },
});

//навигация по кнопкам общего свайпера
navigationBtns.addEventListener("click", (e: Event) => {
  const yearFrom = document.querySelector("#year-from");
  const yearTo = document.querySelector("#year-to");
  const curPage = document.querySelector("#page-count");

  let curCircle: HTMLElement;
  //вращение колеса
  const curActive: HTMLElement = document.querySelector(".main");

  if ((e.target as HTMLInputElement).classList.contains("swiper-button-next")) {
    curPage.textContent = `0${swiperBtm.activeIndex + 1}/0${totalSlides}`;
    curCircle = document.querySelector(
      `[data-id="${swiperBtm.activeIndex + 1}"]`
    );
  }

  if ((e.target as HTMLInputElement).classList.contains("swiper-button-prev")) {
    curPage.textContent = `0${swiperBtm.activeIndex + 1}/0${totalSlides}`;
    curCircle = document.querySelector(
      `[data-id="${swiperBtm.activeIndex + 1}"]`
    );
  }

  curActive.classList.remove("main");
  curActive.classList.add("inactive");
  //анимация для вращения всех круглых кнопок
  // @ts-ignore
  var tl = new TimelineMax({ repeat: 0 });
  tl.to(".small_circle", 1, {
    rotationZ: `-=${
      60 * (Number(curCircle.dataset.id) - Number(curActive.dataset.id))
    }_shortest`,
    // @ts-ignore
    ease: Power0.easeNone,
  });
  //анимация для сохранения ориентации круглых кнопок
  tl.to(
    ".cir-img",
    1,
    {
      rotation: `+=${
        60 * (Number(curCircle.dataset.id) - Number(curActive.dataset.id))
      }_shortest`,
      // @ts-ignore
      ease: Power0.easeNone,
      transformOrigin: "center center",
      // @ts-ignore
      ease: Power0.easeNone,
    },
    0
  );
  curCircle.classList.remove("inactive");
  curCircle.classList.add("main");

  curPage.textContent = `0${swiperBtm.activeIndex + 1}/0${totalSlides}`;
  //смена года
  switch (swiperBtm.activeIndex) {
    case 0:
      yearFrom.textContent = "1980";
      yearTo.textContent = "1986";
      break;
    case 1:
      yearFrom.textContent = "1987";
      yearTo.textContent = "1991";
      break;
    case 2:
      yearFrom.textContent = "1992";
      yearTo.textContent = "1997";
      break;
    case 3:
      yearFrom.textContent = "1999";
      yearTo.textContent = "2004";
      break;
    case 4:
      yearFrom.textContent = "2005";
      yearTo.textContent = "2010";
      break;
    case 5:
      yearFrom.textContent = "2015";
      yearTo.textContent = "2022";
      break;
  }
});
//навигация по кнопкам колеса
circleBtns.forEach((b: HTMLElement) => {
  b.addEventListener("click", (e) => {
    const yearFrom = document.querySelector("#year-from");
    const yearTo = document.querySelector("#year-to");
    const curPage = document.querySelector("#page-count");
    const image = b.querySelector("cir-img");

    const curActive: HTMLElement = document.querySelector(".main");
    if (e.target === curActive) return;

    curActive.classList.remove("main");
    curActive.classList.add("inactive");
    b.classList.remove("inactive");
    b.classList.add("main");
    //анимация всех кнопок колеса
    // @ts-ignore
    var tl = new TimelineMax({ repeat: 0 });
    tl.to(".small_circle", 1, {
      rotationZ: `-=${
        60 * (Number(b.dataset.id) - Number(curActive.dataset.id))
      }_shortest`,
      // @ts-ignore
      ease: Power0.easeNone,
    });
    //сохранение вертикальной ориентации больших кружочков
    tl.to(
      ".cir-img",
      0.5,
      {
        rotation: `+=${
          60 * (Number(b.dataset.id) - Number(curActive.dataset.id))
        }_cw`,
        // @ts-ignore
        ease: Power0.easeNone,
        transformOrigin: "center center",
        // @ts-ignore
        ease: Power0.easeNone,
      },
      0
    );
    //смена слайдера
    swiperBtm.slideTo(Number(b.dataset.id) - 1, 1, false);
    curPage.textContent = `0${swiperBtm.activeIndex + 1}/0${totalSlides}`;

    switch (swiperBtm.activeIndex) {
      case 0:
        yearFrom.textContent = "1980";
        yearTo.textContent = "1986";
        break;
      case 1:
        yearFrom.textContent = "1987";
        yearTo.textContent = "1991";
        break;
      case 2:
        yearFrom.textContent = "1992";
        yearTo.textContent = "1997";
        break;
      case 3:
        yearFrom.textContent = "1999";
        yearTo.textContent = "2004";
        break;
      case 4:
        yearFrom.textContent = "2005";
        yearTo.textContent = "2010";
        break;
      case 5:
        yearFrom.textContent = "2015";
        yearTo.textContent = "2022";
        break;
    }
  });
});
