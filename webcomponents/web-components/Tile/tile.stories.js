import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { color } from '@storybook/addon-knobs';
// import component
import './tile';

storiesOf('Tile', module)
    .add('default', () => createElement('95'))
    .add('background color', () => {
        const component = createElement('12');
        component.backgroundColor = color('Background Color', '#13d321');

        return component;
    });


function createElement(value) {
    const element = document.createElement('omnia-tile');
    element.value = value;

    return element;
}