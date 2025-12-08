// ===== SMOOTH PAGE NAVIGATION =====
function showPage(pageId) {
    const element = document.getElementById(pageId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        showToast(`✨ Navigasi ke ${pageId.charAt(0).toUpperCase() + pageId.slice(1)}`, 'info');
    } else {
        console.warn(`Page ${pageId} tidak ditemukan`);
    }
}

// ===== SMOOTH SCROLL =====
function scrollToAbout() {
    showPage('about');
}

// ===== ENHANCED WHATSAPP CONTACT =====
function openWhatsApp(event) {
    if (event && (event.ctrlKey || event.metaKey)) {
        editWhatsAppNumber();
        return;
    }

    const btn = event.target;
    let phoneNumber = null;
    try {
        phoneNumber = localStorage.getItem('wa_phone') || (btn && btn.dataset.phone) || '6281315770451';
    } catch (e) {
        phoneNumber = (btn && btn.dataset.phone) || '6281315770451';
    }

    // Show toast notification
    showToast('📱 Membuka WhatsApp...', 'success');

    const message = 'Halo, saya ingin memesan produk Coca Cola. Bisa memberikan informasi lebih lanjut?';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Add click animation
    animateButtonClick(btn);

    setTimeout(() => {
        window.open(url, '_blank');
    }, 300);
}

function editWhatsAppNumber() {
    const current = (function () {
        try {
            return localStorage.getItem('wa_phone') || '6281315770451';
        } catch (e) {
            return '6281315770451';
        }
    })();

    const input = prompt('📞 Masukkan nomor WhatsApp\n(format: 62812345678)\n\nContoh: 6281315770451', current);
    if (input === null) return;

    const cleaned = input.replace(/[^0-9]/g, '');
    if (!cleaned) {
        showToast('❌ Nomor tidak valid. Silakan coba lagi.', 'error');
        return;
    }

    try {
        localStorage.setItem('wa_phone', cleaned);
    } catch (e) {}

    const buttons = document.querySelectorAll('[id^="waButton"]');
    buttons.forEach(btn => btn.dataset.phone = cleaned);

    showToast('✅ Nomor WhatsApp berhasil diperbarui!', 'success');
}

// ===== NAVBAR ENHANCED SCROLL ANIMATION =====
function initializeScrollEffects() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Enhanced shadow effect
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 5px 25px rgba(228, 27, 23, 0.15)';
            navbar.style.transform = 'translateY(0)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);
}

// ===== REVEAL ELEMENTS ON SCROLL WITH ADVANCED ANIMATIONS =====
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animations to elements
    const animateElements = document.querySelectorAll('.card, .page-header, h2, p');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px) scale(0.95)';
        el.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        observer.observe(el);
    });
}

