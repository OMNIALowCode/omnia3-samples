import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

// import component
import './santa';
import readme from './readme.md';

storiesOf('Data Input|Select box', module)
    .add('default', () => {
        const component = createElement();

     

        return component;

    }, { notes: readme });


function createElement() {
    const element = document.createElement('omnia-santa');
    return element;
}