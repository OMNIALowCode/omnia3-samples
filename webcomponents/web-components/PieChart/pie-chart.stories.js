import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { object } from '@storybook/addon-knobs';
// import component
import './pie-chart';
import readme from './readme.md';

storiesOf('Visualization|Pie Chart', module)
    .add('default', () => {
        const chart = createElement();

        chart.value = object('Value', initialValue);

        return chart;
    }, { notes: readme });


function createElement() {
    const element = document.createElement('omnia-pie-chart');

    return element;
}

const initialValue = [
    { serievalue: 'Jan', datavalue: 35 },
    { serievalue: 'Feb', datavalue: 41 },
    { serievalue: 'Mar', datavalue: 12 },
    { serievalue: 'Apr', datavalue: 75 },
    { serievalue: 'May', datavalue: 64 }
];