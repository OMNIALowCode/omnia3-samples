import { document, console } from 'global';
import { object, number } from '@storybook/addon-knobs';
// import component
import './bar-chart-with-reference-value';
import mdx from './bar-chart-with-reference-value.mdx';

export default {
  title: 'Visualization/Bar Chart with reference value',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  const chart = createElement();

  chart.referenceValue = number('Reference value', 25);
  chart.value = object('Value', initialValue);

  return chart;
};

Default.story = {
  name: 'default',
};

function createElement() {
  const element = document.createElement('omnia-bar-chart-with-reference-value');

  return element;
}

const initialValue = [
  { serievalue: 'Jan', datavalue: 35 },
  { serievalue: 'Feb', datavalue: 41 },
  { serievalue: 'Mar', datavalue: 12 },
  { serievalue: 'Apr', datavalue: 75 },
  { serievalue: 'May', datavalue: 64 },
];
