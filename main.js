‎document.addEventListener("DOMContentLoaded", () => {
‎
‎gsap.registerPlugin(ScrollTrigger);
‎
‎// Lenis smooth scroll
‎
‎const lenis = new Lenis();
‎
‎lenis.on("scroll", ScrollTrigger.update);
‎
‎gsap.ticker.add((time) => lenis.raf(time * 1000));
‎
‎gsap.ticker.lagSmoothing(0);
‎
‎const animeTextParagraphs = document.querySelectorAll(".anime-text p");
‎
‎const wordHighlightBgColor = "60, 60, 60";
‎
‎const keywords = ["health", "communication", "influence", "revona", "excellence", "values"];
‎
‎animeTextParagraphs.forEach((paragraph) => {
‎
‎const words = paragraph.textContent.split(/\s+/);
‎
‎paragraph.innerHTML = "";
‎
‎
‎
‎words.forEach((word) => {
‎
‎  if (word.trim()) {
‎
‎    const wordContainer = document.createElement("div");
‎
‎    wordContainer.className = "word";
‎
‎
‎
‎    const wordText = document.createElement("span");
‎
‎    wordText.textContent = word;
‎
‎
‎
‎    const normalizedWord = word.toLowerCase().replace(/[.,!?;:"]/g, "");
‎
‎    if (keywords.includes(normalizedWord)) {
‎
‎      wordContainer.classList.add("keyword-wrapper");
‎
‎      wordText.classList.add("keyword", normalizedWord);
‎
‎    }
‎
‎
‎
‎    wordContainer.appendChild(wordText);
‎
‎    paragraph.appendChild(wordContainer);
‎
‎  }
‎
‎});
‎
‎});
‎
‎const animeTextContainers = document.querySelectorAll(".anime-text-container");
‎
‎animeTextContainers.forEach((container) => {
‎
‎ScrollTrigger.create({
‎
‎  trigger: container,
‎
‎  pin: container,
‎
‎  start: "top top",
‎
‎  end: () => `+=${window.innerHeight * 4}`,
‎
‎  pinSpacing: true,
‎
‎  onUpdate: (self) => {
‎
‎    const progress = self.progress;
‎
‎    const words = Array.from(container.querySelectorAll(".anime-text .word"));
‎
‎    const totalWords = words.length;
‎
‎
‎
‎    words.forEach((word, index) => {
‎
‎      const wordText = word.querySelector("span");
‎
‎
‎
‎      if (progress < 0.7) {
‎
‎        const progressTarget = 0.7;
‎
‎        const revealProgress = Math.min(1, progress / progressTarget);
‎
‎
‎
‎        const overlapWords = 15;
‎
‎        const totalAnimationLength = 1 + overlapWords / totalWords;
‎
‎
‎
‎        const wordStart = index / totalWords;
‎
‎        const wordEnd = wordStart + overlapWords / totalWords;
‎
‎
‎
‎        const timelineScale =
‎
‎          1 /
‎
‎          Math.min(
‎
‎            totalAnimationLength,
‎
‎            1 + (totalWords - 1) / totalWords + overlapWords / totalWords
‎
‎          );
‎
‎
‎
‎        const adjustedStart = wordStart * timelineScale;
‎
‎        const adjustedEnd = wordEnd * timelineScale;
‎
‎        const duration = adjustedEnd - adjustedStart;
‎
‎
‎
‎        const wordProgress =
‎
‎          revealProgress < adjustedStart
‎
‎            ? 0
‎
‎            : revealProgress > adjustedEnd
‎
‎            ? 1
‎
‎            : (revealProgress - adjustedStart) / duration;
‎
‎
‎
‎        word.style.opacity = wordProgress;
‎
‎
‎
‎        const backgroundFadeStart = wordProgress > 0.9 ? (wordProgress - 0.9) / 0.1 : 0;
‎
‎        const backgroundOpacity = Math.max(0, 1 - backgroundFadeStart);
‎
‎        word.style.backgroundColor = `rgba(${wordHighlightBgColor}, ${backgroundOpacity})`;
‎
‎
‎
‎        const textRevealThreshold = 0.9;
‎
‎        const textRevealProgress =
‎
‎          wordProgress > textRevealThreshold
‎
‎            ? (wordProgress - textRevealThreshold) / (1 - textRevealThreshold)
‎
‎            : 0;
‎
‎
‎
‎        wordText.style.opacity = Math.pow(textRevealProgress, 0.5);
‎
‎      }
‎
‎    });
‎
‎  },
‎
‎});
‎
‎});
‎
‎ScrollTrigger.refresh();
‎
            

    const slides = [
    { title: "content 1", image: "deser.jpg" },
    { title: "content 2", image: "grass.jpg" },
    { title: "content 3", image: "render.jpg" },
    { title: "content 4", image: "circ.jpg" },
    { title: "content 5", image: "mus.jpg" },
  ];

  const pinDistance = window.innerHeight * slides.length;
  const progressBar = document.querySelector(".slider-progress");
  const sliderImages = document.querySelector(".slider-images");
  const sliderTitle = document.querySelector(".slider-title");
  const sliderIndices = document.querySelector(".slider-indices");

  let activeSlide = 0;
  let currentSplit = null;

  function createIndices() {
    sliderIndices.innerHTML = "";

    slides.forEach((_, ind) => {
      const indexNum = (ind + 1).toString().padStart(2, "0");
      const indicatorElement = document.createElement("p");
      indicatorElement.dataset.ind = ind;
      indicatorElement.innerHTML = `
        <span class="marker"></span>
        <span class="ind">${indexNum}</span>
      `;
      sliderIndices.appendChild(indicatorElement);

      if (ind === 0) {
        gsap.set(indicatorElement.querySelector(".ind"), { opacity: 1 });
        gsap.set(indicatorElement.querySelector(".marker"), { scaleX: 1 });
      } else {
        gsap.set(indicatorElement.querySelector(".ind"), { opacity: 0.35 });
        gsap.set(indicatorElement.querySelector(".marker"), { scaleX: 0 });
      }
    });
  }

  function animateIndicators(ind) {
    const indicators = sliderIndices.querySelectorAll("p");

    indicators.forEach((indicator, i) => {
      const marker = indicator.querySelector(".marker");
      const indexEl = indicator.querySelector(".ind");

      if (i === ind) {
        gsap.to(indexEl, { opacity: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(marker, { scaleX: 1, duration: 0.3, ease: "power2.out" });
      } else {
        gsap.to(indexEl, { opacity: 0.5, duration: 0.3, ease: "power2.out" });
        gsap.to(marker, { scaleX: 0, duration: 0.3, ease: "power2.out" });
      }
    });
  }

  function animateNewTitle(ind) {
    if (currentSplit) currentSplit.revert();

    sliderTitle.innerHTML = `<h1>${slides[ind].title}</h1>`;

    currentSplit = new SplitText(sliderTitle.querySelector("h1"), {
      type: "lines",
      linesClass: "line",
      mask: "lines",
    });

    gsap.set(currentSplit.lines, { yPercent: 100, opacity: 0 });

    gsap.to(currentSplit.lines, {
      yPercent: 0,
      opacity: 1,
      duration: 0.75,
      stagger: 0.1,
      ease: "power3.out",
    });
  }

  function animateNewSlide(ind) {
    const newImage = document.createElement("img");
    newImage.src = slides[ind].image;
    newImage.alt = `Slide ${ind + 1}`;

    gsap.set(newImage, { opacity: 0, scale: 1.1 });
    sliderImages.appendChild(newImage);

    gsap.to(newImage, { opacity: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(newImage, { scale: 1, duration: 1, ease: "power2.out" });

    const allImages = sliderImages.querySelectorAll("img");
    if (allImages.length > 3) {
      const extra = allImages.length - 3;
      for (let i = 0; i < extra; i++) {
        allImages[i].remove();
      }
    }

    animateNewTitle(ind);
    animateIndicators(ind);
  }

  createIndices();


  ScrollTrigger.create({
    trigger: ".slider",
    start: "top top",
    end: `+=${pinDistance}px`,
    scrub: 1,
    pin: true,
    pinSpacing: true,
    onUpdate: (self) => {
      gsap.set(progressBar, { scaleY: self.progress });
      
      const segment = 1 / slides.length;
const currentSlide = Math.min(
  slides.length - 1,
  Math.floor(self.progress / segment)
);


      if (currentSlide !== activeSlide && currentSlide < slides.length) {
        activeSlide = currentSlide;
        animateNewSlide(activeSlide);
      }
    },
  });
});



const animateOnScroll = true;

const config = {
  gravity: { x: 0, y: 1 },
  restitution: 0.5,
  friction: 0.15,
  frictionAir: 0.02,
  density: 0.002,
  wallThickness: 200,
  mouseStiffness: 0.6,
};

let engine, runner, mouseConstraint, bodies = [], topWall = null;

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function initPhysics(container) {
  engine = Matter.Engine.create();
  engine.gravity = config.gravity;
  engine.constraintIterations = 10;
  engine.positionIterations = 20;
  engine.velocityIterations = 16;
  engine.timing.timeScale = 1;

  const containerRect = container.getBoundingClientRect();
  const wallThickness = config.wallThickness;

  const walls = [
    Matter.Bodies.rectangle(
      containerRect.width / 2,
      containerRect.height + wallThickness / 2,
      containerRect.width + wallThickness * 2,
      wallThickness,
      { isStatic: true }
    ),
    Matter.Bodies.rectangle(
      -wallThickness / 2,
      containerRect.height / 2,
      wallThickness,
      containerRect.height + wallThickness * 2,
      { isStatic: true }
    ),
    Matter.Bodies.rectangle(
      containerRect.width + wallThickness / 2,
      containerRect.height / 2,
      wallThickness,
      containerRect.height + wallThickness * 2,
      { isStatic: true }
    ),
  ];

  Matter.World.add(engine.world, walls);

  const objects = container.querySelectorAll(".object");
  objects.forEach((obj, index) => {
    const objRect = obj.getBoundingClientRect();

    const startX =
      Math.random() * (containerRect.width - objRect.width) +
      objRect.width / 2;

    const startY = -500 - index * 200;
    const startRotation = (Math.random() - 0.5) * Math.PI;

    const body = Matter.Bodies.rectangle(
      startX,
      startY,
      objRect.width,
      objRect.height,
      {
        restitution: config.restitution,
        friction: config.friction,
        frictionAir: config.frictionAir,
        density: config.density,
      }
    );

    Matter.Body.setAngle(body, startRotation);

    bodies.push({
      body: body,
      element: obj,
      width: objRect.width,
      height: objRect.height,
    });

    Matter.World.add(engine.world, body);
  });

  // Delay top wall
  setTimeout(() => {
    topWall = Matter.Bodies.rectangle(
      containerRect.width / 2,
      -wallThickness / 2,
      containerRect.width + wallThickness * 2,
      wallThickness,
      { isStatic: true }
    );
    Matter.World.add(engine.world, topWall);
  }, 3000);

  // Mouse control
  const mouse = Matter.Mouse.create(container);
  mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
  mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

  mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: config.mouseStiffness,
      render: { visible: false },
    },
  });

  mouseConstraint.mouse.element.oncontextmenu = () => false;

  let dragging = null;
  let originalInertia = null;

  Matter.Events.on(mouseConstraint, "startdrag", function (event) {
    dragging = event.body;
    if (dragging) {
      originalInertia = dragging.inertia;
      Matter.Body.setInertia(dragging, Infinity);
      Matter.Body.setVelocity(dragging, { x: 0, y: 0 });
      Matter.Body.setAngularVelocity(dragging, 0);
    }
  });

  Matter.Events.on(mouseConstraint, "enddrag", function () {
    if (dragging) {
      Matter.Body.setInertia(dragging, originalInertia || 1);
      dragging = null;
      originalInertia = null;
    }
  });

  Matter.Events.on(engine, "beforeUpdate", function () {
    if (dragging) {
      const found = bodies.find((b) => b.body === dragging);
      if (found) {
        const minX = found.width / 2;
        const maxX = containerRect.width - found.width / 2;
        const minY = found.height / 2;
        const maxY = containerRect.height - found.height / 2;

        Matter.Body.setPosition(dragging, {
          x: clamp(dragging.position.x, minX, maxX),
          y: clamp(dragging.position.y, minY, maxY),
        });

        Matter.Body.setVelocity(dragging, {
          x: clamp(dragging.velocity.x, -20, 20),
          y: clamp(dragging.velocity.y, -20, 20),
        });
      }
    }
  });

  container.addEventListener("mouseleave", () => {
    mouseConstraint.constraint.bodyB = null;
    mouseConstraint.constraint.pointB = null;
  });

  container.addEventListener("mouseup", () => {
    mouseConstraint.constraint.bodyB = null;
    mouseConstraint.constraint.pointB = null;
  });

  Matter.World.add(engine.world, mouseConstraint);

  runner = Matter.Runner.create();
  Matter.Runner.run(runner, engine);

  function updatePositions() {
    bodies.forEach(({ body, element, width, height }) => {
      const x = clamp(
        body.position.x - width / 2,
        0,
        containerRect.width - width
      );
      const y = clamp(
        body.position.y - height / 2,
        -height * 3,
        containerRect.height - height
      );

      element.style.left = x + "px";
      element.style.top = y + "px";
      element.style.transform = `rotate(${body.angle}rad)`; // FIXED
    });

    requestAnimationFrame(updatePositions);
  }
  updatePositions();
}

// Scroll-triggered animation
if (animateOnScroll) {
  document.querySelectorAll("section").forEach((section) => {
    if (section.querySelector(".object-container")) {
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        once: true,
        onEnter: () => {
          const container = section.querySelector(".object-container");
          if (container && !engine) {
            initPhysics(container);
          }
        },
      });
    }
  });
} else {
  window.addEventListener("load", () => {
    const container = document.querySelector(".object-container");
    if (container) {
      initPhysics(container);
    }
  });
}
