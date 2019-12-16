import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { object, text } from '@storybook/addon-knobs';
// import component
import './list-view';
import readme from './readme.md';

storiesOf('List View', module)
    .add('default', () => {
        const component = createElement();

        component.onLoadMore = () => onLoadMore(component);
        component.value = object('Value', initialValue).slice(0, 2);
        component.loadMoreLabel = text('Label - Load more action');
        component.emptyLabel = text('Label - Empty list');

        return component;

    }, { notes: readme });

function onLoadMore(component) {
    component.onLoadMore = null;
    component.value = [...component.value, ...(object('Value', initialValue).slice(2, 3))];
}


function createElement() {
    const element = document.createElement('omnia-list-view');
    return element;
}

const initialValue = [
    {
        title: '🍕 Anual team meeting',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A arcu cursus vitae congue mauris rhoncus.',
        badge: { text: 'Today', color: 'warning' },
        thumbnail: { address: 'https://avatars0.githubusercontent.com/u/20701566', title: 'OMNIA' }
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