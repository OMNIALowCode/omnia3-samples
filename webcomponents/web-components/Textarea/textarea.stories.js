import { document, console } from 'global';
import { boolean, text } from '@storybook/addon-knobs';
// import component
import './textarea';
import mdx from './textarea.mdx';

export default {
  title: 'Data Input/Textarea',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  const component = createElement();

  component.value = text('Value', 'My textarea value');
  component.isReadOnly = boolean('Is read only', false);

  return component;
};

Default.story = {
  name: 'default',
};

function createElement() {
  const element = document.createElement('omnia-textarea');
  return element;
}
