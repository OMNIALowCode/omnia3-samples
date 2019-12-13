const TRANSLATIONS = {
    default: {
        Button_Label: 'Files',
        Upload_Label: 'Select file(s)',
        NoFiles_Label: 'No files to display',
        Modal_Title_Label: 'Files',
        Modal_Close_Label: 'Close'
    },
    ptpt: {
        Button_Label: 'Ficheiros',
        Upload_Label: 'Selecionar ficheiro(s)',
        NoFiles_Label: 'Sem ficheiros para mostrar',
        Modal_Title_Label: 'Ficheiros',
        Modal_Close_Label: 'Fechar'
    }
};


function getButton(onClick) {
    const button = document.createElement('button');
    button.setAttribute('class', 'btn btn-block btn-outline-secondary omnia-file-button');
    button.innerHTML = `<span class="omnia-file-button-label">${TRANSLATIONS.default.Button_Label}</span>&nbsp;<span class="omnia-file-counter badge badge-primary">0</span>`;

    button.addEventListener('click', onClick);

    return button;
}

function getModalBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade show';

    return backdrop;
}

function getModal(settings, onClose, onDownload, onRemove, onAdd) {
    const modal = document.createElement('div');
    modal.className = 'modal fade show d-block';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('role', 'dialog');

    const modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog';
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    modalContent.appendChild(getModalHeader(settings.language));
    modalContent.appendChild(getModalBody(settings.files, settings.language, settings.disabled, settings.multiple, onDownload, onRemove, onAdd));
    modalContent.appendChild(getModalFooter(settings.language, onClose));

    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    return modal;
}

function getModalHeader(language) {
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';

    const header = document.createElement('h5');
    header.className = 'modal-title';
    header.innerText = getTranslation('Modal_Title_Label', language);

    modalHeader.appendChild(header);

    return modalHeader;
}

function getModalBody(files, language, disabled, multiple, onDownload, onRemove, onAdd) {
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';

    modalBody.appendChild(getNoFilesLabel(language, files.length === 0));

    const list = getModalFileList();
    modalBody.appendChild(list);

    if (files.length > 0) {
        for (const file of files) {
            list.appendChild(getFileListEntry(file, disabled, onDownload, onRemove));
        }
    }

    if (disabled === false) {
        const fileInput = getFileInput(multiple, onAdd);
        modalBody.appendChild(fileInput);
        modalBody.appendChild(getFileUploadButton(language, fileInput));
    }

    modalBody.appendChild(getErrorLabel());

    return modalBody;
}

function getModalFileList() {
    const list = document.createElement('ul');
    list.className = 'list-group list-group-flush omnia-file-list';

    return list;
}

function updateFileList(modal, files, disabled, onDownload, onRemove) {
    let list = modal.querySelector('.omnia-file-list');
    list.innerHTML = '';

    for (const file of files) {
        list.appendChild(getFileListEntry(file, disabled, onDownload, onRemove));
    }

    const noFilesLabel = modal.querySelector('.omnia-file-no-files-label');
    if (files.length === 0)
        noFilesLabel.classList.remove('d-none');
    else
        noFilesLabel.classList.add('d-none');
}

function getFileListEntry(file, disabled, onDownload, onRemove) {
    const listEntry = document.createElement('li');
    listEntry.className = 'list-group-item d-flex justify-content-between align-items-center p-0 pt-1 pb-1';

    const downloadFileButton = document.createElement('button');
    downloadFileButton.innerText = file.name;
    downloadFileButton.title = file.name;
    downloadFileButton.className = 'btn btn-link text-truncate';
    downloadFileButton.addEventListener('click', onDownload(file.name));

    listEntry.appendChild(downloadFileButton);

    if (disabled === false) {
        const removeFileButton = document.createElement('button');
        removeFileButton.innerHTML = '<i class="fa fa-trash"></i>';
        removeFileButton.className = 'btn btn-outline-danger pull-rigth';
        removeFileButton.addEventListener('click', onRemove(file.name));

        listEntry.appendChild(removeFileButton);
    }

    return listEntry;
}

function getNoFilesLabel(language, visible) {
    const noFilesLabel = document.createElement('h6');
    noFilesLabel.className = 'omnia-file-no-files-label text-center';
    if (!visible)
        noFilesLabel.classList.add('d-none');
    noFilesLabel.textContent = getTranslation('NoFiles_Label', language);
    return noFilesLabel;
}

