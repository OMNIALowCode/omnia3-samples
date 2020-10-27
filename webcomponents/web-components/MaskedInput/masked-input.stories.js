import { document, console } from 'global';
import { boolean, text } from '@storybook/addon-knobs';
// import component
import './masked-input';
import mdx from './masked-input.mdx';

export default {
  title: 'Data Input/Masked Input',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  const textarea = createElement();

  textarea.isReadOnly = boolean('Is read only', false);
  textarea.mask = text('Mask', '____-___');

  return textarea;
};

Default.story = {
  name: 'default',
};

function createElement() {
  const element = document.createElement('omnia-masked-input');

  return element;
}
