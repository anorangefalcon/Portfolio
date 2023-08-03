document.addEventListener("DOMContentLoaded", function () {
    const navigation = document.querySelector(".navLinks");
    const sectionToTrigger = document.querySelector("section:nth-child(3)");
  
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, 
    };
  
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navigation.classList.add("hidden-nav");
        } else {
            navigation.classList.remove("hidden-nav");
        }
      });
    };
  
    const observer = new IntersectionObserver(callback, options);
    observer.observe(sectionToTrigger);
});
  

const darkLightToggle = document.querySelector(".dark-light-toggle");

darkLightToggle.addEventListener("click", function () {
    
    const bodyElement = document.body;
    bodyElement.classList.toggle('light-theme');
    
  });