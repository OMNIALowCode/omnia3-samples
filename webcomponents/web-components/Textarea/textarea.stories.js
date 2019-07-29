import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { boolean } from '@storybook/addon-knobs';
// import component
import './textarea';

storiesOf('Textarea', module)
    .add('default', () => createElement(), {
        notes: 'Notes',
    })
    .add('read-only', () => {
        const textarea = createElement();

        textarea.isReadOnly = boolean('Is read only', false);

        return textarea;
    });


function createElement() {
    const element = document.createElement('omnia-textarea');
    element.value = 'Default value';

    return element;
}