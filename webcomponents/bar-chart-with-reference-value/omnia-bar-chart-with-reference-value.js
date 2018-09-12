
class BarChartWithReferenceValueElement extends HTMLElement {

    constructor() {
        super();
		
		// Using the Chart.js library to draw the charts (https://www.chartjs.org/)
        this.script = document.createElement('script');
        this.script.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js');
        this.script.onload = () => this.render();

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
	
    render() {
        if (typeof Chart === 'function' && Array.isArray(this.chartData)){
			
			// This WebComponent works with the following data structure
			/*
			[
				{ serievalue: 'Serie 1', datavalue: 3},
				{ serievalue: 'Serie 2', datavalue: 4},
				...
			]
			*/
			
			const referenceValue = 50;
            const labels = [];
            const data = [];
			const backgroundColors = [];
			
			for(const entry of this.chartData){
				labels.push(entry.serievalue);
				data.push(entry.datavalue);
				
				backgroundColors.push(entry.datavalue < referenceValue ? 'rgb(54, 162, 235)' : 'rgb(255, 99, 132)');
			}
			
            const config =  {
                type: 'bar',
                data: {
                    labels: labels,
                    responsive: false,
                    datasets: [
                    {
                        label: 'Reference value',
					    data: new Array(data.length).fill(referenceValue),
					    type: 'line'
					},
					{
                        label: '',
                        data: data,
                        backgroundColor: backgroundColors,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: { display: false }
                }
            };
			
			const myChart = new Chart(this.canvas, config);
        }
    }

    set value(newValue) {
        this.chartData = newValue;
        this.render();
    }

}

customElements.define('omnia-bar-chart-with-reference-value', BarChartWithReferenceValueElement);