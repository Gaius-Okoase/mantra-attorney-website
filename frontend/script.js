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
    rootMargin: "-80px",
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
}, 3000);

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
      url: "#",
      caption:
        "The Land Use Act governs land ownership in Nigeria. It grants state governors control over land and impacts urban planning, land use regulation, and property development rights across the country.",
    },
    {
      title: "Corporate Law in Nigeria",
      url: "#",
      caption:
        "Corporate law in Nigeria is regulated by CAMA (Companies and Allied Matters Act). It outlines how businesses are formed, run, and dissolved, including shareholder rights and board duties.",
    },
    {
      title: "Marriage and Family Law",
      url: "#",
      caption:
        "Family law governs relationships, marriage, divorce, custody, and inheritance. Nigeria operates a dual legal system that combines customary, statutory, and religious laws depending on region and practice.",
    },
    {
      title: "Intellectual Property Rights",
      url: "#",
      caption:
        "IP laws protect the rights of creators over their inventions and works. Nigerian IP rights include trademarks, patents, designs, and copyright under various national and international frameworks.",
    },
    {
      title: "Employment Law and Workers’ Rights",
      url: "#",
      caption:
        "Employment regulations protect workers’ rights, establish minimum wage, and define labor contracts, termination conditions, and workplace safety as mandated by Nigeria’s Labour Act.",
    },
    {
      title: "Environmental Regulation",
      url: "#",
      caption:
        "The National Environmental Standards enforce pollution control and environmental protection. Legal requirements affect oil & gas firms, manufacturing industries, and construction projects.",
    },
    {
      title: "Constitutional Law Basics",
      url: "#",
      caption:
        "The Nigerian Constitution is the supreme law guiding democracy, the separation of powers, fundamental rights, and rule of law. It is essential in resolving conflicts between individuals and the state.",
    },
    {
      title: "Dispute Resolution Mechanisms",
      url: "#",
      caption:
        "Nigeria recognizes litigation, arbitration, and mediation. ADR is increasingly favored in commercial and civil matters due to its flexibility, cost-effectiveness, and confidentiality.",
    },
  ],

  international: [
    {
      title: "GDPR Compliance for Global Firms",
      url: "#",
      caption:
        "The General Data Protection Regulation (GDPR) imposes strict data privacy rules for businesses in the EU and globally. It mandates user consent, data breach reporting, and rights to data erasure.",
    },
    {
      title: "International Arbitration Trends",
      url: "#",
      caption:
        "Arbitration remains a preferred method for resolving international commercial disputes. Trends include virtual hearings, institutional rules updates, and transparency in awards.",
    },
    {
      title: "Global Tax Law Update",
      url: "#",
      caption:
        "Countries are aligning tax systems to curb evasion. The OECD’s BEPS framework and global minimum tax reforms are reshaping multinational taxation and compliance requirements.",
    },
    {
      title: "Cross-border Mergers",
      url: "#",
      caption:
        "Mergers across jurisdictions face legal hurdles involving antitrust laws, due diligence, and cultural differences. Legal teams must navigate regulatory filings and labor laws.",
    },
    {
      title: "Human Rights and International Law",
      url: "#",
      caption:
        "International law protects basic human rights through treaties like the ICCPR, ECHR, and African Charter. States are expected to uphold civil, political, and economic rights globally.",
    },
    {
      title: "Immigration and Mobility Laws",
      url: "#",
      caption:
        "Global firms face evolving immigration laws. Visa regulations, work permits, and expatriate rights are governed by bilateral agreements and national immigration acts.",
    },
    {
      title: "Cybersecurity Laws Worldwide",
      url: "#",
      caption:
        "Governments are enacting cyber laws to protect data and prevent hacking. Cybercrime legislation includes penalties for unauthorized access, data theft, and identity fraud.",
    },
    {
      title: "Trade Sanctions and Compliance",
      url: "#",
      caption:
        "Sanctions impact international trade and finance. Legal teams must ensure compliance with U.S. OFAC, U.K. OFSI, and EU regulations to avoid penalties and reputation damage.",
    },
  ],
};

function createCards(containerId, data) {
  const container = document.querySelector(
    `#${containerId} .article-container`
  );
  data.forEach((article) => {
    const link = document.createElement("a");
    link.href = article.url;
    link.className = "article-card";
    link.innerHTML = `
          <h3>${article.title}</h3>
          <p>${article.caption}</p>
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
