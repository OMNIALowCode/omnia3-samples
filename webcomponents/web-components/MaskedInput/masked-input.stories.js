import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { boolean, text } from '@storybook/addon-knobs';
// import component
import './masked-input';
import readme from './readme.md';

storiesOf('Data Input|Masked Input', module)
    .add('default', () => {
        const textarea = createElement();

        textarea.isReadOnly = boolean('Is read only', false);
        textarea.mask = text('Mask', '____-___');

        return textarea;
    }, { notes: readme });


function createElement() {
    const element = document.createElement('omnia-masked-input');

    return element;
}