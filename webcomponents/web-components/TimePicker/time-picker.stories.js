import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { boolean, text } from '@storybook/addon-knobs';
// import component
import './time-picker';
import readme from './readme.md';

storiesOf('Data Input|Time Picker', module)
    .add('default', () => {
        const textarea = createElement();

        textarea.value = text('Value', '02:59');
        textarea.isReadOnly = boolean('Is read only', false);

        return textarea;
    }, { notes: readme });


function createElement() {
    const element = document.createElement('omnia-time-picker');

    return element;
}