document.addEventListener('DOMContentLoaded', () => {

    // Navbar Scroll Effect
    const mainNav = document.getElementById('mainNav');
    if (mainNav) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                mainNav.classList.add('scrolled');
            } else {
                mainNav.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
    }

    // Smooth scroll untuk semua link internal & penyesuaian offset header
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            // Pastikan targetId bukan hanya "#" (untuk back-to-top atau link placeholder lain)
            if (targetId && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    let headerOffset = 0;
                    if (mainNav && mainNav.classList.contains('fixed-top')) {
                        headerOffset = mainNav.offsetHeight;
                    }
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Untuk menutup navbar collapse di mobile setelah diklik
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarToggler && navbarCollapse && navbarCollapse.classList.contains('show')) {
                        if (!navbarToggler.classList.contains('collapsed')) {
                            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                                toggle: false // Hindari toggle ganda jika sudah ditangani Bootstrap
                            });
                            bsCollapse.hide();
                        }
                    }
                }
            }
        });
    });

    // Update Tahun di Footer
    const currentYearElem = document.getElementById('currentYear');
    if (currentYearElem) {
        currentYearElem.textContent = new Date().getFullYear();
    }

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        const toggleBackToTop = () => {
            if (window.scrollY > 100) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        };
        window.addEventListener('load', toggleBackToTop); // Tampilkan/sembunyikan saat load
        document.addEventListener('scroll', toggleBackToTop); // Tampilkan/sembunyikan saat scroll

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah # di URL jika href="#"
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});