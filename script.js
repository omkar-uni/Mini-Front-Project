function inti() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
inti();

function customCursor() {
  var crsr = document.querySelector(".cursor");
  var main = document.querySelector(".main");
  var video = document.querySelector(".video-part video");
  main.addEventListener("mousemove", function (dets) {
    // console.log(dets.x)
    // console.log(dets.y)
    crsr.style.left = dets.x+10 + "px";
    crsr.style.top = dets.y+10 + "px";
  });
  video.addEventListener("mouseenter", function (dets) {
    // console.log(dets.x)
    // console.log(dets.y)
    crsr.style.left = dets.x + "px";
    crsr.style.top = dets.y + "px";
    crsr.style.width = "55px";
    crsr.style.height = "20px";
    crsr.style.borderRadius = "20px";
    crsr.innerHTML = "Omkar";
    crsr.style.color = "black";
    crsr.style.padding = "0px 5px";
  });
  video.addEventListener("mouseleave", function (dets) {
    // console.log(dets.x)
    // console.log(dets.y)
    crsr.style.left = dets.x + "px";
    crsr.style.top = dets.y + "px";
    crsr.style.width = "13px";
    crsr.style.height = "13px";
    crsr.style.borderRadius = "50%";
    crsr.innerHTML = "";
    crsr.style.color = "#dabfff";
    crsr.style.padding = "0";
  });
}
customCursor();

var tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 .mid h1",
    scroller: ".main",
    // markers:true,
    start: "top 27%",
    end: "top 0",
    scrub: 2,
  },
});

tl.to(
  ".page1 .mid h1",
  {
    x: -100,
    // duration:1,
  },
  "anime"
);
tl.to(
  ".page1 .mid h2",
  {
    x: 100,
    // duration:1,
  },
  "anime"
);
tl.to(
  ".page1 .video-part video",
  {
    width: "90%",
  },
  "anime"
);
var tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 .mid h1",
    scroller: ".main",
    // markers:true,
    start: "top -96%",
    end: "top -90%",
    scrub: 2,
  },
});
tl2.to(
  ".main",
  {
    backgroundColor: "#fff",
  },
  "anime"
);

var tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 .mid h1",
    scroller: ".main",
    // markers:true,
    start: "top -510%",
    end: "top -520%",
    scrub: 2,
  },
});
tl3.to(".main", {
  backgroundColor: "#000",
});

var cont = document.querySelectorAll(".content");
var crsr = document.querySelector(".cursor");
cont.forEach(function (ele) {
  ele.addEventListener("mouseenter", function () {
    var att = ele.getAttribute("data-image");
    crsr.style.width = "300px";
    crsr.style.height = "300px";
    crsr.style.borderRadius = "0";
    crsr.style.backgroundImage = `url(${att})`;
  });
  ele.addEventListener("mouseleave", function () {
    crsr.style.width = "13px";
    crsr.style.height = "13px";
    crsr.style.borderRadius = "50%";
    crsr.style.backgroundImage = `none`;
  });
});