function getErrorLabel() {
    const errorLabel = document.createElement('h6');
    errorLabel.className = 'omnia-file-error-label text-center text-danger d-none pt-2';
    return errorLabel;
}

function getFileUploadButton(language, fileInput) {
    const button = document.createElement('button');
    button.className = 'btn btn-primary btn-block omnia-file-selector-btn pt-2';
    button.innerHTML = getTranslation('Upload_Label', language) + '&nbsp<i class="fa fa-fw fa-spinner fa-pulse d-none"></i>';
    button.addEventListener('click', () => fileInput.click());
    return button;
}

function getFileInput(multiple, onChange) {
    const input = document.createElement('input')
    input.type = 'file';
    input.multiple = multiple === true;
    input.style.display = 'none';
    input.addEventListener('change', onChange);

    return input;
}

function getModalFooter(language, onClose) {
    const modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';

    const closeButton = document.createElement('button');
    closeButton.className = 'btn btn-outline-secondary';
    closeButton.addEventListener('click', onClose);
    closeButton.innerHTML = getTranslation('Modal_Close_Label', language);

    modalFooter.appendChild(closeButton);

    return modalFooter;
}

function updateButtonCounter(button, newCount) {
    const counter = button.querySelector('.omnia-file-counter');
    if (counter) {
        counter.textContent = newCount;
    }
}

function updateTranslations(button, language) {
    const buttonLabel = button.querySelector('.omnia-file-button-label');
    if (buttonLabel) {
        buttonLabel.textContent = getTranslation('Button_Label', language);
    }
}

function getTranslation(translation, language) {
    const translationSet = language != null ? TRANSLATIONS[language.toLowerCase()] || TRANSLATIONS.default : TRANSLATIONS.default;
    return translationSet ? translationSet[translation] : translation;
}

function toggleLoading(modal) {
    const button = modal.querySelector('.omnia-file-selector-btn');
    button.disabled = !button.disabled;
    button.querySelector('i').classList.toggle("d-none");
}

function showErrorMessage(modal, message) {
    const label = modal.querySelector('.omnia-file-error-label');
    label.textContent = message;
    label.classList.remove('d-none');
}

function hideErrorMessage(modal) {
    const label = modal.querySelector('.omnia-file-error-label');
    label.classList.add('d-none');
}

class OmniaFileUpload extends HTMLElement {
    constructor() {
        super();

        this._settings = {
            baseUrl: `${window.location.protocol}//${window.location.host}/api/v1/`,
            context: null,
            files: [],
            multiple: false,
            entity: null,
            uploadAddress: null,
            disabled: false,
            lastCodeValue: null,
            state: null,
            filesToUpload: [],
        };

        this.onModalClose = this.onModalClose.bind(this);
        this.onFileDownload = this.onFileDownload.bind(this);
        this.onFileRemove = this.onFileRemove.bind(this);
        this.onAddFile = this.onAddFile.bind(this);

        // DOM
        this._button = getButton(this.onButtonClick.bind(this));
        this._modal = null;
        this._modalBackdrop = null;
    }

    connectedCallback() {
        this.appendChild(this._button);
    }

    disconnectedCallback() {
        if (this._modalBackdrop && document.body.contains(this._modalBackdrop))
            document.body.removeChild(this._modalBackdrop);

        if (this._modal && this.contains(this._modal))
            this.removeChild(this._modal);
    }

    onButtonClick() {
        if (this._modalBackdrop && document.body.contains(this._modalBackdrop))
            document.body.removeChild(this._modalBackdrop);

        if (this._modal && this.contains(this._modal))
            this.removeChild(this._modal);

        this._modalBackdrop = getModalBackdrop();
        this._modal = getModal(this._settings, this.onModalClose, this.onFileDownload, this.onFileRemove, this.onAddFile);

        document.body.appendChild(this._modalBackdrop);
        this.appendChild(this._modal);
    }

    onModalClose() {
        this.removeChild(this._modal);
        document.body.removeChild(this._modalBackdrop);

        this._modalBackdrop = null;
        this._modal = null;
    }

    onFileDownload(file) {
        return () => this.downloadFile(file);
    }

    onFileRemove(file) {
        return () => this.deleteFile(file);
    }

    onAddFile(e) {
        this._settings.filesToUpload = e.target.files;
        this.save();
    }






