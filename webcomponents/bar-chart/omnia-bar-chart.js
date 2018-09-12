
class BarChartElement extends HTMLElement {

    constructor() {
        super();
		
		// Using the Chart.js library to draw the charts (https://www.chartjs.org/)
        this.script = document.createElement('script');
        this.script.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js');
        this.script.onload = () => this.render(this.value);

        this.wrapper = document.createElement('div');
        this.wrapper.style.width = '100%';
        this.wrapper.style.height = '300px';
        this.canvas = document.createElement('canvas');
        this.canvas.width = '500';
        this.canvas.height = '300';
    }
	
	connectedCallback() {
        this.wrapper.appendChild(this.canvas);
        this.appendChild(this.script);
        this.appendChild(this.wrapper);
    }
	
	getColor(index){
        return ["rgb(54, 162, 235)", 
                "rgb(75, 192, 192)",
                "rgb(255, 99, 132)", 
                "rgb(255, 159, 64)", 
                "rgb(255, 205, 86)"
                ][index%5];
    }

    render(newData) {
        if (typeof Chart === 'function' && Array.isArray(newData)){
			
			// This WebComponent works with the following data structure
			/*
			[
				{ serievalue: 'Serie 1', datavalue: 3},
				{ serievalue: 'Serie 2', datavalue: 4},
				...
			]
			*/
			
            const labels = newData.map(entry => entry.serievalue);
            const data = newData.map(entry => entry.datavalue);
			
            const config = {
                type: 'bar',
                data: {
                    labels: labels,
                    responsive: false,
                    datasets: [{
                        label: '',
                        data: data,
                        backgroundColor: data.map((entry, index) => this.getColor(index))
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: { display: false  },
                    scales: {
                        yAxes: [{
                            ticks: { beginAtZero:true }
                        }]
                    }
                }
            };
			
			const myChart = new Chart(this.canvas, config);
        }
    }

    set value(newValue) {
        this.render(newValue);
    }
}

customElements.define('omnia-bar-chart', BarChartElement);