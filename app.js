document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav a");
  const sections = document.querySelectorAll("main section");

  function showSection(sectionId) {
    sections.forEach((section) => {
      section.style.display = section.id === sectionId ? "block" : "none";
    });

    navLinks.forEach((link) => {
      const linkTarget = link.getAttribute("href").replace("#", "");
      link.classList.toggle("active", linkTarget === sectionId);
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const sectionId = link.getAttribute("href").replace("#", "");
      showSection(sectionId);

      history.pushState(null, "", `#${sectionId}`);
    });
  });

  const defaultSection = "overview";
  const startingSection = window.location.hash
    ? window.location.hash.replace("#", "")
    : defaultSection;

  showSection(startingSection);
});
