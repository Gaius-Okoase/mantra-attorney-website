

////////////////////////////////
//Fixing the current date at the copy right
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

////////////////////////////////
//Fixing Whatsap Link
function openWhatsAppCommunity() {
  const communityLink = "https://chat.whatsapp.com/ErJ40CUHZMT7mX83r8roeb";
  window.open(communityLink, "_blank");
}

/////////////////////////////////////
//Make Mobile navigation Work
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
const carousel = document.querySelector(".carousel");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
  carousel.classList.toggle("carousel-none");
});

///FOR SMOOTH SCROLL IN ALL BROWSER
const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");

    //Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    //Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({
        behavior: "smooth",
      });
    }

    //close mobile navigation
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

///////////////////////////////
//STICKY NAVIGATION

const sectionHeroEl = document.querySelector(".carousel");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    //In the view point
    root: null, // we will observe the hero section inside the view port
    threshold: 0,
    rootMargin: "-70px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
//CAROUSEL SLIDES
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const dots = document.querySelectorAll(".dot");

let currentIndex = 0;
let direction = 1;

function updateCarousel() {
  // Move the carousel
  track.style.transform = "translateX(-" + currentIndex * 100 + "%)";

  // Update active dot
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });

  // Update active slide (for animation)
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentIndex);
  });
}

// Dot click navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    direction =
      currentIndex === 0
        ? 1
        : currentIndex === slides.length - 1
        ? -1
        : direction;
    updateCarousel();
  });
});

// Auto-slide with bounce-back
setInterval(() => {
  if (currentIndex === slides.length - 1) {
    direction = -1;
  } else if (currentIndex === 0) {
    direction = 1;
  }

  currentIndex += direction;
  updateCarousel();
}, 5000);

///////////////////////////////////////////////////////////
// CTA contact us

document.addEventListener("DOMContentLoaded", function () {
  const ctaForm = document.querySelector(".cta-form");
  const ctaMessageBox = document.getElementById("cta-form-message");

  function showCtaMessage(msg, isError = false) {
    ctaMessageBox.textContent = msg;
    ctaMessageBox.classList.toggle("error", isError);
  }

  ctaForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const ctaName = document.getElementById("full-name").value.trim();
    const ctaEmail = document.getElementById("email").value.trim();
    const ctaService = document.getElementById("departments").value;

    // Clear previous messages
    showCtaMessage("");

    if (!ctaName || !ctaEmail || !ctaService) {
      showCtaMessage("Please fill all required fields.", true);
      return;
    }

    const ctaFormData = new FormData();
    ctaFormData.append("name", ctaName);
    ctaFormData.append("email", ctaEmail);
    ctaFormData.append("legalServiceNeeded", ctaService);

    try {
      const ctaResponse = await fetch(
        "https://2d8f-102-89-42-73.ngrok-free.app/api/v1/booking",
        {
          method: "POST",
          body: ctaFormData,
        }
      );

      if (ctaResponse.ok) {
        showCtaMessage("Your request has been submitted successfully!");
        ctaForm.reset();
      } else {
        const data = await ctaResponse.json();
        showCtaMessage(data.message || "Failed to submit form.", true);
      }
    } catch (error) {
      console.error("CTA Form Error:", error);
      showCtaMessage("Network error. Please try again later.", true);
    }
  });
});

