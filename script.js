// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const mobileMenu = document.querySelector(".mobile-menu")
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

mobileMenuBtn.addEventListener("click", () => {
  mobileMenuBtn.classList.toggle("active")
  mobileMenu.classList.toggle("active")
  document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "auto"
})

// Close mobile menu when clicking on a link
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuBtn.classList.remove("active")
    mobileMenu.classList.remove("active")
    document.body.style.overflow = "auto"
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)"
    header.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.15)"
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  }
})

// Lazy loading for images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '1';
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
    imageObserver.observe(img);
});

// Instagram Carousel
const instagramCarousel = document.getElementById('instagramCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (instagramCarousel && prevBtn && nextBtn) {
    const scrollAmount = 320; // Width of one item plus gap

    prevBtn.addEventListener('click', () => {
        instagramCarousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        instagramCarousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Auto-scroll carousel
    let autoScrollInterval = setInterval(() => {
        if (instagramCarousel.scrollLeft >= instagramCarousel.scrollWidth - instagramCarousel.clientWidth) {
            instagramCarousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            instagramCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }, 4000);

    // Pause auto-scroll on hover
    instagramCarousel.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });

    instagramCarousel.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(() => {
            if (instagramCarousel.scrollLeft >= instagramCarousel.scrollWidth - instagramCarousel.clientWidth) {
                instagramCarousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                instagramCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }, 4000);
    });
}

// Video Modal Functionality
const instagramItems = document.querySelectorAll('.instagram-item');
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeModal = document.getElementById('closeModal');

instagramItems.forEach(item => {
    item.addEventListener('click', () => {
        const videoSrc = item.getAttribute('data-video');
        if (videoSrc) {
            modalVideo.src = videoSrc;; // Placeholder for video
            modalVideo.play();
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // In a real implementation, you would set the actual video source:
            // modalVideo.src = videoSrc;
            // modalVideo.play();
        }
    });
});

if (closeModal) {
    closeModal.addEventListener('click', () => {
        videoModal.classList.remove('active');
        modalVideo.pause();
        modalVideo.src = '';
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
if (videoModal) {
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            modalVideo.pause();
            modalVideo.src = '';
            document.body.style.overflow = 'auto';
        }
    });
}


// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".service-card, .contact-card, .story-card").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})


// Service buttons functionality
// document.querySelectorAll(".service-btn").forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     const serviceName = e.target.closest(".service-card").querySelector("h3").textContent
//     alert(`More information about ${serviceName} would be displayed here.`)
//   })
// })

// Form validation (if contact form exists)
const contactForm = document.querySelector("#contact-form")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
    alert("Thank you for your message! We will get back to you soon.")
  })
}

// Loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Add loading styles
const loadingStyles = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'Loading...';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
        font-family: 'Poppins', sans-serif;
        font-size: 1.2rem;
        color: #8B4513;
    }
`

// Inject loading styles
const styleSheet = document.createElement("style")
styleSheet.textContent = loadingStyles
document.head.appendChild(styleSheet)
