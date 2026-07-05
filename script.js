/* ==========================================================================
   AAYUSH KUMAR PORTFOLIO JAVASCRIPT
   Core Logic: Scroll spies, interactive tabs, Power BI mock metrics,
   live DCC simulators, and dual WhatsApp chat widgets.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Navigation & Header Animations
  // ==========================================
  const header = document.getElementById('main-header');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Change header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    scrollSpy();
  });

  // Mobile menu toggle
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
    // Simple hamburger animation
    const spans = mobileToggle.querySelectorAll('span');
    if (mobileToggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close mobile menu on nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileToggle.classList.remove('active');
      const spans = mobileToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // Scroll Spy to set active link
  function scrollSpy() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Set initial Date in Declaration footer
  const dateSpan = document.getElementById('current-date');
  if (dateSpan) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    dateSpan.textContent = new Date().toLocaleDateString('en-US', options);
  }


  // ==========================================
  // 2. Experience Section: Tab Toggles
  // ==========================================
  const tabBtns = document.querySelectorAll('.exp-tab-btn');
  const panels = document.querySelectorAll('.exp-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active classes
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      
      // Add active to clicked button and target panel
      btn.classList.add('active');
      const jobId = btn.getAttribute('data-job');
      document.getElementById(`panel-${jobId}`).classList.add('active');
    });
  });


  // ==========================================
  // 3. DCC Control Panel: Subsystems
  // ==========================================
  const consoleTabs = document.querySelectorAll('.console-tab');
  const systemSubs = document.querySelectorAll('.system-sub');

  consoleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      consoleTabs.forEach(t => t.classList.remove('active'));
      systemSubs.forEach(s => s.classList.remove('active'));
      
      tab.classList.add('active');
      const systemId = tab.getAttribute('data-system');
      document.getElementById(`sys-${systemId}`).classList.add('active');
    });
  });

  // Simulator: Oscillating Temperatures & sensor values in DCC Alarms
  const tempAElement = document.getElementById('temp-a');
  const tempBElement = document.getElementById('temp-b');
  
  if (tempAElement && tempBElement) {
    setInterval(() => {
      // Add minor random fluctuation (-0.2 to +0.2) to temp readings
      const baseA = 24.2;
      const baseB = 23.8;
      const shiftA = (Math.random() * 0.4 - 0.2).toFixed(1);
      const shiftB = (Math.random() * 0.4 - 0.2).toFixed(1);
      
      tempAElement.textContent = `${(parseFloat(baseA) + parseFloat(shiftA)).toFixed(1)} °C`;
      tempBElement.textContent = `${(parseFloat(baseB) + parseFloat(shiftB)).toFixed(1)} °C`;
    }, 3000);
  }


  // ==========================================
  // 4. Power BI Interactive Dashboard Mockup
  // ==========================================
  const categoryFilter = document.getElementById('pbi-category-filter');
  const regionFilter = document.getElementById('pbi-region-filter');
  
  // DOM element targets for dashboard values
  const pbiRevenue = document.getElementById('pbi-revenue');
  const pbiOrders = document.getElementById('pbi-orders');
  const pbiTicket = document.getElementById('pbi-ticket');
  const pbiActiveFilterText = document.getElementById('pbi-active-filter-text');
  
  const chanDirect = document.getElementById('chan-direct');
  const chanMarket = document.getElementById('chan-market');
  const chanSocial = document.getElementById('chan-social');
  
  const chartBars = document.querySelectorAll('.bar-rect');

  // Hardcoded matrix of values based on filters to mimic database queries
  const pbiDataset = {
    // CATEGORY: all
    'all_all': { rev: '$1,245,800', ord: '14,230', tkt: '$87.54', direct: '45%', market: '35%', social: '20%', heights: [60, 70, 80, 55, 90, 75] },
    'all_us':  { rev: '$622,900',  ord: '6,920',  tkt: '$90.01', direct: '48%', market: '32%', social: '20%', heights: [30, 45, 60, 40, 70, 50] },
    'all_uk':  { rev: '$373,740',  ord: '4,410',  tkt: '$84.74', direct: '42%', market: '38%', social: '20%', heights: [20, 25, 45, 30, 50, 40] },
    'all_au':  { rev: '$249,160',  ord: '2,900',  tkt: '$85.91', direct: '40%', market: '36%', social: '24%', heights: [15, 20, 30, 25, 45, 30] },
    
    // CATEGORY: electronics
    'electronics_all': { rev: '$747,480', ord: '5,300',  tkt: '$141.03', direct: '50%', market: '30%', social: '20%', heights: [45, 55, 65, 40, 80, 50] },
    'electronics_us':  { rev: '$398,500', ord: '2,750',  tkt: '$144.91', direct: '52%', market: '28%', social: '20%', heights: [25, 35, 45, 30, 60, 35] },
    'electronics_uk':  { rev: '$210,000', ord: '1,550',  tkt: '$135.48', direct: '48%', market: '34%', social: '18%', heights: [15, 20, 30, 20, 40, 25] },
    'electronics_au':  { rev: '$138,980', ord: '1,000',  tkt: '$138.98', direct: '46%', market: '32%', social: '22%', heights: [10, 15, 20, 15, 30, 20] },

    // CATEGORY: fashion
    'fashion_all': { rev: '$299,020', ord: '5,180',  tkt: '$57.72', direct: '38%', market: '40%', social: '22%', heights: [30, 40, 45, 30, 50, 42] },
    'fashion_us':  { rev: '$138,000', ord: '2,300',  tkt: '$60.00', direct: '40%', market: '38%', social: '22%', heights: [15, 20, 25, 15, 30, 22] },
    'fashion_uk':  { rev: '$98,000',  ord: '1,720',  tkt: '$56.97', direct: '36%', market: '42%', social: '22%', heights: [10, 15, 18, 12, 22, 18] },
    'fashion_au':  { rev: '$63,020',  ord: '1,160',  tkt: '$54.32', direct: '34%', market: '44%', social: '22%', heights: [8, 10, 15, 10, 18, 12] },

    // CATEGORY: home
    'home_all': { rev: '$199,300', ord: '3,750',  tkt: '$53.14', direct: '44%', market: '36%', social: '20%', heights: [25, 30, 35, 25, 45, 35] },
    'home_us':  { rev: '$86,400',  ord: '1,870',  tkt: '$46.20', direct: '46%', market: '34%', social: '20%', heights: [12, 16, 20, 14, 25, 18] },
    'home_uk':  { rev: '$65,740',  ord: '1,140',  tkt: '$57.66', direct: '42%', market: '38%', social: '20%', heights: [10, 12, 15, 10, 20, 14] },
    'home_au':  { rev: '$47,160',  ord: '740',    tkt: '$63.72', direct: '40%', market: '38%', social: '22%', heights: [6, 8, 12, 8, 15, 10] }
  };

  function updatePowerBIDashboard() {
    const cat = categoryFilter.value;
    const reg = regionFilter.value;
    const lookupKey = `${cat}_${reg}`;
    const data = pbiDataset[lookupKey] || pbiDataset['all_all'];

    // 1. Update text fields
    pbiRevenue.textContent = data.rev;
    pbiOrders.textContent = data.ord;
    pbiTicket.textContent = data.tkt;

    // 2. Update status bar active filter text
    let filterDescription = '';
    if (cat !== 'all') filterDescription += `Category: ${categoryFilter.options[categoryFilter.selectedIndex].text}`;
    if (reg !== 'all') {
      if (filterDescription) filterDescription += ' | ';
      filterDescription += `Region: ${regionFilter.options[regionFilter.selectedIndex].text}`;
    }
    pbiActiveFilterText.textContent = filterDescription || 'None (Global)';

    // 3. Update Channel Stats
    chanDirect.textContent = data.direct;
    chanMarket.textContent = data.market;
    chanSocial.textContent = data.social;

    // 4. Update SVG bar heights dynamically
    chartBars.forEach((bar, index) => {
      const targetHeight = data.heights[index] || 50;
      const baseLineY = 100; // bottom line of the chart is at Y=100
      const targetY = baseLineY - targetHeight;

      // Animate attributes
      bar.setAttribute('height', targetHeight);
      bar.setAttribute('y', targetY);
    });
  }

  // Bind change events
  if (categoryFilter && regionFilter) {
    categoryFilter.addEventListener('change', updatePowerBIDashboard);
    regionFilter.addEventListener('change', updatePowerBIDashboard);
    // Initial run
    updatePowerBIDashboard();
  }


  // ==========================================
  // 5. Contact Forms & WhatsApp Actions
  // ==========================================
  const contactForm = document.getElementById('portfolio-contact-form');
  const btnSubmitWhatsapp = document.getElementById('btn-submit-whatsapp');
  const formFeedback = document.getElementById('form-feedback');

  const emailModal = document.getElementById('email-client-modal');
  const btnCloseEmailModal = document.getElementById('btn-close-email-modal');
  const providerGmail = document.getElementById('provider-gmail');
  const providerYahoo = document.getElementById('provider-yahoo');
  const providerDefault = document.getElementById('provider-default');
  let currentMailData = null;

  if (contactForm) {
    // Action 1: Standard Submit form (Email Simulator Modal Trigger)
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-msg').value.trim();

      if (!name || !email || !subject || !message) {
        showFormFeedback('Please fill out all fields.', 'error');
        return;
      }

      // Store form data for modal actions
      currentMailData = { name, email, subject, message };

      // Open email service selector modal
      if (emailModal) {
        emailModal.style.display = 'flex';
        showFormFeedback('Please select your email provider from the popup window.', 'success');
      }
    });

    // Close Modal button action
    if (btnCloseEmailModal) {
      btnCloseEmailModal.addEventListener('click', () => {
        emailModal.style.display = 'none';
        showFormFeedback('', '');
      });
    }

    // Close Modal when clicking outside the content window
    window.addEventListener('click', (e) => {
      if (e.target === emailModal) {
        emailModal.style.display = 'none';
        showFormFeedback('', '');
      }
    });

    // Provider 1: Gmail Compose Link Action
    if (providerGmail) {
      providerGmail.addEventListener('click', () => {
        if (!currentMailData) return;
        const { name, email, subject, message } = currentMailData;
        const mailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=aayushak0182@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
        
        window.open(gmailUrl, '_blank');
        emailModal.style.display = 'none';
        showFormFeedback(`Success! Draft opened in Gmail.`, 'success');
        contactForm.reset();
        currentMailData = null;
      });
    }

    // Provider 2: Yahoo Compose Link Action
    if (providerYahoo) {
      providerYahoo.addEventListener('click', () => {
        if (!currentMailData) return;
        const { name, email, subject, message } = currentMailData;
        const mailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const yahooUrl = `https://compose.mail.yahoo.com/?to=aayushak0182@gmail.com&subj=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
        
        window.open(yahooUrl, '_blank');
        emailModal.style.display = 'none';
        showFormFeedback(`Success! Draft opened in Yahoo Mail.`, 'success');
        contactForm.reset();
        currentMailData = null;
      });
    }

    // Provider 3: Default Desktop Mail App Action (Outlook/Mail App)
    if (providerDefault) {
      providerDefault.addEventListener('click', () => {
        if (!currentMailData) return;
        const { name, email, subject, message } = currentMailData;
        const mailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const mailtoUrl = `mailto:aayushak0182@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
        
        window.location.href = mailtoUrl;
        emailModal.style.display = 'none';
        showFormFeedback(`Opening your default system mail client...`, 'success');
        contactForm.reset();
        currentMailData = null;
      });
    }

    // Action 2: Send Form Contents via WhatsApp
    if (btnSubmitWhatsapp) {
      btnSubmitWhatsapp.addEventListener('click', () => {
        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const subject = document.getElementById('form-subject').value.trim();
        const message = document.getElementById('form-msg').value.trim();

        if (!name || !message) {
          showFormFeedback('Please enter at least your Name and Message to chat on WhatsApp.', 'error');
          return;
        }

        const whatsappText = `Hi Aayush, my name is ${name}. I saw your portfolio and wanted to connect.\n\n*Subject:* ${subject || 'General Inquiry'}\n*Email:* ${email || 'N/A'}\n\n*Message:* ${message}`;
        const encodedText = encodeURIComponent(whatsappText);
        
        showFormFeedback('Opening WhatsApp window...', 'success');
        
        setTimeout(() => {
          window.open(`https://wa.me/916290734570?text=${encodedText}`, '_blank');
          showFormFeedback('', '');
        }, 800);
      });
    }
  }

  function showFormFeedback(msg, type) {
    if (!formFeedback) return;
    formFeedback.textContent = msg;
    formFeedback.className = 'form-feedback-message'; // reset
    if (type) {
      formFeedback.classList.add(type);
    }
  }


  // ==========================================
  // 6. Floating WhatsApp Chat Widget
  // ==========================================
  const waWidget = document.getElementById('wa-widget');
  const waToggle = document.getElementById('wa-toggle');
  const waBox = document.getElementById('wa-box');
  const waClose = document.getElementById('wa-close');
  const waSend = document.getElementById('wa-send');
  const waInput = document.getElementById('wa-input');
  const waBody = waBox.querySelector('.wa-box-body');

  // Toggle widget view
  waToggle.addEventListener('click', () => {
    const isVisible = waBox.style.display === 'flex';
    waBox.style.display = isVisible ? 'none' : 'flex';
    
    // Remove notification ping dot on first click
    const ping = waToggle.querySelector('.badge-ping');
    if (ping) {
      ping.remove();
    }
    
    if (!isVisible) {
      waInput.focus();
      // Scroll messages to bottom
      waBody.scrollTop = waBody.scrollHeight;
    }
  });

  // Close widget
  waClose.addEventListener('click', (e) => {
    e.stopPropagation();
    waBox.style.display = 'none';
  });

  // Send message on click
  waSend.addEventListener('click', sendFloatingWaMessage);

  // Send message on Enter keypress
  waInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendFloatingWaMessage();
    }
  });

  function sendFloatingWaMessage() {
    const text = waInput.value.trim();
    if (!text) return;

    // 1. Create bubble in UI
    const timeString = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const msgDiv = document.createElement('div');
    msgDiv.className = 'wa-msg bubble-outgoing';
    msgDiv.innerHTML = `<p>${escapeHTML(text)}</p><span class="wa-msg-time">${timeString}</span>`;
    waBody.appendChild(msgDiv);
    
    // Clear input
    waInput.value = '';
    
    // Scroll to bottom
    waBody.scrollTop = waBody.scrollHeight;

    // 2. Redirect to WhatsApp link after brief delay
    setTimeout(() => {
      const waUrl = `https://wa.me/916290734570?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
    }, 600);
  }

  // Simple HTML escaping helper for user chat safety
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

});
