document.addEventListener("DOMContentLoaded", () => {
  const portalData = window.portalData;

  if (!portalData) {
    console.error("portalData not found. Make sure data.js loads before app.js.");
    return;
  }

  document.title = portalData.title;

  document.getElementById("portal-title").textContent = portalData.title;
  document.getElementById("portal-tagline").textContent = portalData.tagline;

  document.getElementById("overview-description").textContent =
    portalData.overview.description;

  document.getElementById("overview-entry").textContent =
    portalData.overview.entry;

  document.getElementById("overview-expectations").textContent =
    portalData.overview.expectations;

  document.getElementById("overview-focus").textContent =
    portalData.overview.focus;

  const directoryList = document.getElementById("directory-list");
  directoryList.innerHTML = "";

  portalData.directory.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    `;
    directoryList.appendChild(card);
  });

  const rankList = document.getElementById("rank-list");
  rankList.innerHTML = "";

  portalData.ranks.forEach((rank) => {
    const block = document.createElement("article");
    block.className = "rank-card";
    block.innerHTML = `
      <div class="rank-header">
        <h3>${rank.name}</h3>
        <span>${rank.type}</span>
      </div>
      <p><strong>Requirement:</strong> ${rank.requirement}</p>
      <p>${rank.description}</p>
      <p class="note">${rank.notes}</p>
    `;
    rankList.appendChild(block);
  });

  const resourceList = document.getElementById("resource-list");
  resourceList.innerHTML = "";

  portalData.resources.forEach((resource) => {
    const link = document.createElement("a");
    link.href = resource.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "resource-link";
    link.textContent = resource.name;
    resourceList.appendChild(link);
  });

  const navLinks = document.querySelectorAll(".nav a");
  const sections = document.querySelectorAll("main section");

  function showSection(sectionId) {
    sections.forEach((section) => {
      section.style.display = section.id === sectionId ? "block" : "none";
    });

    navLinks.forEach((link) => {
      const target = link.getAttribute("href").replace("#", "");
      link.classList.toggle("active", target === sectionId);
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

  const validSections = Array.from(sections).map((section) => section.id);
  const requestedSection = window.location.hash.replace("#", "");
  const startingSection = validSections.includes(requestedSection)
    ? requestedSection
    : "overview";

  showSection(startingSection);
});
