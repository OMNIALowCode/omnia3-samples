import { document, console } from 'global';
import { object, boolean, text } from '@storybook/addon-knobs';
// import component
import './file-uploader';
import mdx from './file-uploader.mdx';

export default {
  name: 'FileUploader',
  title: 'Data Input/File Uploader',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  const element = createElement();

  element.isReadOnly = boolean('Is read only?', false);
  element.multiple = boolean('Allows multiple files?', false);
  element.value = text('Value', '');

  return element;
};

Default.story = {
  name: 'default',
  parameters: { notes: readme },
};

function createElement() {
  const element = document.createElement('omnia-file');

  return element;
}
