document.addEventListener('DOMContentLoaded', function() {
    // Graphique des compétences techniques
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

    // Graphique des compétences de programmation
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
});