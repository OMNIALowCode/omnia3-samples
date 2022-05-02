import { document, console } from 'global';
import './pdf-viewer';
import mdx from './pdf-viewer.mdx';

export default {
  name: 'PDFViewerElement',
  title: 'Visualization/PDF Viewer',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  const element = createElement();
  element.showPDF("https://uploads.codesandbox.io/uploads/user/ffc61027-3187-4e36-aaf9-d3d2b0e8d39e/qHb8-example.pdf");
  return element;
};

Default.story = {
  name: 'default',
  parameters: { notes: readme },
};

function createElement() {
  return document.createElement('pdf-viewer');
}
