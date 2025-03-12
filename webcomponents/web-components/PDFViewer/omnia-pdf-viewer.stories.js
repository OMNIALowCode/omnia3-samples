import { text } from '@storybook/addon-knobs';
import { document } from 'global';
import './omnia-pdf-viewer';
import mdx from './omnia-pdf-viewer.mdx';

export default {
  name: 'OMNIAPDFViewerElement',
  title: 'Visualization/PDF Viewer',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  const element = createElement();
  element.value = text(
    'Value',
    'https://uploads.codesandbox.io/uploads/user/ffc61027-3187-4e36-aaf9-d3d2b0e8d39e/qHb8-example.pdf',
  );

  return element;
};

Default.story = {
  name: 'default',
};

function createElement() {
  return document.createElement('omnia-pdf-viewer');
}
