// Donna Patricia Hester Portfolio - Interactive Features

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all features
  initThemeToggle();
  initMobileMenu();
  initCarousels();
  initCounters();
  initServiceModals();
  initContactForm();
  initScrollSpy();
  updateCopyrightYear();
  initSmoothScrolling();
});

// Theme Toggle
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Check for saved theme preference or default to light
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    body.classList.add("dark");
    updateThemeIcon(true);
  } else {
    updateThemeIcon(false);
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeIcon(isDark);

    // Debug: Log the current state
    console.log("Theme toggled:", isDark ? "dark" : "light");
    console.log("Body classes:", body.className);
    console.log("Dark class present:", body.classList.contains("dark"));
  });
}

function updateThemeIcon(isDark) {
  const moonIcon = document.getElementById("moon-icon");
  const sunIcon = document.getElementById("sun-icon");

  if (isDark) {
    // Show sun icon (light mode toggle)
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
  } else {
    // Show moon icon (dark mode toggle)
    moonIcon.classList.remove("hidden");
    sunIcon.classList.add("hidden");
  }
}

// Mobile Menu
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Close mobile menu when clicking on a link
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

// Carousel Functionality
function initCarousels() {
  // Hero Carousel
  initCarousel("hero-carousel", 5000);

  // Results Carousel
  initCarousel("results-carousel", 6000);
}

function initCarousel(carouselId, interval) {
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;

  const container = carousel.querySelector(".carousel-container");
  const dots = carousel.querySelectorAll(".carousel-dot");
  let currentSlide = 0;
  let intervalId;

  function showSlide(index) {
    const offset = -((index * 100) / 3);
    container.style.transform = `translateX(${offset}%)`;

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    currentSlide = index;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % 3;
    showSlide(currentSlide);
  }

  // Auto-play
  intervalId = setInterval(nextSlide, interval);

  // Pause on hover
  carousel.addEventListener("mouseenter", () => clearInterval(intervalId));
  carousel.addEventListener("mouseleave", () => {
    intervalId = setInterval(nextSlide, interval);
  });

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(intervalId);
      showSlide(index);
      intervalId = setInterval(nextSlide, interval);
    });
  });

  // Touch/swipe support
  let startX = 0;
  let endX = 0;

  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const threshold = 50;
    if (endX - startX > threshold && currentSlide > 0) {
      showSlide(currentSlide - 1);
    } else if (startX - endX > threshold && currentSlide < 2) {
      showSlide(currentSlide + 1);
    }
  }

  // Initialize first slide
  showSlide(0);
}

// Counter Animation
function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");

  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.counter);
        animateCounter(counter, target);
        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 20);

  element.classList.add("counter-animate");
}