///////////////////////////////////////////////////////////
// THE LAW FIRM ARTICLEs
const articles = {
  nigeria: [
    {
      title: "Land Use Act and Urban Development",
      url: "https://en.wikipedia.org/wiki/Rural_development_in_Nigeria",
      caption:
        "The Land Use Act governs land ownership in Nigeria. It grants state governors control over land and impacts urban planning, land use regulation, and property development rights across the country.",
      datePublished: "2025-03-17",
      },
    {
      title: "Corporate Law in Nigeria",
      url: "https://en.wikipedia.org/wiki/Companies_and_Allied_Matters_Act,_2020",
      caption:
        "Corporate law in Nigeria is regulated by CAMA (Companies and Allied Matters Act). It outlines how businesses are formed, run, and dissolved, including shareholder rights and board duties.",
      datePublished: "2025-05-30",
      },
    {
      title: "Marriage and Family Law",
      url: "https://en.wikipedia.org/wiki/Polygamy_in_Nigeria",
      caption:
        "Family law governs relationships, marriage, divorce, custody, and inheritance. Nigeria operates a dual legal system that combines customary, statutory, and religious laws depending on region and practice.",
      datePublished: "2024-04-02",
      },
    {
      title: "Intellectual Property Rights",
      url: "https://en.wikipedia.org/wiki/African_Regional_Intellectual_Property_Organization",
      caption:
        "IP laws protect the rights of creators over their inventions and works. Nigerian IP rights include trademarks, patents, designs, and copyright under various national and international frameworks.",
      datePublished: "2025-02-12",
      },
    {
      title: "Employment Law and Workers’ Rights",
      url: "https://en.wikipedia.org/wiki/Nigerian_labour_law",
      caption:
        "Employment regulations protect workers’ rights, establish minimum wage, and define labor contracts, termination conditions, and workplace safety as mandated by Nigeria’s Labour Act.",
      datePublished: "2024-04-02",
      },
    {
      title: "Environmental Regulation",
      url: "https://en.wikipedia.org/wiki/Federal_Ministry_of_Environment_(Nigeria)",
      caption:
        "The National Environmental Standards enforce pollution control and environmental protection. Legal requirements affect oil & gas firms, manufacturing industries, and construction projects.",
      datePublished: "2023-04-22",
      },
    {
      title: "Constitutional Law Basics",
      url: "https://en.wikipedia.org/wiki/Constitution_of_Nigeria",
      caption:
        "The Nigerian Constitution is the supreme law guiding democracy, the separation of powers, fundamental rights, and rule of law. It is essential in resolving conflicts between individuals and the state.",
      datePublished: "2023-11-23",
      },
    {
      title: "Dispute Resolution Mechanisms",
      url: "https://en.wikipedia.org/wiki/Dispute_resolution",
      caption:
        "Nigeria recognizes litigation, arbitration, and mediation. ADR is increasingly favored in commercial and civil matters due to its flexibility, cost-effectiveness, and confidentiality.",
      datePublished: "2021-04-09",
      },
  ],

  international: [
    {
      title: "GDPR Compliance for Global Firms",
      url: "https://en.wikipedia.org/wiki/General_Data_Protection_Regulation",
      caption:
        "The General Data Protection Regulation (GDPR) imposes strict data privacy rules for businesses in the EU and globally. It mandates user consent, data breach reporting, and rights to data erasure.",
      datePublished: "2023-12-09",
      },
    {
      title: "International Arbitration Trends",
      url: "https://en.wikipedia.org/wiki/International_arbitration",
      caption:
        "Arbitration remains a preferred method for resolving international commercial disputes. Trends include virtual hearings, institutional rules updates, and transparency in awards.",
      datePublished: "2024-04-02",
      },
    {
      title: "Global Tax Law Update",
      url: "https://en.wikipedia.org/wiki/International_taxation",
      caption:
        "Countries are aligning tax systems to curb evasion. The OECD’s BEPS framework and global minimum tax reforms are reshaping multinational taxation and compliance requirements.",
      datePublished: "2024-04-02",
      },
    {
      title: "Cross-border Mergers",
      url: "https://en.wikipedia.org/wiki/Mergers_and_acquisitions",
      caption:
        "Mergers across jurisdictions face legal hurdles involving antitrust laws, due diligence, and cultural differences. Legal teams must navigate regulatory filings and labor laws.",
      datePublished: "2025-02-02",
      },
    {
      title: "Human Rights and International Law",
      url: "https://en.wikipedia.org/wiki/International_human_rights_law",
      caption:
        "International law protects basic human rights through treaties like the ICCPR, ECHR, and African Charter. States are expected to uphold civil, political, and economic rights globally.",
      datePublished: "2024-04-02",
      },
    {
      title: "Immigration and Mobility Laws",
      url: "https://en.wikipedia.org/wiki/Immigration_law",
      caption:
        "Global firms face evolving immigration laws. Visa regulations, work permits, and expatriate rights are governed by bilateral agreements and national immigration acts.",
      datePublished: "2025-01-02",
      },
    {
      title: "Cybersecurity Laws Worldwide",
      url: "https://en.wikipedia.org/wiki/Cyber-security_regulation",
      caption:
        "Governments are enacting cyber laws to protect data and prevent hacking. Cybercrime legislation includes penalties for unauthorized access, data theft, and identity fraud.",
        datePublished: "2025-06-04",
    },
    {
      title: "Trade Sanctions and Compliance",
      url: "https://en.wikipedia.org/wiki/International_sanctions",
      caption:
        "Sanctions impact international trade and finance. Legal teams must ensure compliance with U.S. OFAC, U.K. OFSI, and EU regulations to avoid penalties and reputation damage.",
      datePublished: "2025-04-06",
      },
  ],
};
function createCards(containerId, data) {
  const container = document.querySelector(`#${containerId} .article-container`);
  data.forEach((article) => {
    const link = document.createElement("a");
    link.href = article.url;
    link.className = "article-card";
    link.target = "_blank"; // Opens in a new tab
    link.rel = "noopener noreferrer"; // Security best practice

    const formattedDate = article.datePublished
      ? new Date(article.datePublished).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : null;

    link.innerHTML = `
      <div class="card-content">
        <h3>${article.title}</h3>
        <p>${article.caption}</p>
      </div>
      ${
        formattedDate
          ? `<div class="published-date"><em>${formattedDate}</em></div>`
          : ""
      }
    `;
    container.appendChild(link);
  });
}




function setupNavigation(carouselId) {
  const carousel = document.getElementById(carouselId);
  const container = carousel.querySelector(".article-container");
  carousel.querySelector(".prev").onclick = () => {
    container.scrollBy({ left: -320, behavior: "smooth" });
  };
  carousel.querySelector(".next").onclick = () => {
    container.scrollBy({ left: 320, behavior: "smooth" });
  };
}

createCards("nigeria-carousel", articles.nigeria);
createCards("international-carousel", articles.international);
setupNavigation("nigeria-carousel");
setupNavigation("international-carousel");
