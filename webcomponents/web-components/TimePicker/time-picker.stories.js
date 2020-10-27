import { document, console } from 'global';
import { boolean, text } from '@storybook/addon-knobs';
// import component
import './time-picker';
import mdx from './time-picker.mdx';

export default {
  title: 'Data Input/Time Picker',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  const textarea = createElement();

  textarea.value = text('Value', '02:59');
  textarea.isReadOnly = boolean('Is read only', false);

  return textarea;
};

Default.story = {
  name: 'default',
};

function createElement() {
  const element = document.createElement('omnia-time-picker');

  return element;
}
