document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainContent = document.querySelector('main'); // Get main content area

    // Function to close sidebar
    const closeSidebar = () => {
        sidebar.classList.remove('active');
    };

    if (hamburgerMenu && sidebar) {
        hamburgerMenu.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        // Close sidebar when a link is clicked
        document.querySelectorAll('.sidebar a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                // Keep smooth scrolling
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                closeSidebar(); // Close the sidebar after clicking a link
            });
        });

        // Close sidebar when clicking outside of it
        mainContent.addEventListener('click', (e) => {
            if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && !hamburgerMenu.contains(e.target)) {
                closeSidebar();
            }
        });
    }

    // Smooth scrolling for all sidebar links
    document.querySelectorAll('.sidebar a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for active section highlighting
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.sidebar ul li a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // 50% of the section must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLi.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});