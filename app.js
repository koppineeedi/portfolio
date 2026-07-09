// Project Details Data
const projectDetails = {
  'port-scanner': {
    title: 'Port Scanner and Network Reconnaissance Tool',
    subtitle: 'Active reconnaissance utility in Python',
    objectives: [
      'Developed a Python-based port scanner to identify open ports and active services on target machines.',
      'Implemented socket programming for port enumeration with support for custom port ranges and service identification.',
      'Demonstrated network reconnaissance techniques essential for security audits and penetration testing.'
    ],
    methodology: 'Developed utilizing Python\'s socket and threading libraries for high-performance concurrent scans. Employs TCP Connect scanning and handles connection timeouts gracefully to scan target IP ranges rapidly.',
    tools: ['Python 3.x', 'Socket Programming', 'Network Security', 'Port Enumeration'],
    findings: 'Capable of scanning 1000 common ports in under 15 seconds. Correctly identifies running web servers (80/443), SSH (22), FTP (21), and database services.',
    github: 'https://github.com/koppineeedi'
  },
  'wireshark-analysis': {
    title: 'Wireshark Packet Analysis and Network Traffic Inspection',
    subtitle: 'Network protocol analysis and forensics',
    objectives: [
      'Captured and analyzed network packets to understand protocol behavior and data transmission patterns.',
      'Identified suspicious traffic patterns and potential security threats through packet inspection.',
      'Built foundational knowledge in forensic analysis and real-time network monitoring.'
    ],
    methodology: 'Captured network data under controlled simulation scenarios. Applied display filters to isolate targeted traffic, analyzed packet structures line-by-line, and investigated TCP streams to reconstruct sessions.',
    tools: ['Wireshark', 'Network Protocols', 'Packet Inspection'],
    findings: 'Successfully identified unauthorized cleartext transmissions in a test environment. Visualized DNS leakage issues and mapped packet payload sizes to verify protocol efficiency.',
    github: 'https://github.com/koppineeedi'
  },
  'soc-log-analysis': {
    title: 'SOC Log Analysis and Security Event Correlation',
    subtitle: 'Log parsing and security monitoring',
    objectives: [
      'Analyzed security logs from multiple sources to identify suspicious activities and potential security breaches.',
      'Correlated events across different systems to detect advanced threats and anomalous behavior.',
      'Documented findings and recommendations for incident response and threat mitigation.'
    ],
    methodology: 'Created a parsing engine that reads standard log formats (syslog, auth.log). Applies regex filters to detect unauthorized root access attempts, repeated SSH failures, and scanning patterns.',
    tools: ['SOC Operations', 'Log Analysis', 'Threat Detection', 'Python'],
    findings: 'Parsed 50,000 log entries in under 2 seconds. Triggered security warnings on detecting 15 consecutive login failures from a single external IP address within a 60-second window.',
    github: 'https://github.com/koppineeedi'
  }
};

/* ====================
   EMAILJS CONFIGURATION
   ====================
   Replace the placeholders below with your actual keys from EmailJS.
   Learn more at: https://www.emailjs.com/
*/
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

// Initialize EmailJS if the public key has been configured
if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY,
  });
}

// Document Elements
const sections = document.querySelectorAll('.page-section');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const scrollTopBtn = document.querySelector('.scroll-top-btn');
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');
const footer = document.querySelector('footer');

// Modal Elements
const modalOverlay = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalSubtitle = document.getElementById('modal-subtitle');
const modalObjectives = document.getElementById('modal-objectives');
const modalMethodology = document.getElementById('modal-methodology');
const modalFindings = document.getElementById('modal-findings');
const modalTechBadges = document.getElementById('modal-tech-badges');
const modalGithubLink = document.getElementById('modal-github-link');
const modalCloseBtn = document.querySelector('.modal-close-btn');

