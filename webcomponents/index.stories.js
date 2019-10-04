import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

storiesOf('Introduction', module)
    .addParameters({ info: { disable: true } })
    .add('About', () => {
        return `<h1>OMNIA Platform Web Components</h1>`;
    });