// Service Modals
function initServiceModals() {
  const serviceCards = document.querySelectorAll(".service-card");
  const modal = document.getElementById("service-modal");
  const modalContent = document.getElementById("modal-content");
  const closeModal = document.getElementById("close-modal");

  const serviceDetails = {
    portfolio: {
      title: "Portfolio Strategy",
      description:
        "Comprehensive portfolio construction and optimization for equities, ETFs, and crypto assets.",
      features: [
        "Asset allocation optimization",
        "Risk-adjusted return enhancement",
        "Rebalancing strategies",
        "Tax-efficient positioning",
        "Multi-asset diversification",
      ],
    },
    risk: {
      title: "Risk Management",
      description:
        "Advanced risk assessment and mitigation strategies to protect your investment capital.",
      features: [
        "Portfolio stress testing",
        "VaR and CVaR analysis",
        "Correlation monitoring",
        "Hedging strategies",
        "Risk-adjusted performance metrics",
      ],
    },
    research: {
      title: "Research & Signals",
      description:
        "In-depth market analysis and actionable investment signals based on proprietary research.",
      features: [
        "Technical analysis",
        "Fundamental research",
        "Market sentiment analysis",
        "Entry/exit timing",
        "Risk-reward assessment",
      ],
    },
    execution: {
      title: "Execution Advisory",
      description:
        "Trade execution optimization to minimize slippage and maximize fill quality.",
      features: [
        "Algorithm selection",
        "Timing optimization",
        "Cost analysis",
        "Market impact assessment",
        "Execution quality monitoring",
      ],
    },
    crypto: {
      title: "Crypto Integration",
      description:
        "Strategic digital asset integration with traditional portfolio management.",
      features: [
        "Crypto allocation strategies",
        "Custody solutions",
        "DeFi integration",
        "Staking and yield farming",
        "Regulatory compliance",
      ],
    },
    hnwi: {
      title: "HNWI & Family Office Advisory",
      description:
        "Specialized services for high-net-worth individuals and family offices.",
      features: [
        "Estate planning integration",
        "Tax optimization strategies",
        "Legacy planning",
        "Multi-generational wealth transfer",
        "Philanthropic planning",
      ],
    },
  };

  serviceCards.forEach((card) => {
    card.addEventListener("click", () => {
      const serviceType = card.dataset.service;
      const service = serviceDetails[serviceType];

      if (service) {
        showServiceModal(service);
      }
    });
  });

  function showServiceModal(service) {
    modalContent.innerHTML = `
            <h3 class="text-2xl font-bold text-gray-900 mb-4">${
              service.title
            }</h3>
            <p class="text-gray-600 mb-6">${service.description}</p>
            <h4 class="text-lg font-semibold text-gray-800 mb-3">Key Features:</h4>
            <ul class="space-y-2 mb-6">
                ${service.features
                  .map(
                    (feature) => `<li class="flex items-center text-gray-600">
                    <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    ${feature}
                </li>`
                  )
                  .join("")}
            </ul>
            <button class="btn-primary">Schedule Consultation</button>
        `;

    modal.classList.remove("hidden");
    document.body.classList.add("modal-open");

    // Focus management
    const firstFocusable = modal.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (firstFocusable) firstFocusable.focus();
  }

  function closeServiceModal() {
    modal.classList.add("hidden");
    document.body.classList.remove("modal-open");
  }

  closeModal.addEventListener("click", closeServiceModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeServiceModal();
  });

  // Close on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeServiceModal();
    }
  });
}

// Contact Form
function initContactForm() {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Simulate form submission
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      setTimeout(() => {
        showFormMessage(
          "Message sent successfully! We'll get back to you soon.",
          "success"
        );
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    }
  });

  // Real-time validation
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => clearFieldError(input));
  });
}

function validateForm() {
  const inputs = document.querySelectorAll(
    "#contact-form input, #contact-form textarea"
  );
  let isValid = true;

  inputs.forEach((input) => {
    if (!validateField(input)) {
      isValid = false;
    }
  });

  return isValid;
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;

  // Remove existing error messages
  clearFieldError(field);

  // Required field validation
  if (field.hasAttribute("required") && !value) {
    showFieldError(field, "This field is required");
    isValid = false;
  }

  // Email validation
  if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showFieldError(field, "Please enter a valid email address");
      isValid = false;
    }
  }

  // Update field styling
  field.classList.toggle("error", !isValid);
  field.classList.toggle("success", isValid && value);

  return isValid;
}

function showFieldError(field, message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
  const errorMessage = field.parentNode.querySelector(".error-message");
  if (errorMessage) {
    errorMessage.remove();
  }
  field.classList.remove("error", "success");
}

function showFormMessage(message, type) {
  const existingMessage = document.querySelector(".form-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  const messageDiv = document.createElement("div");
  messageDiv.className = `form-message ${
    type === "success" ? "success-message" : "error-message"
  } text-center p-4 rounded-lg mt-4`;
  messageDiv.textContent = message;

  const form = document.getElementById("contact-form");
  form.appendChild(messageDiv);

  setTimeout(() => {
    messageDiv.remove();
  }, 5000);
}

// Scroll Spy
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observerOptions = {
    threshold: 0.3,
    rootMargin: "-20% 0px -35% 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        updateActiveNavLink(id);
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

function updateActiveNavLink(activeId) {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === `#${activeId}`) {
      link.classList.add("text-blue-600", "font-semibold");
    } else {
      link.classList.remove("text-blue-600", "font-semibold");
    }
  });
}

// Smooth Scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Update Copyright Year
function updateCopyrightYear() {
  const yearElement = document.getElementById("copyright-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Performance optimizations
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Lazy loading for images
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ("IntersectionObserver" in window) {
  initLazyLoading();
}
