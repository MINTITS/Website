/**
* Template Name: Dewi
* Template URL: https://bootstrapmade.com/dewi-free-multi-purpose-html-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  /**
   * Handle scroll to top visibility
   */
  let lastScrollTop = 0;

  function handleScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show button only when scrolling down and past 100px
    if (currentScroll > 100) {
      if (currentScroll > lastScrollTop) {
        scrollTop.classList.add('active');
      }
    } else {
      scrollTop.classList.remove('active');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
  }

  // Throttle scroll event for better performance
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  // Add scroll event listener with throttling
  document.addEventListener('scroll', throttle(handleScroll, 100));

  // Scroll to top function
  scrollTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Chat Widget Functions
   */
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize chat widget
    const chatWidget = document.getElementById('chatWidget');
    const chatBox = document.getElementById('chatBox');
    const chatInput = document.getElementById('chatInput');
    const messagesDiv = document.getElementById('chatMessages');

    if (!chatWidget || !chatBox || !chatInput || !messagesDiv) {
      console.error('Chat widget elements not found');
      return;
    }

    // Toggle chat function
    window.toggleChat = function() {
      chatBox.classList.toggle('active');
      if (chatBox.classList.contains('active')) {
        chatInput.focus();
      }
    };

    // Send message function
    window.sendMessage = function() {
      const message = chatInput.value.trim();
      
      if (message) {
        addMessage(message, 'sent');
        chatInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
          handleBotResponse(message);
        }, 1000);
      }
    };

    // Handle Enter key
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });

    // Form submission handler
    window.submitChatForm = function(formElement) {
      const formData = new FormData(formElement);
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      // Add thank you message
      addMessage('Thank you for providing your information! Our team will contact you shortly.', 'received');
      
      // Remove the form
      const formDiv = document.querySelector('.chat-form');
      if (formDiv) {
        formDiv.remove();
      }

      // Enable chat input
      chatInput.disabled = false;
      chatInput.placeholder = 'Type your message...';

      // Prevent actual form submission
      return false;
    };
  });

  function addMessage(text, type) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function showContactForm() {
    const formHTML = `
      <div class="chat-form">
        <form onsubmit="return submitChatForm(this);">
          <input type="text" name="name" placeholder="Your Name" required>
          <input type="email" name="email" placeholder="Your Email" required>
          <textarea name="message" placeholder="How can we help you?" rows="3" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    `;
    
    addMessage(formHTML, 'received');
    
    // Disable chat input while form is active
    const chatInput = document.getElementById('chatInput');
    chatInput.disabled = true;
    chatInput.placeholder = 'Please fill out the form above...';
  }

  function handleBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    let response;

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      response = "👋 Hi! I'd be happy to help you. Would you like to provide your contact information so we can better assist you?";
      addMessage(response, 'received');
      setTimeout(() => {
        showContactForm();
      }, 1000);
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('talk')) {
      response = "I'll help you get in touch with our team. Please fill out this quick form:";
      addMessage(response, 'received');
      setTimeout(() => {
        showContactForm();
      }, 1000);
    } else if (lowerMessage.includes('services')) {
      response = "We offer Managed IT, Digital Transformation, BI & Analytics, and more. Would you like to discuss your specific needs with our team?";
      addMessage(response, 'received');
      setTimeout(() => {
        showContactForm();
      }, 1000);
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      response = "I can help you get a customized quote for your needs. Please provide your details:";
      addMessage(response, 'received');
      setTimeout(() => {
        showContactForm();
      }, 1000);
    } else {
      response = "I'd be happy to help you with that. Let's get your information so our team can assist you better:";
      addMessage(response, 'received');
      setTimeout(() => {
        showContactForm();
      }, 1000);
    }
  }

  /**
   * Handle scroll to top visibility and chat widget positioning
   */
  function handleScroll() {
    const scrollTop = document.querySelector('.scroll-top');
    const chatWidget = document.querySelector('.chat-widget');
    
    if (window.scrollY > 100) {
      scrollTop.classList.add('active');
      chatWidget.classList.add('scroll-top-active');
    } else {
      scrollTop.classList.remove('active');
      chatWidget.classList.remove('scroll-top-active');
    }
  }

  document.addEventListener('scroll', handleScroll);

  /**
   * Testimonial Slider
   */
  new Swiper('.testimonial-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    }
  });

})();