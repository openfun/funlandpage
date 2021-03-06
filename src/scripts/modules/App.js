import Bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import Shuffle from "shufflejs";
import AOS from "aos";
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";

Swiper.use([Navigation, Pagination, Autoplay]);

function App() {
  "use strict";

  /**
   * Easy isotope news
   */
  let shufCont = document.getElementById("isonumb");
  if (shufCont) {
    const shuffleInstance = new Shuffle(shufCont, {
      itemSelector: ".itemNumb",
      sizer: ".grid-sizer",
      buffer: 1,
      isCentered: true,
    });
  }

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach((e) => e.addEventListener(type, listener));
    } else {
      select(el, all).addEventListener(type, listener);
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    if (!header.classList.contains("header-scrolled")) {
      offset -= 10;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  //on('click', '.navbar .dropdown > a', function(e) {
  //    if (select('#navbar').classList.contains('navbar-mobile')) {
  //        e.preventDefault()
  //        this.nextElementSibling.classList.toggle('dropdown-active')
  //    }
  //}, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * choose tools app
   */
  let portfolioapp = select(".gototools", true);
  on(
    "click",
    ".gototools",
    function (e) {
      e.preventDefault();
      let item = this.dataset.indexNumber;
      portfolioapp.forEach(function (el) {
        el.classList.remove("filter-active");
      });
      this.classList.add("filter-active");
      swipertools.slideTo(item);
    },
    true
  );
  /**
   * Scroll with offset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });
  /**
   * Tools slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    perPage: 1,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    breakpoints: {
      1200: {
        slidesPerView: "auto",
        spaceBetween: 40,
      },
    },
    pagination: {
      el: ".swiper-pagination-test",
      clickable: true,
      type: "custom",
      renderCustom: function (swiper, current, total) {
        var out = "";
        for (let i = 1; i < total + 1; i++) {
          if (i == current) {
            out =
              out +
              '<span class="swiper-pagination-bullet swiper-pagination-bullet-active" tabindex=' +
              i +
              ' role="button" aria-label="Go to slide ' +
              i +
              1 +
              '"></span>';
          } else {
            out =
              out +
              '<span class="swiper-pagination-bullet" tabindex=' +
              i +
              ' role="button" aria-label="Go to slide ' +
              i +
              1 +
              '"></span>';
          }
        }
        return out;
      },
    },
  });

  var swipertools = new Swiper(".toolsSwiper", {
    direction: "horizontal",
    noSwipingClass: "noswipe",
  });
  swipertools.on("slideChange", (swiper) => {
    // Update active classes on items in the portfolio list when the user slides through them,
    // just like it does when the user directly clicks on portfolio items
    portfolioapp.forEach((el) => el.classList.remove("filter-active"));
    portfolioapp[swiper.activeIndex].classList.add("filter-active");
  });

  /**
   * Clients Slider
   */
  new Swiper(".usertest-slider", {
    speed: 600,
    loop: true,
    perPage: 1,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    breakpoints: {
      900: {
        slidesPerView: 2,
        perPage: 1,
        centeredSlides: false,
      },
      1200: {
        slidesPerView: 3,
        perPage: 1,
        slidesPerView: "auto",
        spaceBetween: 40,
        centeredSlides: true,
      },
    },
    pagination: {
      el: ".swiper-pagination-test",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          aos_init();
        },
        true
      );
    }
  });

  /**
   * Animation on scroll
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", () => {
    aos_init();
  });
}

export default App;
