import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { object, number } from '@storybook/addon-knobs';
// import component
import './bar-chart-with-reference-value';
import readme from './readme.md';

storiesOf('Bar Chart with reference value', module)
    .add('default', () => {
        const chart = createElement();

        chart.referenceValue = number('Reference value', 25);
        chart.value = object('Value', initialValue);

        return chart;
    }, { notes: readme });


function createElement() {
    const element = document.createElement('omnia-bar-chart-with-reference-value');

    return element;
}

const initialValue = [
    { serievalue: 'Jan', datavalue: 35 },
    { serievalue: 'Feb', datavalue: 41 },
    { serievalue: 'Mar', datavalue: 12 },
    { serievalue: 'Apr', datavalue: 75 },
    { serievalue: 'May', datavalue: 64 }
];