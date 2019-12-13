function getListContainer() {
    const container = document.createElement('div');
    container.className = 'list-group';
    return container;
}

function getEntryTitle(title, badge) {
    const titleContainer = document.createElement('div');
    titleContainer.className = 'd-flex w-100 justify-content-between align-items-center';
    titleContainer.innerHTML =
        `<h5 class="mb-1">${title}</h5>` +
        (badge ? `<span class="badge badge-${badge.color || 'light'}">${badge.text}</span>` : '');
    return titleContainer;
}

function getEntryDescription(description) {
    const descriptionElement = document.createElement('p');
    descriptionElement.className = 'mb-1';
    descriptionElement.innerHTML = description;
    return descriptionElement;
}

function getListEntry(title, description, badge, link) {
    const entry = document.createElement('a');
    entry.className = 'list-group-item list-group-item-action';
    if (link) {
        entry.href = link.address || "#";
        entry.target = link.target;
    }
    entry.appendChild(getEntryTitle(title, badge));
    entry.appendChild(getEntryDescription(description));

    return entry;
}


class ListViewElement extends HTMLElement {

    constructor() {
        super();

        this._data = [];
        this._wrapper = getListContainer();

    }

    connectedCallback() {
        this.appendChild(this._wrapper);
    }

    render() {
        for (const entry of this._data) {
            this._wrapper.appendChild(
                getListEntry(entry.title, entry.description, entry.badge, entry.link));
        }
    }

    set value(newValue) {
        this._data = newValue;
        this.render();
    }
}

customElements.define('omnia-list-view', ListViewElement);