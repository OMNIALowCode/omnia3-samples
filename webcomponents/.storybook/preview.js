import { withKnobs } from '@storybook/addon-knobs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { setProjectAnnotations } from '@storybook/html';
import 'bootstrap/dist/css/bootstrap.css';

export const decorators = [withKnobs];
export const parameters = {
  options: {
    storySort: (a, b) => a.title.localeCompare(b.title),
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
};

setProjectAnnotations(require.context('../web-components', true, /\.stories\.(js|mdx)$/), module);
export const tags = ['autodocs'];
