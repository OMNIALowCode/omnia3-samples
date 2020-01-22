function getCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = '500';
    canvas.height = '300';

    return canvas;
}

class LineChartElement extends HTMLElement {

    constructor() {
        super();

        // Using the Chart.js library to draw the charts (https://www.chartjs.org/)
        this.script = document.createElement('script');
        this.script.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js');
        this.script.onload = () => this.render();

        this.wrapper = document.createElement('div');
        this.wrapper.style.width = '100%';
        this.wrapper.style.height = '300px';
    }

    connectedCallback() {
        this.appendChild(this.script);
        this.appendChild(this.wrapper);
    }

    render() {
        if (typeof Chart === 'function' && Array.isArray(this.chartData)) {

            // This WebComponent works with the following data structure
            /*
            [
            	{ serievalue: 'Serie 1', datavalue: 3},
            	{ serievalue: 'Serie 2', datavalue: 4},
            	...
            ]
            */

            const labels = this.chartData.map(entry => entry.serievalue);
            const data = this.chartData.map(entry => entry.datavalue);

            const config = {
                type: 'line', //here's where you control the type of line chart
                data: {
                    labels: labels,
                    datasets: [{
                        label: '',
                        backgroundColor: 'rgb(255, 99, 132)', //here's where you control the background color
                        borderColor: 'rgb(255, 99, 132)', //here's where you control the border color
                        data: data,
                        fill: false,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: { display: false },
                }
            };

            this.wrapper.innerHTML = '';
            const canvas = getCanvas();
            this.wrapper.appendChild(canvas);
            new Chart(canvas, config);
        }
    }

    set value(newValue) {
        this.chartData = newValue;
        this.render();
    }
}

customElements.define('omnia-line-chart', LineChartElement);