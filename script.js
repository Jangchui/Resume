document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for sidebar links
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