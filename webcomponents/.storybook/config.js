import { configure, addDecorator, addParameters } from '@storybook/html';
import 'bootstrap/dist/css/bootstrap.css';
import { withKnobs } from '@storybook/addon-knobs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

addDecorator(withKnobs);
addParameters({
    options: {
        storySort: (a, b) => a[1].id.localeCompare(b[1].id)
    },
    viewport: {
        viewports: INITIAL_VIEWPORTS,
    },
});

configure(require.context('../web-components', true, /\.stories\.(js|mdx)$/), module);