/* ====================
   SPA HASH ROUTING
==================== */
function handleRouting() {
  let hash = window.location.hash || '#home';
  
  // Clean up mobile menu if open
  navMenu.classList.remove('active');
  const menuIcon = hamburger.querySelector('i');
  if (menuIcon && menuIcon.classList.contains('lucide-x')) {
    menuIcon.classList.replace('lucide-x', 'lucide-menu');
  }

  // Active section switching with smooth fade
  sections.forEach(section => {
    if ('#' + section.id === hash) {
      section.classList.add('active');
      // Delay adding fade-in to allow display block layout computation
      setTimeout(() => {
        section.classList.add('fade-in');
      }, 50);
    } else {
      section.classList.remove('fade-in');
      section.classList.remove('active');
    }
  });

  // Highlight active link in header nav
  navLinks.forEach(link => {
    if (link.getAttribute('href') === hash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Toggle footer visibility: only show on Home page
  if (footer) {
    if (hash === '#home') {
      footer.style.display = 'block';
    } else {
      footer.style.display = 'none';
    }
  }

  // Scroll to top on page transition
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// Router Event Listeners
window.addEventListener('hashchange', handleRouting);
window.addEventListener('load', () => {
  handleRouting();
  
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

/* ====================
   MOBILE NAVIGATION
==================== */
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  const menuIcon = hamburger.querySelector('i');
  
  if (menuIcon) {
    if (navMenu.classList.contains('active')) {
      menuIcon.setAttribute('data-lucide', 'x');
    } else {
      menuIcon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
  }
});

// Close mobile menu on clicking any navigation item
navMenu.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav-link')) {
    navMenu.classList.remove('active');
    const menuIcon = hamburger.querySelector('i');
    if (menuIcon) {
      menuIcon.setAttribute('data-lucide', 'menu');
      lucide.createIcons();
    }
  }
});

/* ====================
   SCROLL TO TOP BTN
==================== */
window.addEventListener('scroll', () => {
  const hash = window.location.hash || '#home';
  if (window.scrollY > 300 && hash === '#home') {
    scrollTopBtn.style.display = 'flex';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ====================
   PROJECTS DETAIL MODAL
==================== */
function openProjectModal(projectId) {
  const data = projectDetails[projectId];
  if (!data) return;

  // Set header
  modalTitle.textContent = data.title;
  modalSubtitle.textContent = data.subtitle;

  // Set Objectives list
  modalObjectives.innerHTML = '';
  data.objectives.forEach(obj => {
    const li = document.createElement('li');
    li.textContent = obj;
    modalObjectives.appendChild(li);
  });

  // Set texts
  modalMethodology.textContent = data.methodology;
  modalFindings.textContent = data.findings;

  // Set tech badges
  modalTechBadges.innerHTML = '';
  data.tools.forEach(tool => {
    const span = document.createElement('span');
    span.className = 'tech-badge';
    span.textContent = tool;
    modalTechBadges.appendChild(span);
  });

  // Set GitHub Link
  if (data.github && data.github !== '#') {
    modalGithubLink.href = data.github;
    modalGithubLink.style.display = 'inline-flex';
  } else {
    modalGithubLink.style.display = 'none';
  }

  // Open modal
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Lock background scroll
  
  // Refresh icons inside modal
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function closeProjectModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = ''; // Unlock background scroll
}

// Event Listeners for Details Buttons
document.body.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-project-btn]');
  if (btn) {
    e.preventDefault();
    const projectId = btn.getAttribute('data-project-btn');
    openProjectModal(projectId);
  }
});

modalCloseBtn.addEventListener('click', closeProjectModal);

// Close modal on click outside content
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeProjectModal();
  }
});

// Close modal on Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeProjectModal();
  }
});

/* ====================
   CONTACT FORM SUBMISSION
==================== */
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim();
    const message = document.getElementById('form-message').value.trim();

    // Basic Validation Check
    if (!name || !email || !subject || !message) {
      alert('Please fill out all fields.');
      return;
    }

    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnHTML = submitBtn.innerHTML;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i data-lucide="loader" class="animate-spin"></i> Sending...`;
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Safety check for EmailJS SDK load
    if (typeof emailjs === 'undefined') {
      alert('EmailJS SDK failed to load. Please check your internet connection or the script configuration in index.html.');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
      if (typeof lucide !== 'undefined') lucide.createIcons();
      return;
    }

    // Safety check for credentials
    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY' || 
        EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || 
        EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
      alert('EmailJS is not fully configured yet. Please configure the EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, and EMAILJS_TEMPLATE_ID constants at the top of app.js with your EmailJS credentials.');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
      if (typeof lucide !== 'undefined') lucide.createIcons();
      return;
    }

    // Send email using EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message
    })
    .then(response => {
      // Clear form inputs
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
      if (typeof lucide !== 'undefined') lucide.createIcons();

      // Show Success Toast
      toast.classList.add('active');

      // Hide toast after 4s
      setTimeout(() => {
        toast.classList.remove('active');
      }, 4000);
    })
    .catch(error => {
      console.error("EmailJS Error:", error);
      alert("There was an issue sending your message. Please try again or email directly.");
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  });
}
