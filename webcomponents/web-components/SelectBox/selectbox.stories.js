import { document, console } from 'global';
import { object, boolean, text } from '@storybook/addon-knobs';

// import component
import './selectbox';
import mdx from './selectbox.mdx';

export default {
  title: 'Data Input/Select box',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  const component = createElement();

  component.isReadOnly = boolean('Is read only', false);
  component.options = object('Options', initialValue);
  component.value = text('Value', initialValue[2].value);

  return component;
};

Default.story = {
  name: 'default',
};

function createElement() {
  const element = document.createElement('omnia-select');
  return element;
}

const initialValue = [
  { value: 'Approved', text: 'Approved' },
  { value: 'Almost', text: 'Almost' },
  { value: 'Nearly', text: 'Nearly' },
  { value: 'There', text: 'There' },
  { value: 'Past', text: 'Past' },
];
