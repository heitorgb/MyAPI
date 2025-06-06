const ctxRecDes = document.getElementById("barChartDepRec").getContext('2d');

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
const data = {
    labels: labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [60, 30, 10, 20, 30, 40, 50, 60, 70],
            borderColor: 'red',
            backgroundColor: 'rgba(255,0,0,0.5)',
        },
        {
            label: 'Dataset 2',
            data: [10, 5, 70, 60, 50, 40, 30, 20, 10],
            borderColor: 'blue',
            backgroundColor: 'rgba(0,0,255,0.5)',
        }
    ]
};

const myBarChart = new Chart(ctxRecDes, {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Chart.js Bar Chart' }
        }
    }
});
