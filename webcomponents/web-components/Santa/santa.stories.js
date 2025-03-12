import { document } from 'global';

// import component
import './santa';
import mdx from './santa.mdx';

export default {
  title: 'Other/Merry Christmas',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  const component = createElement();
  return component;
};

Default.story = {
  name: 'default',
};

function createElement() {
  const element = document.createElement('omnia-santa');
  return element;
}
