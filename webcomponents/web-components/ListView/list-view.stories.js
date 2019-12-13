import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { object } from '@storybook/addon-knobs';
// import component
import './list-view';
import readme from './readme.md';

storiesOf('List View', module)
    .add('default', () => {
        const component = createElement();

        component.value = object('Value', initialValue);

        return component;

    }, { notes: readme });


function createElement() {
    const element = document.createElement('omnia-list-view');
    return element;
}

const initialValue = [
    {
        title: '🍕 Anual team meeting',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A arcu cursus vitae congue mauris rhoncus.',
        badge: { text: 'Today', color: 'warning' }
    },
    {
        title: '🛠 Project kick-off',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        badge: { text: '3 days' }
    },
    {
        title: '📆 Sprint Planning',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        link: {
            address: 'https://www.scrum.org/resources/what-is-sprint-planning',
            target: '_blank'
        }
    }
];