// ===== MODERN RIPPLE & BUTTON ANIMATIONS =====
function initializeButtonAnimations() {
    const buttons = document.querySelectorAll('.btn, button');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');

            this.style.position = 'relative';
            this.style.overflow = 'hidden';

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);

            // Button press animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });

        // Hover effect
        button.addEventListener('mouseenter', function () {
            if (!this.classList.contains('btn-light')) {
                this.style.transform = 'translateY(-2px)';
            }
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

function animateButtonClick(button) {
    if (!button) return;

    button.style.transform = 'scale(0.95)';
    button.style.transition = 'transform 0.2s ease';

    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

// ===== MODERN TOAST NOTIFICATION SYSTEM =====
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-message">${message}</span>
        </div>
    `;

    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Auto remove
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== MODERN MODAL EFFECTS =====
function initializeModalEffects() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('show.bs.modal', function () {
            this.style.animation = 'modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    });
}

// ===== ADVANCED COUNTER ANIMATION WITH FORMATTING =====
function animateCounter(element, target, duration = 1500, suffix = '') {
    const startValue = 0;
    const startTime = Date.now();

    function easeOutQuad(t) {
        return t * (2 - t);
    }

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeOutQuad(progress);
        const current = Math.floor(startValue + (target - startValue) * easeProgress);

        element.textContent = current.toLocaleString() + suffix;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}

// ===== EMAIL VALIDATION =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== PHONE NUMBER VALIDATION =====
function validatePhoneNumber(phone) {
    const re = /^[0-9]{10,15}$/;
    return re.test(phone.replace(/[^0-9]/g, ''));
}

// ===== LAZY LOADING WITH BLUR-UP EFFECT =====
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.style.animation = 'imageLoad 0.6s ease-out';
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ===== SCROLL TO TOP BUTTON WITH MODERN DESIGN =====
function createScrollTopButton() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-to-top-btn';
    scrollTopBtn.title = 'Scroll ke atas';

    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        showToast('⬆️ Kembali ke atas...', 'info');
    });
}

// ===== ADVANCED THEME LOADING & STORAGE =====
function loadThemePreferences() {
    try {
        const savedWaNumber = localStorage.getItem('wa_phone');
        if (savedWaNumber) {
            const buttons = document.querySelectorAll('[id^="waButton"]');
            buttons.forEach(btn => btn.dataset.phone = savedWaNumber);
        }
    } catch (e) {
        console.log('Storage not available');
    }
}

// ===== PRODUCT FILTER WITH ANIMATION =====
function filterProducts(category) {
    const cards = document.querySelectorAll('.produk-card');
    let visibleCount = 0;

    cards.forEach((card, index) => {
        const isMatch = category === 'all' || card.dataset.category === category;

        if (isMatch) {
            card.style.display = 'block';
            card.style.animation = 'slideInUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            card.style.animationDelay = (visibleCount * 50) + 'ms';
            visibleCount++;
        } else {
            card.style.animation = 'slideOutDown 0.3s ease-out forwards';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });

    showToast(`🔍 ${visibleCount} produk ditemukan`, 'info');
}

console.log('🥤 Coca Cola Website v2.0 loaded successfully!');
console.log('✨ Enhanced with Bootstrap 4.6, Modern Animations & Toast Notifications');

// ===== ADDITIONAL INTERACTIVITY =====
// Dynamic greeting based on time of day
function displayGreeting() {
    const hours = new Date().getHours();
    let greeting;

    if (hours < 12) {
        greeting = 'Selamat Pagi!';
    } else if (hours < 18) {
        greeting = 'Selamat Siang!';
    } else {
        greeting = 'Selamat Malam!';
    }

    showToast(`🌟 ${greeting} Selamat datang di Coca Cola!`, 'info');
}

// Call greeting on page load
window.addEventListener('load', displayGreeting);

// ===== ENHANCED BUTTON ANIMATION =====
function animateButtonClick(button) {
    if (!button) return;

    button.style.transform = 'scale(0.95)';
    button.style.transition = 'transform 0.2s ease';

    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

// ===== SCROLL TO TOP BUTTON =====
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.textContent = '⬆️';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.padding = '10px';
    button.style.borderRadius = '50%';
    button.style.backgroundColor = '#E41B17';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    button.style.display = 'none';

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        button.style.display = window.scrollY > 200 ? 'block' : 'none';
    });
}

// Initialize scroll-to-top button
createScrollToTopButton();

// ===== VIDEO GALLERY MANAGEMENT =====
// Simpan video ke localStorage
function saveVideosToStorage() {
    try {
        const gallery = document.getElementById('videoGallery');
        if (!gallery) return;

        const videos = [];
        gallery.querySelectorAll('.col-md-6').forEach(col => {
            const titleEl = col.querySelector('.card-title');
            const badgeEl = col.querySelector('div[style*="font-size: 3rem"]');
            const descEl = col.querySelector('.card-text');
            const watchBtn = col.querySelector('.btn-danger');

            const title = titleEl ? titleEl.textContent : '';
            const badge = badgeEl ? badgeEl.textContent : '';
            const desc = descEl ? descEl.textContent : '';

            let url = '';
            if (watchBtn && watchBtn.onclick) {
                const match = watchBtn.onclick.toString().match(/openVideoModal\('([^']+)'\)/);
                url = match ? match[1] : '';
            }

            if (title && url) {
                videos.push({
                    title,
                    badge,
                    desc,
                    url
                });
            }
        });

        localStorage.setItem('videos_gallery', JSON.stringify(videos));
    } catch (e) {
        console.log('Storage tidak tersedia');
    }
}

// Load video dari localStorage
function loadVideosFromStorage() {
    try {
        const saved = localStorage.getItem('videos_gallery');
        if (!saved) return;

        const videos = JSON.parse(saved);
        const gallery = document.getElementById('videoGallery');
        if (!gallery) return;

        videos.forEach(video => {
            const newVideo = document.createElement('div');
            newVideo.className = 'col-md-6 col-lg-4 mb-4';
            newVideo.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <div class="card-body text-center">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">${video.badge}</div>
                        <h5 class="card-title font-weight-bold">${video.title}</h5>
                        <p class="card-text">${video.desc}</p>
                        <button class="btn btn-danger btn-sm" onclick="openVideoModal('${video.url}')">▶ Tonton</button>
                        <button class="btn btn-outline-danger btn-sm mt-2" onclick="deleteVideo(this)">🗑️ Hapus</button>
                    </div>
                </div>
            `;
            gallery.appendChild(newVideo);
        });
    } catch (e) {
        console.log('Error loading videos from storage');
    }
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function () {
    const videoModal = document.getElementById('videoModal');
    if (videoModal) {
        window.addEventListener('click', function (event) {
            if (event.target === videoModal) {
                closeVideoModal();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeVideoModal();
            }
        });
    }
});

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function () {
    initializeAnimations();
    initializeScrollEffects();
    initializeButtonAnimations();
    createScrollTopButton();
    loadThemePreferences();

    // Load saved videos from localStorage
    loadVideosFromStorage();

    // Initialize video form
    addVideo();
});

console.log('🥤 Coca Cola Website v2.0 loaded successfully!');
console.log('✨ Enhanced with Modern Animations & Toast Notifications');