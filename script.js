const links = document.querySelectorAll(".navLinks a");

async function postToNotion(data) {
  const url = "https://rayiot-backend.vercel.app/weather/postToNotion";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
}

document
  .getElementById("contactForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const message = event.target.message.value;

    if (!name) {
      return;
    }
    if (!email) {
      return;
    }

    const response = await postToNotion({ name, email, message });
    console.log(response);

    return false;
  });

// document.addEventListener("DOMContentLoaded", function () {
//   const navigation = document.querySelector(".navLinks");
//   const sectionToTrigger = document.querySelector("section:nth-child(3)");

//   const options = {
//     root: null,
//     rootMargin: "0px",
//     threshold: 0.5,
//   };

//   const callback = (entries, observer) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         navigation.classList.add("hidden-nav");
//       } else {
//         navigation.classList.remove("hidden-nav");
//       }
//     });
//   };

//   const observer = new IntersectionObserver(callback, options);
//   observer.observe(sectionToTrigger);
// });

// const darkLightToggle = document.querySelector(".dark-light-toggle");

// darkLightToggle.addEventListener("click", function () {

//   const bodyElement = document.body;
//   bodyElement.classList.toggle('light-theme');

// });

// function checkActiveSection() {
//   document.querySelectorAll("section").forEach((section) => {
//     const rect = section.getBoundingClientRect();

//     console.log();
//     if (rect.top >= 0 && rect.bottom >= window.innerHeight) {
//       const id = section.getAttribute("id");
//       console.log(id, "thiss");
//       // links.forEach((link) => link.classList.remove("active"));

//       // document
//       //   .querySelector(`.navLinks a[href="#${id}"]`)
//       //   .classList.add("active");
//     }
//   });
// }

// window.addEventListener("scroll", function () {
//   const sections = document.querySelectorAll("section");

//   sections.forEach((section) => {
//     const rect = section.getBoundingClientRect();
//     const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

//     if (isVisible) {
//       console.log("Section " + section.id + " is on the screen");
//     }
//   });
// });

// const options = {
//   root: null,
//   rootMargin: "0px",
//   threshold: 0,
// };

// const observer = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       console.log("Section " + entry.target.id + " is on the screen");

//       links.forEach((link) => link.classList.remove("active"));

//       document
//         .querySelector(`.navLinks a[href="#${id}"]`)
//         .classList.add("active");
//     }
//   });
// }, options);

// const sections = document.querySelectorAll("section");
// sections.forEach((section) => {
//   observer.observe(section);
// });

// window.addEventListener("scroll", checkActiveSection);
// window.addEventListener("load", checkActiveSection);
