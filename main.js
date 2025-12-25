// ======================================================
// MOBILE NAVIGATION TOGGLE
// ======================================================

// Grab the mobile menu toggle button and the nav links container
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

// Only attach listeners if both elements exist
if (navToggle && navLinks) {
  // Open/close mobile menu on hamburger click
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    // Swap icon between "bars" (menu) and "times" (close)
    navToggle.innerHTML = navLinks.classList.contains("open")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Close mobile menu when a nav link is clicked
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });
}

// ======================================================
// SECTION FADE-IN ON SCROLL (SCROLL REVEAL)
// ======================================================

// Observer callback: when section enters viewport, add "in-view" class
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        // Stop observing once revealed
        sectionObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15, // trigger when ~15% of section is visible
  }
);

// Attach observer to all main sections
document.querySelectorAll("main section").forEach((section) => {
  sectionObserver.observe(section);
});

// ======================================================
// HERO CARD INTERACTIVE EFFECTS (3D tilt + glow)
// ======================================================

// Main hero card and photo inside it
const heroCard = document.querySelector(".hero-card");
const heroPhoto = document.querySelector(".hero-photo-wrapper img");

if (heroCard) {
  // Initial pop-in state
  heroCard.style.transform = "translateY(18px) scale(0.96)";
  heroCard.style.opacity = "0";

  // Animate into place after a short delay
  requestAnimationFrame(() => {
    setTimeout(() => {
      heroCard.style.transform = "translateY(0) scale(1)";
      heroCard.style.opacity = "1";
      heroCard.classList.add("hero-card-floating");
    }, 200);
  });

  // 3D tilt based on mouse position over card
  heroCard.addEventListener("mousemove", (e) => {
    const rect = heroCard.getBoundingClientRect();
    const x = e.clientX - rect.left; // mouse X within card
    const y = e.clientY - rect.top;  // mouse Y within card

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Tilt angles (smaller values = less aggressive)
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    heroCard.style.transform =
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  // Reset tilt when mouse leaves
  heroCard.addEventListener("mouseleave", () => {
    heroCard.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  });

  // Extra hover feedback: stronger shadow + glowing photo
  heroCard.addEventListener("mouseenter", () => {
    heroCard.classList.add("hero-card-floating");
    if (heroPhoto) {
      heroPhoto.classList.add("hero-photo-glow");
      heroPhoto.style.transform = "scale(1.03)";
    }
  });

  heroCard.addEventListener("mouseleave", () => {
    heroCard.classList.remove("hero-card-floating");
    if (heroPhoto) {
      heroPhoto.classList.remove("hero-photo-glow");
      heroPhoto.style.transform = "scale(1)";
    }
  });
}
// ======================================================
// HERO ROLE TEXT TYPEWRITER (letter-by-letter)
// ======================================================

// Span containing the changing role text
const roleText = document.querySelector(".role-text");

// List of roles to cycle through
const roles = [
  "Back‑end Developer",
  "Front‑end Developer",
  "Full‑stack Developer",
];

let roleIndex = 0;     // which role in the array
let charIndex = 0;     // which character in the current role
let isDeleting = false; // typing or deleting state
const typingSpeed = 90;  // ms per character when typing
const deletingSpeed = 55; // ms per character when deleting
const holdTime = 1100;    // pause when a word is fully typed

function typeRole() {
  if (!roleText) return;

  const current = roles[roleIndex];

  if (!isDeleting) {
    // Typing forward letter by letter
    charIndex++;
    roleText.textContent = current.slice(0, charIndex);

    if (charIndex === current.length) {
      // Full word typed: hold, then start deleting
      setTimeout(() => {
        isDeleting = true;
        typeRole();
      }, holdTime);
      return;
    }
  } else {
    // Deleting backward letter by letter
    charIndex--;
    roleText.textContent = current.slice(0, charIndex);

    if (charIndex === 0) {
      // Word fully deleted: move to next role
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  // Schedule next step
  const delay = isDeleting ? deletingSpeed : typingSpeed;
  setTimeout(typeRole, delay);
}

// Start the effect if span exists
if (roleText) {
  typeRole();
}


// ======================================================
// NIGHT / LIGHT THEME TOGGLE
// ======================================================

// Theme toggle button in navbar (icon + label)
const themeToggleBtn = document.getElementById("themeToggle");

/**
 * Apply a theme ("light" or "dark") by:
 * - setting data-theme on <html>
 * - updating the toggle button icon + label
 */


// ----------------------
// INITIAL THEME ON LOAD
// ----------------------

// Read saved theme from localStorage, or default to "dark"
let storedTheme = localStorage.getItem("theme");
if (!storedTheme) {
  storedTheme = "dark";
}

// Apply stored/default theme immediately
applyTheme(storedTheme);

// ----------------------
// TOGGLE THEME ON CLICK
// ----------------------
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";

    applyTheme(next);
    localStorage.setItem("theme", next);
  });
}

// ======================================================
// PROFILE PHOTO ENLARGE (lightbox)
// ======================================================

const profilePhoto = document.getElementById("profilePhoto");
const photoLightbox = document.getElementById("photoLightbox");

if (profilePhoto && photoLightbox) {
  // Open lightbox when profile photo is clicked
  profilePhoto.addEventListener("click", () => {
    photoLightbox.classList.add("open");
  });

  // Close when overlay is clicked
  photoLightbox.addEventListener("click", () => {
    photoLightbox.classList.remove("open");
  });

  // Optional: close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      photoLightbox.classList.remove("open");
    }
  });
}


