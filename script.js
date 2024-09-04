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

const contactForm = document.getElementById("contactForm");
const submitButton = document.getElementById("submitContactFormBtn");
const nameField = document.getElementById("nameField");
const emailField = document.getElementById("emailField");
const nameFieldError = document.getElementById("nameFieldError");
const emailFieldError = document.getElementById("emailFieldError");

contactForm.addEventListener("submit", handleSubmit);
nameField.addEventListener("input", () => hideError(nameFieldError));
emailField.addEventListener("input", () => hideError(emailFieldError));

async function handleSubmit(event) {
  event.preventDefault();

  const { name, email, message } = event.target.elements;

  if (!validateForm(name.value, email.value)) return;

  setSubmitButtonState(true, "Submitting...");

  try {
    await postToNotion({
      name: name.value,
      email: email.value,
      message: message.value,
    });

    setSubmitButtonState(true, "Success!");
    submitButton.classList.add("success-background");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    submitButton.classList.remove("success-background");

    resetForm(event.target);
  } catch (error) {
    setSubmitButtonState(true, "Failed");
    submitButton.classList.add("failed-background");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    submitButton.classList.remove("failed-background");

    console.error("Error submitting form:", error);
  } finally {
    setSubmitButtonState(false, "Submit");
  }
}

function validateForm(name, email) {
  let isValid = true;

  if (!name) {
    showError(nameFieldError);
    isValid = false;
  }
  if (!email) {
    showError(emailFieldError);
    isValid = false;
  }

  return isValid;
}

function showError(element) {
  element.style.opacity = 1;
}

function hideError(element) {
  element.style.opacity = 0;
}

function setSubmitButtonState(isDisabled, text) {
  submitButton.disabled = isDisabled;
  submitButton.textContent = text;
}

function resetForm(form) {
  form.reset();
}

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
