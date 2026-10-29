  
 

        /* ================= Burger menu ================= */
        (function () {
            const burgerBtn   = document.getElementById('burgerBtn');
            const burgerStack = document.getElementById('burgerIconStack');
            const mobilePanel = document.getElementById('mobilePanel');
            if (!burgerBtn || !mobilePanel) return;

            // Set the icon state: true = open (show close), false = closed (show menu)
            function setBurgerState(isOpen) {
                if (burgerStack) burgerStack.classList.toggle('is-open', isOpen);
                burgerBtn.setAttribute('aria-expanded', String(isOpen));
                burgerBtn.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
            }

            // Initial state
            setBurgerState(false);

            burgerBtn.addEventListener('click', () => {
                const isOpen = mobilePanel.classList.toggle('open');
                setBurgerState(isOpen);
            });

            // Close panel when a link inside it is clicked
            mobilePanel.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobilePanel.classList.remove('open');
                    setBurgerState(false);
                });
            });
        })();

        /* ================= Mobile Soluciones submenu ================= */
        (function () {
            const btn = document.getElementById('mobileSolBtn');
            const sub = document.getElementById('mobileSolSub');
            if (!btn || !sub) return;
            btn.addEventListener('click', () => {
                const open = sub.classList.toggle('open');
                btn.classList.toggle('open', open);
                btn.setAttribute('aria-expanded', String(open));
            });
        })();

        /* ================= Desktop Soluciones mega-menu ================= */
        (function () {
            const wrap     = document.getElementById('solucionesWrap');
            const btn      = document.getElementById('solucionesBtn');
            const chevron  = document.getElementById('solucionesChevron');
            const menu     = document.getElementById('megaMenu');
            const items    = menu.querySelectorAll('.mega-item');
            const imgs     = menu.querySelectorAll('.mega-img');
            if (!wrap || !btn || !menu) return;

            const DEFAULT_ID = 'default';

            function showImage(id) {
                imgs.forEach(img => {
                    img.classList.toggle('active', img.dataset.imgId === id);
                });
            }

            function openMenu() {
                menu.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
                if (chevron) chevron.style.transform = 'rotate(180deg)';
                items.forEach(i => i.classList.remove('active'));
                const first = menu.querySelector('.mega-item[data-img="default"]') || items[0];
                if (first) first.classList.add('active');
                showImage(DEFAULT_ID);
            }

            function closeMenu() {
                menu.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
                if (chevron) chevron.style.transform = 'rotate(0deg)';
            }

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                menu.classList.contains('open') ? closeMenu() : openMenu();
            });

            let hoverTimer;
            wrap.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimer);
                openMenu();
            });
            wrap.addEventListener('mouseleave', () => {
                hoverTimer = setTimeout(closeMenu, 180);
            });

            menu.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimer);
            });
            menu.addEventListener('mouseleave', () => {
                hoverTimer = setTimeout(closeMenu, 180);
            });

            items.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    items.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    showImage(item.dataset.img || DEFAULT_ID);
                });
                item.addEventListener('focus', () => {
                    items.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    showImage(item.dataset.img || DEFAULT_ID);
                });
                item.addEventListener('click', () => {
                    closeMenu();
                });
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeMenu();
            });

            document.addEventListener('click', (e) => {
                if (!wrap.contains(e.target) && !menu.contains(e.target)) closeMenu();
            });
        })();



	    
  

    // 1. Handle Lottie icons
    document.querySelectorAll('[data-lottie-hover]').forEach((icon) => {
      const btn = icon.closest('button');
      if (!btn) return;

      btn.addEventListener('mouseenter', () => {
        icon.speed = 0.6;
        icon.stop();
        icon.play();
      });
      btn.addEventListener('mouseleave', () => icon.stop());
    });

    // 2. Handle AnimateIcons (Languages, Sun, etc.)
    document.querySelectorAll('[data-animate-icon]').forEach((icon) => {
      const btn = icon.closest('button');
      if (!btn) return;

      btn.addEventListener('mouseenter', () => {
        if (icon.startAnimation) icon.startAnimation();
      });
      btn.addEventListener('mouseleave', () => {
        if (icon.stopAnimation) icon.stopAnimation();
      });
    });

  




    document.addEventListener('DOMContentLoaded', () => {
        const slides   = document.querySelectorAll('.hero-slide');
        const track    = document.getElementById('heroProgressTrack');
        const DURATION = 5000;

        if (!slides.length || !track) return;

        let currentSlide = 0;
        let rafId = null;
        let startTime = null;
        let timerId = null;

        const slots = [];
        slides.forEach((_, i) => {
            const slot = document.createElement('div');
            slot.className = 'hero-slot' + (i === 0 ? ' active' : '');
            const fill = document.createElement('div');
            fill.className = 'hero-slot-fill';
            slot.appendChild(fill);
            track.appendChild(slot);
            slots.push({ el: slot, fill });
        });

        function tick(now) {
            if (startTime === null) startTime = now;
            const pct = Math.min((now - startTime) / DURATION, 1);
            const activeFill = slots[currentSlide]?.fill;
            if (activeFill) activeFill.style.width = (pct * 100) + '%';
            if (pct < 1) rafId = requestAnimationFrame(tick);
        }

        function startProgress() {
            cancelAnimationFrame(rafId);
            startTime = null;
            slots.forEach((s, i) => {
                s.el.classList.toggle('active', i === currentSlide);
                s.fill.style.width = '0%';
            });
            rafId = requestAnimationFrame(tick);
        }

        function goToNextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
            startProgress();
        }

        startProgress();
        timerId = setInterval(goToNextSlide, DURATION);

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cancelAnimationFrame(rafId);
                clearInterval(timerId);
            } else {
                startProgress();
                clearInterval(timerId);
                timerId = setInterval(goToNextSlide, DURATION);
            }
        });
    });








    document.addEventListener('DOMContentLoaded', () => {
        const track = document.getElementById('logoTrack');
        const group = track?.querySelector('.logo-group');
        if (!track || !group) return;

        const run = () => {
            const lastImg = group.lastElementChild;
            const gap = lastImg ? parseFloat(getComputedStyle(lastImg).marginRight) || 0 : 0;
            const groupWidth = group.getBoundingClientRect().width + gap;

            if (groupWidth === 0) return;

            const viewport = track.parentElement.clientWidth;
            const copiesNeeded = Math.max(2, Math.ceil((viewport * 2) / groupWidth) + 1);

            while (track.children.length < copiesNeeded) {
                const clone = group.cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                track.appendChild(clone);
            }

            track.style.animation = `marquee 40s linear infinite`;
            track.style.setProperty('--marquee-distance', `-${groupWidth}px`);

            // === FIX: pause on hover even with inline animation ===
            // Inline `animation` shorthand resets play-state; we toggle it directly.
            const pause = () => { track.style.animationPlayState = 'paused'; };
            const play  = () => { track.style.animationPlayState = 'running'; };

            // Hover on any logo (or the track itself) pauses the marquee
            track.addEventListener('mouseenter', pause);
            track.addEventListener('mouseleave', play);
        };

        if (group.querySelector('img')) {
            const imgs = group.querySelectorAll('img');
            let loaded = 0;
            const total = imgs.length;
            imgs.forEach(img => {
                if (img.complete) { loaded++; }
                else img.addEventListener('load', () => {
                    loaded++;
                    if (loaded === total) requestAnimationFrame(run);
                });
            });
            if (loaded === total) requestAnimationFrame(run);
            setTimeout(run, 1500);
        } else {
            requestAnimationFrame(run);
        }
    });







    // Stacked notification deck: reveal on scroll + cycle layers every few seconds
    (function () {
        const stage  = document.querySelector('.device-stage');
        const stack  = document.getElementById('notificationStack');
        const phone  = document.getElementById('phoneMockup');
        if (!stage || !stack) return;

        const cards = Array.from(stack.querySelectorAll('.notif-card'));
        if (!cards.length) return;

        // Assign initial layers: card[0] front, card[1] middle, card[2] back
        cards.forEach((card, i) => {
            card.dataset.layer = String(i + 1);
        });

        // Cycle: every N seconds, the back card jumps to the front and others shift back.
        // Visually this reads as the newest notification "popping up".
        let cycleTimer = null;
        const CYCLE_MS = 3200;

        function rotateLayers() {
            // Current layers -> which card is front/middle/back
            const sorted = [...cards].sort(
                (a, b) => Number(a.dataset.layer) - Number(b.dataset.layer)
            );
            // front = layer 1, middle = 2, back = 3
            const [front, middle, back] = sorted;

            // Promote back -> front, front -> middle, middle -> back
            back.dataset.layer   = '1';
            front.dataset.layer  = '2';
            middle.dataset.layer = '3';
        }

        function startCycle() {
            if (cycleTimer) return;
            cycleTimer = setInterval(rotateLayers, CYCLE_MS);
        }

        function reveal() {
            stack.classList.add('is-visible');
            if (phone) phone.classList.add('is-visible');
            startCycle();
        }

        // Trigger when the stage enters the viewport
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        reveal();
                        io.disconnect();
                    }
                });
            }, { threshold: 0.25 });
            io.observe(stage);
        } else {
            const onScroll = () => {
                const rect = stage.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.75) {
                    reveal();
                    window.removeEventListener('scroll', onScroll);
                }
            };
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
        }
    })();







        // Exact Dashboard Tabs Logic
        document.addEventListener('DOMContentLoaded', () => {
            const tabs = document.querySelectorAll('.tab-btn');
            const contents = document.querySelectorAll('.tab-content');
            let currentIndex = 3; 
            const rotationInterval = 10000; 
            let timer;

            function switchTab(index) {
                tabs.forEach(tab => {
                    tab.classList.remove('active');
                    tab.setAttribute('aria-selected', 'false');
                    const progressBar = tab.querySelector('.tab-progress-bar');
                    if (progressBar) {
                        progressBar.style.animation = 'none';
                        void progressBar.offsetWidth; 
                        progressBar.style.animation = null; 
                    }
                });

                contents.forEach(content => {
                    content.classList.remove('active');
                });

                const activeTab = tabs[index];
                activeTab.classList.add('active');
                activeTab.setAttribute('aria-selected', 'true');
                
const targetId = activeTab.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active');

                // SOLUCIÓN: Scroll suave solo dentro del contenedor horizontal de las pestañas
                const tabList = activeTab.parentElement;
                tabList.scrollTo({
                    left: activeTab.offsetLeft - (tabList.clientWidth / 2) + (activeTab.clientWidth / 2),
                    behavior: 'smooth'
                });
            }
            
            
            

            function nextTab() {
                const nextIndex = (currentIndex + 1) % tabs.length;
                switchTab(nextIndex);
            }

            function startTimer() {
                clearInterval(timer);
                timer = setInterval(nextTab, rotationInterval);
            }

            tabs.forEach((tab, index) => {
                tab.addEventListener('click', () => {
                    switchTab(index);
                    startTimer(); 
                });
            });

            startTimer();
            const initialProgressBar = tabs[currentIndex].querySelector('.tab-progress-bar');
            if (initialProgressBar) {
                initialProgressBar.style.animation = 'none';
                void initialProgressBar.offsetWidth; 
                initialProgressBar.style.animation = null;
            }
        });

        
        
        





