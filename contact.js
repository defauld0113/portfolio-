// Smooth scroll to #contact if URL has that hash
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash === "#contact") {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Simple form debug hook
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", () => {
      console.log("Contact form submitted.");
    });
  }
});
