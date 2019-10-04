import { configure, addDecorator, addParameters } from '@storybook/html';
import 'bootstrap/dist/css/bootstrap.css';
import centered from '@storybook/addon-centered/html';
import { withKnobs } from '@storybook/addon-knobs';

// automatically import all files ending in *.stories.js
const req = require.context('../web-components', true, /\.stories\.js$/);

function loadStories() {
    require('../index.stories');
    req.keys().forEach(filename => req(filename));
}

addDecorator(centered);
addDecorator(withKnobs);
addParameters({ viewport: {} });

configure(loadStories, module);