// Exact Sticky Cards Logic
        document.addEventListener('scroll', () => {
            const cards = document.querySelectorAll('.stack-card');
            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const cardTop = rect.top;
                const stickyOffset = parseInt(getComputedStyle(card).top); 
                if (cardTop <= stickyOffset + 5) {
                    const distancePast = (stickyOffset - cardTop);
                    const scale = Math.max(0.95, 1 - (distancePast * 0.0005));
                    const brightness = Math.max(0.92, 1 - (distancePast * 0.0003));
                    card.style.transform = `scale(${scale})`;
                    card.style.filter = `brightness(${brightness})`;
                } else {
                    card.style.transform = 'scale(1)';
                    card.style.filter = 'brightness(1)';
                }
            });
        });
   
        
        




        // FAQ Accordion Logic
        document.querySelectorAll('.faq-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const content = btn.nextElementSibling;
                const icon = btn.querySelector('i');
                const isActive = content.classList.contains('active');
                
                
                
                
                // Close all others
                document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('active'));
                document.querySelectorAll('.faq-btn i').forEach(i => i.style.transform = 'rotate(0deg)');
                
                if (!isActive) {
                    content.classList.add('active');
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        });
        
   
        
        






    // GSAP Scroll Animations
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.utils.toArray('.gsap-fade-up').forEach(element => {
            gsap.fromTo(element, 
                { y: 50, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.8, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        gsap.utils.toArray('.gsap-scale-up').forEach(element => {
            gsap.fromTo(element, 
                { scale: 0.9, opacity: 0 },
                { 
                    scale: 1, 
                    opacity: 1, 
                    duration: 1, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
        
        
        gsap.utils.toArray('.stagger-item').forEach((el, i) => {
    gsap.fromTo(el,
        { y: 40, opacity: 0 },
        {
            y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: el, start: "top 88%" }
        }
    );
});


    
    
  

    
// back-to-top button
(function () {
  const btn = document.createElement('button');
  btn.id = 'backToTopBtn';
  btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  btn.setAttribute('aria-label', 'Back to top');
  btn.title = 'Back to top';

  const BASE_GRADIENT  = 'linear-gradient(135deg, #e8d48a 0%, #c9ad55 25%, #ab9239 50%, #8a7429 75%, #6e5c1f 100%)';
  const HOVER_GRADIENT = 'linear-gradient(135deg, #f0e0a0 0%, #d9bd65 25%, #bba349 50%, #9a8439 75%, #7e6c2f 100%)';
  const BASE_SHADOW    = '0 4px 6px -1px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.55), inset 0 -2px 4px rgba(0,0,0,0.35)';
  const HOVER_SHADOW   = '0 8px 16px -1px rgba(0,0,0,0.55), inset 0 2px 4px rgba(255,255,255,0.7), inset 0 -2px 4px rgba(0,0,0,0.4)';

  Object.assign(btn.style, {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '48px',
    height: '48px',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    border: '3px solid #8a7429',
    overflow: 'hidden',
    background: BASE_GRADIENT,
    color: '#2a2000',
    cursor: 'pointer',
    boxShadow: BASE_SHADOW,
    textShadow: '0 1px 1px rgba(255,255,255,0.35)',
    opacity: '0',
    visibility: 'hidden',
    transform: 'translateY(10px) scale(1)',
    transition: 'opacity 0.25s ease, transform 0.25s ease, visibility 0.25s, background 0.3s ease, box-shadow 0.25s ease',
    zIndex: '9999'
  });

  // Animate the SVG on hover
  const svg = btn.querySelector('svg');
  svg.style.transition = 'transform 0.2s ease';

  btn.addEventListener('mouseenter', () => {
    btn.style.background = HOVER_GRADIENT;
    btn.style.boxShadow = HOVER_SHADOW;
    svg.style.transform = 'translateY(-2px)';
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.background = BASE_GRADIENT;
    btn.style.boxShadow = BASE_SHADOW;
    svg.style.transform = 'translateY(0)';
  });

  // Subtle press feedback
  btn.addEventListener('mousedown', () => {
    btn.style.transform = btn.dataset.visible === 'true'
      ? 'translateY(0) scale(0.92)'
      : 'translateY(10px) scale(0.92)';
  });
  btn.addEventListener('mouseup', () => {
    btn.style.transform = btn.dataset.visible === 'true'
      ? 'translateY(0) scale(1)'
      : 'translateY(10px) scale(1)';
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.body.appendChild(btn);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      btn.dataset.visible = 'true';
      btn.style.opacity = '1';
      btn.style.visibility = 'visible';
      btn.style.transform = 'translateY(0) scale(1)';
    } else {
      btn.dataset.visible = 'false';
      btn.style.opacity = '0';
      btn.style.visibility = 'hidden';
      btn.style.transform = 'translateY(10px) scale(1)';
    }
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();
})();
