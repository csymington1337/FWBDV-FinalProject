//hamburger menu
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('#header .hamburger');
  const menu = document.querySelector('#header .nav-links ul');
  const menuLinks = document.querySelectorAll('#header .nav-links ul li a');
  const header = document.querySelector('#header .header-container');

  if (!hamburger || !menu) return;

  const isOpen = () => menu.classList.contains('active');

  function openMenu() {
    menu.classList.add('active');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
  }

  function closeMenu() {
    menu.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    // return focus to trigger if closed via keyboard
    if (document.activeElement && !hamburger.contains(document.activeElement)) {
      hamburger.focus();
    }
  }

  const toggleMenu = () => (isOpen() ? closeMenu() : openMenu());

  //Click to open/close
  hamburger.addEventListener('click', toggleMenu);

  //Click a link -> close
  menuLinks.forEach(a => a.addEventListener('click', closeMenu));

  //Escape to close
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Escape' || e.key === 'Esc') && isOpen()) {
      e.preventDefault();
      closeMenu();
    }
  });

  // Header background on scroll
  document.addEventListener('scroll', () => {
    if (!header) return;
    header.style.backgroundColor = window.scrollY > 100 ? '#000' : 'transparent';
  });
});

//membership plan-type toggle
const toggleBtns = document.querySelectorAll('.toggle-btn');
const planSections = document.querySelectorAll('.plan-section');

toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        //Remove active from all buttons
        toggleBtns.forEach(b => b.classList.remove('active'));
        //Add active to clicked button
        btn.classList.add('active');
        
        //Hide all plan sections
        planSections.forEach(section => section.classList.remove('active'));
        
        //Show corresponding plan section
        const planType = btn.dataset.plan;
        document.querySelector(`.${planType}-plans`).classList.add('active');
    });
});

//membership CTA button animation
document.addEventListener('DOMContentLoaded', () => {
    const chevronBtn = document.querySelector('.chevron-btn');
    const plansCTA = document.querySelector('.plans-CTA, .training-CTA');

    if (chevronBtn && plansCTA) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    chevronBtn.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2
        });

        observer.observe(plansCTA);
    }
});