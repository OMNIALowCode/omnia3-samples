class TileElement extends HTMLElement {

    constructor() {
        super();
        this.render = this.render.bind(this);

        this._configuration = {
            title: '',
            icon: 'file',
            value: '0',
            iconColor: null,
            textColor: null,
            backgroundColor: null,
            onClick: null,
            isLoading: false,
            loaderColor: null
        };

        this._tile = getTile();

        this.render();
    }

    connectedCallback() {
        this.appendChild(this._tile);
    }

    render() {
        this._tile.innerHTML = '';
        this._tile.appendChild(getTileContent(this._configuration));
    }

    set title(value) {
        this._configuration.title = value;
        this.render();
    }

    set icon(value) {
        this._configuration.icon = value;
        this.render();
    }

    set value(value) {
        this._configuration.value = value;
        this.render();
    }

    set iconColor(value) {
        this._configuration.iconColor = value;
        this.render();
    }

    set textColor(value) {
        this._configuration.textColor = value;
        this.render();
    }

    set backgroundColor(value) {
        this._configuration.backgroundColor = value;
        this.render();
    }

    set onClick(action) {
        this._configuration.onClick = action;
        this.render();
    }

    set isLoading(value) {
        this._configuration.isLoading = value === true;
        this.render();
    }

    set loaderColor(value) {
        this._configuration.loaderColor = value;
        this.render();
    }
}

function getTile() {
    const card = document.createElement('div');
    card.className = 'card';

    return card;
}

function getTileContent(configuration) {
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body p-3';

    const row = document.createElement('div');
    row.className = 'row';

    if (configuration.isLoading === true) {
        const container = document.createElement('div');
        container.appendChild(getLoader(configuration.loaderColor === null ? configuration.iconColor : configuration.loaderColor));
        container.className = 'col-12 text-center';

        row.appendChild(container);
        cardBody.appendChild(row);
        return cardBody;
    }

    if ((configuration.backgroundColor || '') !== '')
        cardBody.style.backgroundColor = configuration.backgroundColor;

    if ((configuration.textColor || '') !== '')
        cardBody.style.textColor = configuration.textColor;

    cardBody.onclick = configuration.onClick;
    cardBody.style.cursor = configuration.onClick ? 'pointer' : 'auto';

    const left = document.createElement('div');
    left.appendChild(getTileMainIcon(configuration.icon, configuration.iconColor));
    left.className = 'col-4';

    const right = document.createElement('div');
    right.appendChild(getTileMainContent(configuration.title, configuration.value, configuration.textColor));
    right.className = 'col-8';

    row.appendChild(left);
    row.appendChild(right);
    cardBody.appendChild(row);

    return cardBody;
}

function getLoader(color) {
    const icon = document.createElement('i');
    icon.className = `fa fa-fw fa-3x fa-spin fa-circle-o-notch`;
    icon.style.color = color || 'black';

    return icon;
}

function getTileMainIcon(iconValue, color) {
    const icon = document.createElement('i');
    icon.className = `fa fa-fw fa-3x fa-${iconValue}`;
    icon.style.color = color || 'black';

    return icon;
}

function getTileMainContent(title, value, textColor) {
    const mainContent = document.createElement('div');
    mainContent.className = 'text-right';

    const titleContainer = document.createElement('p');
    titleContainer.className = 'font-weight-light m-0';
    titleContainer.textContent = title;

    const valueContainer = document.createElement('p');
    valueContainer.className = 'h4 m-0';
    valueContainer.textContent = value;

    if ((textColor || '') !== '') {
        titleContainer.style.color = textColor;
        valueContainer.style.color = textColor;
    }

    mainContent.appendChild(titleContainer);
    mainContent.appendChild(valueContainer);

    return mainContent;
}

customElements.define('omnia-tile', TileElement);