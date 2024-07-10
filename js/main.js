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
const typeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

typeWriter.prototype.type = function() {
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

// Fonction pour l'animation au défilement
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

// Écouteur d'événement pour l'animation au défilement
window.addEventListener('scroll', animateOnScroll);

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

// Création et animation des graphiques
document.addEventListener('DOMContentLoaded', function() {
    const ctxTechnical = document.getElementById('technicalSkillsChart').getContext('2d');
    const technicalSkillsChart = new Chart(ctxTechnical, {
        // ... (configuration du graphique comme précédemment)
    });

    const ctxProgramming = document.getElementById('programmingSkillsChart').getContext('2d');
    const programmingSkillsChart = new Chart(ctxProgramming, {
        // ... (configuration du graphique comme précédemment)
    });

    // Animation des graphiques au chargement de la page
    animateChart(technicalSkillsChart);
    animateChart(programmingSkillsChart);
});

// Ajout de l'interactivité aux sections du CV
document.querySelectorAll('.cv-section').forEach(section => {
    section.addEventListener('click', () => {
        section.classList.toggle('expanded');
    });
});