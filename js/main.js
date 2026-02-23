document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item, index) => {
    const header = item.querySelector(".faq-header");

    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          const content = otherItem.querySelector(".faq-content");
          content.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove("active");
        const content = item.querySelector(".faq-content");
        content.style.maxHeight = null;
      } else {
        item.classList.add("active");
        const content = item.querySelector(".faq-content");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });

    // Initialize the first item as active
    if (index === 0) {
      item.classList.add("active");
      const content = item.querySelector(".faq-content");
      if (content) content.style.maxHeight = content.scrollHeight + "px";
    }
  });

  // Products Grid Accordion (Mobile)
  const productItems = document.querySelectorAll(".products-grid__item");

  productItems.forEach((item) => {
    item.addEventListener("click", () => {
      const isMobile = window.innerWidth <= 991;
      if (!isMobile) return;

      const isActive = item.classList.contains("active");

      // Close other items
      productItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current
      item.classList.toggle("active");
    });
  });
});
