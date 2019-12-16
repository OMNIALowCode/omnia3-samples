function getListContainer() {
    const container = document.createElement('div');
    container.className = 'list-group';
    return container;
}

function getLoadMoreAction(onLoadMore) {
    var loadMoreData = document.createElement('a');
    loadMoreData.className = "list-group-item text-center";
    loadMoreData.text = 'Load more';
    loadMoreData.href = "#";
    loadMoreData.onclick = onLoadMore;
    return loadMoreData;
}

function getEmptyMessage() {
    var emptyMessage = document.createElement('span');
    emptyMessage.className = "list-group-item text-center";
    emptyMessage.innerText = 'No records found';
    return emptyMessage;
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
        if (link.onclick) {
            entry.href = '#';
            entry.onclick = link.onclick;
        }
        else {
            entry.target = link.target;
            entry.href = link.address || '#';
        }
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

        if (this._data == null || this._data.length === 0) {
            this._wrapper.appendChild(getEmptyMessage());
            return;
        }

        for (const entry of this._data) {
            this._wrapper.appendChild(
                getListEntry(entry.title, entry.description, entry.badge, entry.link));
        }

        if (this._onLoadMore)
            this._wrapper.appendChild(getLoadMoreAction(this._onLoadMore));
    }

    set value(newValue) {
        this._wrapper.innerHTML = '';
        this._data = newValue;
        this.render();
    }

    get value() {
        return this._data;
    }

    set onLoadMore(callback) {
        this._onLoadMore = callback;
    }
}

customElements.define('omnia-list-view', ListViewElement);