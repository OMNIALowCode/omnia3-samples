[View source code](https://github.com/OMNIALowCode/omnia3-samples/blob/master/webcomponents/web-components/ListView/list-view.js)

Description

### Customization
| Property | Description                     | Default Value |
|----------|---------------------------------|---------------|
| loadMoreLabel | Label to load more action link. | Load more         |
| emptyLabel | Label to display when there's no data in the value attribute. | No records found         |
| value | The values to display in the list view: a collection of objects (example bellow). | []         |

**Example**

[
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
]
