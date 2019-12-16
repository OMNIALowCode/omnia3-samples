import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { object } from '@storybook/addon-knobs';

// import component
import './selectbox';
import readme from './readme.md';

storiesOf('Selectbox', module)
    .add('default', () => {
        const component = createElement();
        
      //  component.options = [{ value: "Approve", text: 'Approve' }, { value: "Reject", text: 'Reject' }];

        component.options = object('Value', initialValue);


        return component;

    }, { notes: readme });


function createElement() {
    const element = document.createElement('omnia-select');
    return element;
}

const initialValue = [
    { serievalue: "Approved", text: 'Approved' },
    { serievalue: "Almost", text: 'Almost' },
    { serievalue: "Nearly", text: 'Nearly' },
    { serievalue: "There", text: 'There' },
    { serievalue: "Past", text: 'Past' }
];