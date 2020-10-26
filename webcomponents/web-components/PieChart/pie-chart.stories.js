import { document, console } from 'global';
import { object } from '@storybook/addon-knobs';
// import component
import './pie-chart';
import mdx from './pie-chart.mdx';

export default {
  title: 'Visualization/Pie Chart',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  const chart = createElement();

  chart.value = object('Value', initialValue);

  return chart;
};

Default.story = {
  name: 'default',
};

function createElement() {
  const element = document.createElement('omnia-pie-chart');

  return element;
}

const initialValue = [
  { serievalue: 'Jan', datavalue: 35 },
  { serievalue: 'Feb', datavalue: 41 },
  { serievalue: 'Mar', datavalue: 12 },
  { serievalue: 'Apr', datavalue: 75 },
  { serievalue: 'May', datavalue: 64 },
];
