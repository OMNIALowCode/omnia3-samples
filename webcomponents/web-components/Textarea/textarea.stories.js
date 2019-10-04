import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { boolean, text } from '@storybook/addon-knobs';
// import component
import './textarea';
import readme from './readme.md';

storiesOf('Textarea', module)
    .add('default', () => {
        const component = createElement();

        component.value = text('Value', 'My textarea value');
        component.isReadOnly = boolean('Is read only', false);

        return component;

    }, { notes: readme });


function createElement() {
    const element = document.createElement('omnia-textarea');
    return element;
}