// The component only supports en-us and pt-pt languages
const TRANSLATIONS = {
    default: {
        Button_Label: 'Files',
        Upload_Label: 'Upload files',
        NoFiles_Label: 'No files to display',
    },
    ptpt: {
        Button_Label: 'Ficheiros',
        Upload_Label: 'Carregar ficheiros',
        NoFiles_Label: 'Sem ficheiros para mostrar'
    }
};

function getTranslation(translation, language) {
    const translationSet = language != null ? TRANSLATIONS[language.toLowerCase()] || TRANSLATIONS.default : TRANSLATIONS.default;
    return translationSet ? translationSet[translation] : translation;
}

function guid() {
    const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function getMainContainer() {
    const container = document.createElement('div')
    container.className = 'dropdown';
    return container;
}

function getFileButton() {
    const button = document.createElement('button');
    button.setAttribute('class', 'btn btn-block btn-outline-secondary dropdown-toggle omnia-file-button');
    button.innerHTML = `<span class="omnia-file-button-label">${TRANSLATIONS.default.Button_Label}</span>&nbsp;<span class="omnia-file-counter badge badge-primary">0</span>`;
    return button;
}

function getFileListContainer() {
    const container = document.createElement('div')
    container.className = 'dropdown-menu';
    container.style.width = '100%';
    return container;
}

function getFileInput() {
    const input = document.createElement('input')
    input.type = 'file';
    input.style.display = 'none';
    return input;
}

function getFileOption(file, onClickAction, onRemoveClickAction, disabled) {
    const optiondiv = document.createElement('div')
    optiondiv.className = 'dropdown-item';

    const option = document.createElement('a')
    option.className = 'dropdown nav-item text-dark';
    option.href = 'javascript:void(0)';
    option.addEventListener('click', onClickAction);

    const fileNameSplit = file.name.split('/');
    const fileName = fileNameSplit.length > 1 ? fileNameSplit[1] : fileNameSplit[0];
    option.innerHTML = `<i class="fa fa-fw fa-download"></i>&nbsp;${fileName}`;
    optiondiv.appendChild(option);


    if (disabled !== true) {
        const deleteOption = document.createElement('a')
        deleteOption.className = 'dropdown nav-item float-right btn-outline-danger';
        deleteOption.href = 'javascript:void(0)';
        deleteOption.innerHTML = `<i class="fa fa-fw fa-trash-o"></i>`;
        deleteOption.addEventListener('click', onRemoveClickAction);

        optiondiv.appendChild(deleteOption);
    }


    return optiondiv;
}

function getAddFileOption(onAddAction, language) {
    const option = document.createElement('a')
    option.className = 'dropdown-item omnia-file-add-option';
    option.href = 'javascript:void(0)';
    option.addEventListener('click', onAddAction);
    option.innerHTML = `<i class="fa fa-fw fa-upload"></i>&nbsp;<span class="omnia-file-add-option-label">${getTranslation('Upload_Label', language)}</span>`;
    return option;
}

function getNoFilesLabel(language) {
    const noFilesLabel = document.createElement('h6');
    noFilesLabel.className = 'dropdown-header omnia-file-no-files-label';
    noFilesLabel.textContent = getTranslation('NoFiles_Label', language);
    return noFilesLabel;
}

function getErrorLabel(message) {
    const noFilesLabel = document.createElement('h6');
    noFilesLabel.className = 'dropdown-header text-danger';
    noFilesLabel.textContent = message;
    return noFilesLabel;
}

function getLoadingLabel() {
    const noFilesLabel = document.createElement('h6');
    noFilesLabel.className = 'dropdown-header text-center';
    noFilesLabel.innerHTML = `<i class="fa fa-fw fa-spinner fa-pulse"></i>`;
    return noFilesLabel;
}

function getDivider() {
    const divider = document.createElement('div');
    divider.className = 'dropdown-divider';
    return divider;
}

function renderFiles(container, files, onFileClickAction, onFileRemoveClickAction, onAddAction, errorMessage, language, disabled) {
    const addFileOption = container.querySelector('.omnia-file-add-option');
    container.innerHTML = '';
    if (files.length === 0) {
        if (errorMessage != null && errorMessage !== '') {
            container.appendChild(getErrorLabel(errorMessage));
        } else {
            container.appendChild(getNoFilesLabel(language));
        }
    } else {
        for (const file of files) {
            container.appendChild(getFileOption(file, onFileClickAction(file.name), onFileRemoveClickAction(file.name), disabled));
        }
    }
    if (container.querySelector('.dropdown-divider') == null) {
        container.appendChild(getDivider());
    }
    container.appendChild(addFileOption ? addFileOption : getAddFileOption(onAddAction, language));
}

function renderLoading(container) {
    const addFileOption = container.querySelector('.omnia-file-add-option');
    container.innerHTML = '';
    container.appendChild(getLoadingLabel());
    container.appendChild(addFileOption);
}

function toggleAddFileOption(container, isOptionHidden) {
    const addFileOption = container.querySelector('.omnia-file-add-option');
    if (addFileOption) {
        addFileOption.style.display = isOptionHidden ? 'none' : 'block';
        const divider = container.querySelector('.dropdown-divider');
        if (divider != null) {
            divider.style.display = isOptionHidden ? 'none' : 'block';
        }
    }
}

function updateButtonCounter(button, newCount) {
    const counter = button.querySelector('.omnia-file-counter');
    if (counter) {
        counter.textContent = newCount;
    }
}

function updateTranslations(container, language) {
    const noFilesLabel = container.querySelector('.omnia-file-no-files-label');
    if (noFilesLabel) {
        noFilesLabel.textContent = getTranslation('NoFiles_Label', language);
    }

    const addFileLabel = container.querySelector('.omnia-file-add-option-label');
    if (addFileLabel) {
        addFileLabel.textContent = getTranslation('Upload_Label', language);
    }

    const buttonLabel = container.querySelector('.omnia-file-button-label');
    if (buttonLabel) {
        buttonLabel.textContent = getTranslation('Button_Label', language);
    }
}

class OmniaFileUpload extends HTMLElement {
    constructor() {
        super();

        this._baseUrl = `${window.location.protocol }//${window.location.host}/api/v1/`;
        this.onFileClick = this.onFileClick.bind(this);
        this.onFileRemovalClick = this.onFileRemovalClick.bind(this);

        this._lastCodeValue = null;
        this._context = null;
        this._entity = '';
        this._uploadAddress = null;

        // DOM
        this._container = getMainContainer();
        this._button = getFileButton();
        this._fileListContainer = getFileListContainer();
        this._input = getFileInput();

        // Events
        this._button.addEventListener('click', this.onButtonClick.bind(this));
        this._input.addEventListener('change', this.onInputChange.bind(this));

        // Append elements
        renderFiles(this._fileListContainer, [], null, null, this.onAddOptionClick.bind(this));

        this._container.appendChild(this._button);
        this._container.appendChild(this._fileListContainer);
    }

    connectedCallback() {
        this.appendChild(this._container);
    }

    onButtonClick() {
        this._container.classList.toggle('show');
        this._fileListContainer.classList.toggle('show');
    }

    onAddOptionClick() {
        if (!this._input.disabled)
            this._input.click();
    }

    onInputChange() {
        this.save();
    }

    onFileClick(file) {
        return function() {
            this.downloadFile(file);
        }.bind(this);
    }

    onFileRemovalClick(file) {
        return function() {
            this.deleteFile(file);
        }.bind(this);
    }

    set value(newValue) {
        if (this._isProcessing !== true) {
            const files = newValue != null && newValue !== '' ? newValue.split(';').map(fileName => { return { name: fileName } }) : [];

            const language = this._context ? this._context.getLanguageTranslator().language : '';

            this._files = files;

            renderFiles(this._fileListContainer, files, this.onFileClick, this.onFileRemovalClick, null, this._errorMessage, language, this._input.disabled);
            updateButtonCounter(this._button, files.length);
        }
    }

    set context(newValue) {
        if (newValue) {
            this._context = newValue;
            updateTranslations(this._container, this._context.getLanguageTranslator().language);
        }
    }

    set disabled(newValue) {
        toggleAddFileOption(this._fileListContainer, newValue === true);
        this._input.disabled = newValue === true;
    }

    set isReadOnly(newValue) {
        toggleAddFileOption(this._fileListContainer, newValue === true);
        this._input.disabled = newValue === true;
    }

    set multiple(newValue) {
        this._input.multiple = newValue === true;
    }

    set state(newValue) {
        this._state = newValue;

        if (this._state != null && this._lastCodeValue !== this._state._code) {
            this._lastCodeValue = this._state._code;
            this.save();
        }
    }

    set rootMetadata(newValue) {
        this._entity = newValue ? newValue.entity : '';
    }

    set uploadAddress(newValue) {
        this._uploadAddress = newValue;
    }

    endpoint(code) {
        if (this._uploadAddress != null && this._uploadAddress !== '')
            return `${this._baseUrl}${this._context.tenant.code}/${this._context.tenant.environmentCode}/application/${this._uploadAddress}/Files`;

        return `${this._baseUrl}${this._context.tenant.code}/${this._context.tenant.environmentCode}/application/${this._entity}/${this._context.operation.dataSource}/${code}/Files`;
    }

    downloadFile(file) {
        const fileNameSplit = file.split('/');
        const fileName = fileNameSplit.length > 1 ? fileNameSplit[1] : fileNameSplit[0];
        const originalCode = fileNameSplit.length > 1 ? fileNameSplit[0] : this._lastCodeValue;

        const url = `${this.endpoint(originalCode)}/${fileName}`;

        fetch(url, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + this._context.authentication.token,
                })
            })
            .then(response => response.blob())
            .then(blob => {
                const isIos = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent) && !window.MSStream;

                if (isIos) {
                    const reader = new FileReader();
                    reader.onload = function(e) { window.open(reader.result); };
                    reader.readAsDataURL(blob);
                } else {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = file.replace(/\//g, '_');
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            });
    }

    uploadFile(file) {
        let formData = new FormData();
        formData.set('file', file);

        return fetch(this.endpoint(this._lastCodeValue), {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer ' + this._context.authentication.token,
                }),
                body: formData
            })
            .then(response => {
                return { status: response.status, message: `${file.name}: ${response.statusText}` };
            });
    }

    deleteFile(file) {
        const fileNameSplit = file.split('/');
        const fileName = fileNameSplit.length > 1 ? fileNameSplit[1] : fileNameSplit[0];
        const originalCode = fileNameSplit.length > 1 ? fileNameSplit[0] : this._lastCodeValue;
        const url = `${this.endpoint(originalCode)}/${fileName}`;

        return fetch(url, {
                method: 'DELETE',
                headers: new Headers({
                    'Authorization': 'Bearer ' + this._context.authentication.token,
                })
            })
            .then(response => {
                this._files = this._files.filter(f => f.name !== file);
                const newValue = this._files.map(f => f.name);

                this.dispatchEvent(new CustomEvent('value-updated', { detail: { value: newValue.join(';') } }));
            });
    }

    save() {
        const code = this._lastCodeValue;
        if (code == null || code.trim() === '')
            return;

        const requests = [];
        for (const file of this._input.files)
            requests.push(this.uploadFile(file));

        if (requests.length === 0)
            return;

        this._isProcessing = true;
        renderLoading(this._fileListContainer);

        Promise.all(requests)
            .then((responses) => {
                const errorMessage = responses
                    .filter(entry => entry.status >= 400)
                    .map(entry => entry.message)
                    .join('. ');

                this._errorMessage = errorMessage;
                this._isProcessing = false;

                if (errorMessage != null && errorMessage !== '') {
                    const files = this._input.multiple ? this._files : [];

                    const language = this._context ? this._context.getLanguageTranslator().language : '';
                    renderFiles(this._fileListContainer, files, this.onFileClick, this.onFileRemovalClick, null, this._errorMessage, language, this._input.disabled);

                    return [];
                } else {
                    return responses;
                }
            })
            .then((responses) => {
                if (responses.length > 0) {
                    const newValue = this._input.multiple ? this._files.map(f => f.name) : [];
                    for (const file of this._input.files) {
                        newValue.push(`${this._lastCodeValue}/${file.name}`);
                    }

                    this.dispatchEvent(new CustomEvent('value-updated', { detail: { value: newValue.join(';') } }));
                }
            });
    }
}

customElements.define('omnia-file', OmniaFileUpload);
