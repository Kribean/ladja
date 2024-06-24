gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

window.addEventListener('load', function() {
  gsap.to('#loader', {
      duration: 1,
      opacity: 0,
      onComplete: function() {
          document.getElementById('loader').style.display = 'none';
          document.getElementById('content').style.display = 'block';
      }
  });
});

ScrollTrigger.create({
    trigger: "#hero",
    start: "top top",
    end: "+=100%", // La section reste épinglée jusqu'à la fin de l'animation
    pin: true
  });
  
  gsap.set("#moon", { x: 0, xPercent: 0, y: 0, yPercent: 100,height:"5vh" })
  gsap.to('#moon', {
    scrollTrigger: {
        //markers:true,
        start: 'top 75%',
        end: 'bottom 25%',
      toggleActions: 'restart complete reverse reset',
      trigger: '#hero',
      scrub: true
    },
    y: '-100%',
    height: "100vh"
  });

  gsap.set("#cloud-right", { x: 0, xPercent: '0', y: 0, yPercent: 0,scale:1 })
 /gsap.to('#cloud-right', {
    scrollTrigger: {
      //markers: true,
      start: 'top 75%',
      end: 'bottom 25%',
      toggleActions: 'restart complete reverse reset',
      trigger: '#hero',
      scrub: true
    },
    x: '-50%',
    scale:0.9
  });
  
  gsap.set("#cloud-left", { x: -500, xPercent: '0', y: 0, yPercent: 0, scale:2 })
  gsap.to('#cloud-left', {
    scrollTrigger: {
      //markers: true,
      start: 'top 75%',
      end: 'bottom 25%',
      toggleActions: 'restart complete reverse reset',
      trigger: '#hero',
      scrub: true
    },
    x: 500,
    scale:1
  });
  gsap.set("#man", { x: 0, xPercent: '0', y: 0, yPercent: 0, height:"50vh" })
  gsap.to('#man', {
    scrollTrigger: {
      //markers: true,
      start: 'top 75%',
      end: 'bottom 25%',
      toggleActions: 'restart complete reverse reset',
      trigger: '#hero',
      scrub: true
    },

    height:"70vh"
  });

/*
// Configurer la position initiale de l'élément
gsap.set("#title", { x: 0, xPercent: '0', y: 0, yPercent: 0 });

// Créer l'animation de défilement
gsap.to('#title', {
  scrollTrigger: {
    markers: true,
    start: 'top 75%',
    end: 'bottom 25%',
    toggleActions: 'restart complete reverse reset',
    trigger: '#hero',
    scrub: true
  },
  autoAlpha: 1,
  y: 100,
  ease: "power2.out"
});*/
gsap.fromTo('#title', 
    { autoAlpha: 0, y: 50 }, // Début de l'animation
    { autoAlpha: 1, y: -50,    // Fin de l'animation
      scrollTrigger: {
        trigger: '#hero',
        start: '74% 75%',
        end: 'bottom 25%',
        scrub: true,
        toggleActions: 'restart complete reverse reset'
      },
    }
  );

  let tl = gsap.timeline({
    scrollTrigger: {
        //markers: true,
        start: 'top 75%',
        end: 'bottom 25%',
        toggleActions: 'restart complete reverse reset',
        trigger: '#flute-man',
    }
});

// Ajout des animations à la timeline
tl.set("#flute-man-1", { x: '100%' })
.set("#flute-man-2", { x: '100%' })
.set("#flute-man-3", { x: '100%' })
  .to('#flute-man-1', { x: '0%', duration: 2 })
  .to('#flute-man-2', { x: '0%', duration: 2 })
  .to('#flute-man-3', { x: '0%', duration: 2 });
