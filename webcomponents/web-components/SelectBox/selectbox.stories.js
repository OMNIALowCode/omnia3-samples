import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { object, boolean, text } from '@storybook/addon-knobs';

// import component
import './selectbox';
import readme from './readme.md';

storiesOf('Select box', module)
    .add('default', () => {
        const component = createElement();

        component.isReadOnly = boolean('Is read only', false);
        component.options = object('Options', initialValue);
        component.value = text('Value', initialValue[2].value);

        return component;

    }, { notes: readme });


function createElement() {
    const element = document.createElement('omnia-select');
    return element;
}

const initialValue = [
    { value: 'Approved', text: 'Approved' },
    { value: 'Almost', text: 'Almost' },
    { value: 'Nearly', text: 'Nearly' },
    { value: 'There', text: 'There' },
    { value: 'Past', text: 'Past' }
];
