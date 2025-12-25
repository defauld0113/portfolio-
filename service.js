// ========== CATEGORY FILTER FOR SERVICE CARDS ==========
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".category-tabs .tab");
  const cards = document.querySelectorAll(".services-grid .service-card");

  if (!tabs.length || !cards.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const selectedCategory = tab.getAttribute("data-category");

      // Update active tab
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // Show/hide cards based on category
      cards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (selectedCategory === "all" || selectedCategory === cardCategory) {
          card.style.display = "block";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});
