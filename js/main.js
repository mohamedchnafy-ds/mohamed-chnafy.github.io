// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        document.querySelector('#navbar').style.opacity = 0.9;
    } else {
        document.querySelector('#navbar').style.opacity = 1;
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Typing effect
const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

TypeWriter.prototype.type = function() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if(this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 300;

    if(this.isDeleting) {
        typeSpeed /= 2;
    }

    if(!this.isDeleting && this.txt === fullTxt) {
        typeSpeed = this.wait;
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
}

// Animation au défilement
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animated');
        }
    });
}

// Animation des graphiques
function animateChart(chart) {
    let currentPercentage = 0;
    const intervalId = setInterval(() => {
        currentPercentage += 1;
        chart.data.datasets[0].data = chart.data.datasets[0].data.map(value => Math.min(value, (value / 100) * currentPercentage));
        chart.update();
        if (currentPercentage >= 100) {
            clearInterval(intervalId);
        }
    }, 10);
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Typing effect
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    new TypeWriter(txtElement, words, wait);

    // Scroll animation
    window.addEventListener('scroll', animateOnScroll);

    // Skills charts
    const ctxTechnical = document.getElementById('technicalSkillsChart').getContext('2d');
    const technicalSkillsChart = new Chart(ctxTechnical, {
        type: 'radar',
        data: {
            labels: ['Machine Learning', 'Data Visualization', 'Big Data', 'Statistics', 'Data Mining', 'Deep Learning'],
            datasets: [{
                label: 'Compétences Techniques',
                data: [90, 85, 80, 85, 75, 70],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)'
            }]
        },
        options: {
            responsive: true,
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    const ctxProgramming = document.getElementById('programmingSkillsChart').getContext('2d');
    const programmingSkillsChart = new Chart(ctxProgramming, {
        type: 'radar',
        data: {
            labels: ['Python', 'R', 'SQL', 'JavaScript', 'Java', 'C++'],
            datasets: [{
                label: 'Compétences de Programmation',
                data: [95, 80, 85, 70, 60, 55],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }]
        },
        options: {
            responsive: true,
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Animate charts
    animateChart(technicalSkillsChart);
    animateChart(programmingSkillsChart);

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // CV section interactivity
    document.querySelectorAll('.cv-section').forEach(section => {
        section.addEventListener('click', () => {
            section.classList.toggle('expanded');
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Ici, vous pouvez ajouter le code pour envoyer le formulaire à un service backend
        alert('Merci pour votre message ! Je vous recontacterai bientôt.');
        contactForm.reset();
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});