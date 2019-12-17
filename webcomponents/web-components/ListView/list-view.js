const defaultEmptyMessage = 'No records found';
const defaultLoadMoreLabel = 'Load more';

function getLoader() {
    const icon = document.createElement('i');
    icon.className = `fa fa-fw fa-3x fa-spin fa-circle-o-notch`;
    icon.style.color = 'var(--primary)';

    var loaderContainer = document.createElement('div');
    loaderContainer.className = 'list-group-item text-center';
    loaderContainer.appendChild(icon);

    return loaderContainer;
}

function getListContainer() {
    const container = document.createElement('div');
    container.className = 'list-group';
    return container;
}

function getLoadMoreAction(onLoadMore, label) {
    var loadMoreData = document.createElement('a');
    loadMoreData.className = 'list-group-item text-center';
    loadMoreData.text = label || defaultLoadMoreLabel;
    loadMoreData.href = '#';
    loadMoreData.onclick = onLoadMore;
    return loadMoreData;
}

function getEmptyMessage(label) {
    var emptyMessage = document.createElement('span');
    emptyMessage.className = 'list-group-item text-center';
    emptyMessage.innerText = label || defaultEmptyMessage;
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
    descriptionElement.className = 'mb-1 d-flex justify-content-between align-items-center';
    descriptionElement.innerHTML = description;
    return descriptionElement;
}

function getEntryContent(title, badge, description) {
    const content = document.createElement('div');
    content.className = 'list-group-item-action flex-column align-items-start';

    content.appendChild(getEntryTitle(title, badge));
    content.appendChild(getEntryDescription(description));

    return content;
}

function getListEntry(title, description, badge, link, thumbnail) {
    const entry = document.createElement('a');
    entry.className = 'list-group-item list-group-item-action d-flex ';
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


    if (thumbnail) {
        const thumbnailElement = document.createElement('img');
        thumbnailElement.className = 'mr-4';
        thumbnailElement.style = 'max-width: 50px';
        thumbnailElement.src = thumbnail.address;
        thumbnailElement.alt = thumbnail.title;
        entry.appendChild(thumbnailElement);
    }


    entry.appendChild(getEntryContent(title, badge, description));

    return entry;
}

class ListViewElement extends HTMLElement {

    constructor() {
        super();

        this._isLoading = true;
        this._data = [];
        this._wrapper = getListContainer();
    }

    connectedCallback() {
        this.appendChild(this._wrapper);
    }

    render() {
        this._wrapper.innerHTML = '';

        if (!this._isLoading && (this._data == null || this._data.length === 0)) {
            this._wrapper.appendChild(getEmptyMessage(this._defaultEmptyMessage));
            return;
        }


        for (const entry of this._data) {
            this._wrapper.appendChild(
                getListEntry(entry.title, entry.description, entry.badge, entry.link, entry.thumbnail));
        }


        if (this._isLoading === true) {
            this._wrapper.appendChild(getLoader());
            return;
        }

        if (this._onLoadMore)
            this._wrapper.appendChild(getLoadMoreAction(
                () => {
                    this._isLoading = true;
                    this.render();
                    this._onLoadMore();
                }
                , this._loadMoreLabel));



    }

    set value(newValue) {
        this._data = newValue;
        this._isLoading = false;
        this.render();
    }

    get value() {
        return this._data;
    }

    set onLoadMore(callback) {
        this._onLoadMore = callback;
        this.render();
    }

    set emptyLabel(newValue) {
        this._defaultEmptyMessage = newValue;
        this.render();
    }

    set loadMoreLabel(newValue) {
        this._loadMoreLabel = newValue;
        this.render();
    }
}

customElements.define('omnia-list-view', ListViewElement);