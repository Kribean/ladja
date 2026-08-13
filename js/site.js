document.addEventListener('DOMContentLoaded', function () {
  /* ====== Menu mobile ====== */
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('mobile-menu');

  if (toggle && menu) {
    var isOpen = false;
    var links = menu.querySelectorAll('a');
    var hasGsap = typeof gsap !== 'undefined';

    if (hasGsap) {
      gsap.set(menu, { display: 'none', autoAlpha: 0 });
      gsap.set(links, { y: 14, autoAlpha: 0 });
    }

    var openMenu = function () {
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-open');
      if (hasGsap) {
        gsap.set(menu, { display: 'flex' });
        gsap.to(menu, { autoAlpha: 1, duration: 0.25, ease: 'power1.out' });
        gsap.to(links, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.06, delay: 0.05, ease: 'power2.out' });
      } else {
        menu.style.display = 'flex';
      }
    };

    var closeMenu = function () {
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
      if (hasGsap) {
        gsap.to(menu, {
          autoAlpha: 0,
          duration: 0.2,
          ease: 'power1.in',
          onComplete: function () {
            gsap.set(menu, { display: 'none' });
          },
        });
        gsap.set(links, { y: 14, autoAlpha: 0 });
      } else {
        menu.style.display = 'none';
      }
    };

    toggle.addEventListener('click', function () {
      isOpen = !isOpen;
      if (isOpen) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    links.forEach(function (a) {
      a.addEventListener('click', function () {
        if (isOpen) {
          isOpen = false;
          closeMenu();
        }
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024 && isOpen) {
        isOpen = false;
        closeMenu();
      }
    });
  }

  /* ====== Étoiles scintillantes ====== */
  document.querySelectorAll('.stars-layer').forEach(function (layer) {
    var count = parseInt(layer.dataset.starCount, 10) || 60;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      var star = document.createElement('span');
      star.className = 'star';
      var size = (Math.random() * 2 + 1).toFixed(1);
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.top = (Math.random() * 100).toFixed(2) + '%';
      star.style.left = (Math.random() * 100).toFixed(2) + '%';
      star.style.animationDuration = (2.5 + Math.random() * 3).toFixed(2) + 's';
      star.style.animationDelay = (Math.random() * 4).toFixed(2) + 's';
      frag.appendChild(star);
    }
    layer.appendChild(frag);
  });

  /* ====== Scroll reveal (fade + slide-up, avec stagger optionnel) ====== */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var delay = entry.target.dataset.revealDelay || 0;
              entry.target.style.transitionDelay = delay + 's';
              entry.target.classList.add('reveal-visible');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );
      revealEls.forEach(function (el) {
        io.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add('reveal-visible');
      });
    }
  }

  /* ====== Barre CTA flottante ====== */
  var stickyCta = document.getElementById('sticky-cta');
  if (stickyCta) {
    var showAfter = window.innerHeight * 0.6;
    var lastState = false;
    var onScroll = function () {
      var shouldShow = window.scrollY > showAfter;
      if (shouldShow !== lastState) {
        stickyCta.classList.toggle('visible', shouldShow);
        lastState = shouldShow;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
});
