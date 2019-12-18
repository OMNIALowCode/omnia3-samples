import { configure, addDecorator, addParameters } from '@storybook/html';
import 'bootstrap/dist/css/bootstrap.css';
import { withKnobs } from '@storybook/addon-knobs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

// automatically import all files ending in *.stories.js
const req = require.context('../web-components', true, /\.stories\.js$/);

function loadStories() {
    require('../index.stories');
    req.keys().forEach(filename => req(filename));
}

addDecorator(withKnobs);
addParameters({
    viewport: {
        viewports: INITIAL_VIEWPORTS,
    },
});

configure(loadStories, module);