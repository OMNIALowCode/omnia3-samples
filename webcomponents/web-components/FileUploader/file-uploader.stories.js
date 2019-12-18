import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { object, boolean, text } from '@storybook/addon-knobs';
// import component
import './file-uploader';
import readme from './readme.md';

storiesOf('Data Input|File Uploader', module)
    .add('default', () => {
        const element = createElement();

        element.isReadOnly = boolean('Is read only?', false);
        element.multiple = boolean('Allows multiple files?', false);
        element.value = text('Value', '');

        return element;
    }, { notes: readme });


function createElement() {
    const element = document.createElement('omnia-file');

    return element;
}