    downloadFile(file) {
        const fileNameSplit = file.split('/');
        const fileName = fileNameSplit.length > 1 ? fileNameSplit[1] : fileNameSplit[0];
        const originalCode = fileNameSplit.length > 1 ? fileNameSplit[0] : this._settings.lastCodeValue;

        const url = `${this.endpoint(originalCode)}/${fileName}`;

        fetch(url, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + this._settings.context.authentication.token,
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


    deleteFile(file) {
        const fileNameSplit = file.split('/');
        const fileName = fileNameSplit.length > 1 ? fileNameSplit[1] : fileNameSplit[0];
        const originalCode = fileNameSplit.length > 1 ? fileNameSplit[0] : this._settings.lastCodeValue;
        const url = `${this.endpoint(originalCode)}/${fileName}`;

        return fetch(url, {
                method: 'DELETE',
                headers: new Headers({
                    'Authorization': 'Bearer ' + this._settings.context.authentication.token,
                })
            })
            .then(response => {
                this._settings.files = this._settings.files.filter(f => f.name !== file);
                const newValue = this._settings.files.map(f => f.name);

                this.dispatchEvent(new CustomEvent('value-updated', { detail: { value: newValue.join(';') } }));
            });
    }


    save() {
        const code = this._settings.lastCodeValue;
        if (code == null || code.trim() === '')
            return;

        const requests = [];
        for (const file of this._settings.filesToUpload)
            requests.push(this.uploadFile(file));

        if (requests.length === 0)
            return;

        toggleLoading(this._modal);

        Promise.all(requests)
            .then((responses) => {
                const errorMessage = responses
                    .filter(entry => entry.status >= 400)
                    .map(entry => entry.message)
                    .join('. ');

                if ((errorMessage || '') !== '') {
                    showErrorMessage(this._modal, errorMessage);
                    return [];
                } else {
                    hideErrorMessage(this._modal);
                    return responses;
                }
            })
            .then((responses) => {
                if (responses.length > 0) {
                    const newValue = this._settings.multiple ? this._settings.files.map(f => f.name) : [];
                    for (const file of this._settings.filesToUpload) {
                        newValue.push(`${this._settings.lastCodeValue}/${file.name}`);
                    }

                    this.dispatchEvent(new CustomEvent('value-updated', { detail: { value: newValue.join(';') } }));
                }

                toggleLoading(this._modal);
            });
    }

    uploadFile(file) {
        const formData = new FormData();
        formData.set('file', file);

        return fetch(this.endpoint(this._settings.lastCodeValue), {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer ' + this._settings.context.authentication.token,
                }),
                body: formData
            })
            .then(response => ({ status: response.status, message: `${file.name}: ${response.statusText}` }));
    }

    endpoint(code) {
        if (this._settings.uploadAddress != null && this._settings.uploadAddress !== '')
            return `${this._settings.baseUrl}${this._settings.context.tenant.code}/${this._settings.context.tenant.environmentCode}/application/${this._settings.uploadAddress}/Files`;

        return `${this._settings.baseUrl}${this._settings.context.tenant.code}/${this._settings.context.tenant.environmentCode}/application/${this._settings.entity}/${this._settings.context.operation.dataSource}/${code}/Files`;
    }



    // setters
    set context(newValue) {
        if (newValue) {
            this._settings.context = newValue;
            this._settings.language = this._settings.context.getLanguageTranslator().language;

            updateTranslations(this._button, this._settings.language);
        }
    }

    set disabled(newValue) {
        this._settings.disabled = newValue === true;
    }

    set isReadOnly(newValue) {
        this._settings.disabled = newValue === true;
    }

    set multiple(newValue) {
        this._settings.multiple = newValue === true;
    }

    set rootMetadata(newValue) {
        this._settings.entity = newValue ? newValue.entity : '';
    }

    set state(newValue) {
        this._settings.state = newValue;
		
		if(!this._settings.state._code)
			this._button.disabled = true;
		else
			this._button.disabled = false;
			
        if (this._settings.state != null && this._settings.lastCodeValue !== this._settings.state._code) {
            this._settings.lastCodeValue = this._settings.state._code;
            this.save();
        }
    }

    set uploadAddress(newValue) {
        this._settings.uploadAddress = newValue;
    }

    set value(newValue) {
        this._settings.files = newValue != null && newValue !== '' ? newValue.split(';').map(fileName => { return { name: fileName } }) : [];
        updateButtonCounter(this._button, this._settings.files.length);
        if (this._modal)
            updateFileList(this._modal, this._settings.files, this._settings.disabled, this.onFileDownload, this.onFileRemove);
    }

}

customElements.define('omnia-file', OmniaFileUpload);