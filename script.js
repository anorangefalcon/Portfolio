const links = document.querySelectorAll(".navLinks a");

async function postToNotion(data) {
  const url = "https://api.priyanshudhall.tech/portfolio/saveContactForm";
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

    updateContactFormCosmetics();
    setSubmitButtonState(true, "Success!");
    submitButton.classList.add("success-background");
    resetForm(event.target);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    submitButton.classList.remove("success-background");
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

function updateContactFormCosmetics() {
  const contactFormTest = document.getElementById("contactForm");
  contactFormTest.classList.add("hide-contact-form");

  const formHeading = document.getElementById("contactFormHeading");

  formHeading.classList.add("hidden-opacity");
  setTimeout(() => {
    formHeading.innerHTML =
      "Thank <span>you!</span><div>I will get back to you soon.</div>";

    formHeading.classList.remove("hidden-opacity");
  }, 500);
}
