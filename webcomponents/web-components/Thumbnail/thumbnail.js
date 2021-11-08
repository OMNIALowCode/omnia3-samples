const css = `
    .box {
      display: block;
      width:max-content;
      margin: 10px;
      background-color: white;
      border-radius: 5px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      -webkit-transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      overflow: hidden;
    }

    .box.isInvalid{
      border: 1px solid #E74C3C;
      box-shadow: 1px 1px 1px 1px #E74C3C;
    }

    .avatar-container {
        height: 150px;
        width: 150px;
        position: relative;
        overflow: hidden;
        background-image: url("");
        background-color: white;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .avatar-container.default{
      content:none;
    }

    .avatar-container::after {
      content: '\\f03e';
      font-family: 'FontAwesome';
      position: relative;
      font-size: 4.5em;
      color: #e6e6e6;
      top: calc(50% - 3rem);
      left: calc(50% - 2.25rem);
      z-index: 0;
    }

    .no-after::after{
      display:none;
    }

    .edit-container{
      position: relative;
      height: 50px;
      cursor: pointer;
      overflow: hidden;
      text-align: center;
      -webkit-transition: background-color ease-in-out 150ms;
      transition: background-color ease-in-out 150ms;
    }

    .edit-container label{
      display: -webkit-box; 
      display: -ms-flexbox; 
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      width: 100%;
      height: 100%;
      font-weight: 400;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      overflow: hidden;
      float:left
  }

  .edit-container label::after{
    content: '\\f067';
    font-family: 'FontAwesome';
    position: absolute;
    font-size: 2.5rem;
    color: #e6e6e6;
    left: calc(50% - 1rem);
    z-index: 0;
  }

  .edit-container label.add{
      width: 50%;
  }
  .edit-container label.add::after{
    content: '\\f067';
    left: calc(25% - 1rem);
  }
  .edit-container label.remove{
    display: none;
    width: 50%;
  }
  .edit-container label.remove.on{
    display: flex
  }
  .edit-container label.remove::after{
    content: '\\f1f8';
    left: calc(75% - 1rem);
  }
`;
// Create Elements
function getAvatarContainer(code) {
  const avatarContainer = document.createElement('div');
  avatarContainer.id = `Thumbnail_${code}`;
  avatarContainer.className = 'avatar-container';
  return avatarContainer;
}

function getFeedBackContainer(code) {
  const feedback = document.createElement('div');
  feedback.id = `ThumbnailError_${code}`;
  feedback.className = 'element-input-feedback invalid-feedback';
  return feedback;
}

function getEditContainer(onChange, onClick) {
  const editContainer = document.createElement('div');
  editContainer.className = 'edit-container';

  const addLabel = document.createElement('label');
  addLabel.className = 'btn-primary';
  const uploadImageInput = getUploadImageInput(onChange);
  addLabel.appendChild(uploadImageInput);
  const removeLabel = document.createElement('label');
  removeLabel.className = 'remove btn-danger ';
  const removeImageButton = getFileRemoveButton(onClick);

  removeLabel.appendChild(removeImageButton);
  editContainer.appendChild(addLabel);
  editContainer.appendChild(removeLabel);
  return editContainer;
}

function getUploadImageInput(onChange) {
  const input = document.createElement('input');
  input.id = 'Thumbnail_input';
  input.type = 'file';
  input.style = 'display:none';
  input.multiple = false;
  input.addEventListener('change', onChange);
  return input;
}

function getFileRemoveButton(onClick) {
  const button = document.createElement('button');
  button.type = 'button';
  button.style = 'display:none';
  button.addEventListener('click', onClick);
  return button;
}

function showErrorMessage(message, code) {
  const box = document.querySelector(`#ThumbnailBox_${code}`);
  box.classList.add('isInvalid');
  const label = document.querySelector(`#ThumbnailError_${code}`);
  label.innerText = message;
  label.style = 'display:block';
}

function hideErrorMessage(code) {
  const label = document.querySelector(`#ThumbnailError_${code}`);
  if (label == null) return;
  label.style.dispay = 'display:none';
  label.innerHTML = '';
  const box = document.querySelector(`#ThumbnailBox_${code}`);
  box.classList.remove('isInvalid');
}

class Thumbnail extends HTMLElement {
  constructor() {
    super();

    this.downloadFile = this.downloadFile.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.uploadFile = this.uploadFile.bind(this);

    this._settings = {
      context: null,
      state: null,
      entity: null,
      files: [],
      lastCodeValue: null,
      fileToUpload: null,
      path: null,
      disabled: true,
	  uuid: 0,
    };

    this._container = document.createElement('div');

    this._container.className = 'box';
    const styleElement = document.createElement('style');
    styleElement.innerHTML = css;
    this._container.appendChild(styleElement);
    this._feedbackElement = document.createElement('div');
  }

  connectedCallback() {
    this.appendChild(this._container);
    this.appendChild(this._feedbackElement);
  }

  // setters
  set value(newValue) {
    if (newValue === '' || newValue === this._settings.path) return;
    this._settings.path = newValue;

    this.downloadFile(newValue);
  }

  set rootMetadata(newValue) {
    this._settings.entity = newValue ? newValue.entity : '';
  }

  set context(newValue) {
    if (!newValue) return;

    this._settings.context = newValue;
    this._settings.language = this._settings.context.getLanguageTranslator().language;
	if(this._settings.uuid === 0) this._settings.uuid = this._settings.context.createUUID();
  }

  set state(newValue) {
    this._settings.state = newValue;

    if (this._settings.state == null || this._settings.uuid === 0 || this._settings.lastCodeValue === `${this._settings.state._code}_${this._settings.uuid}`) return;

    this._settings.lastCodeValue = `${this._settings.state._code}_${this._settings.uuid}`;

    var newAvatarContainer = getAvatarContainer(this._settings.lastCodeValue);
    var newFeedBackContainer = getFeedBackContainer(this._settings.lastCodeValue);

    if (this._settings.disabled) {
      this.appendReadonlyElements(newAvatarContainer, newFeedBackContainer);
    } else {
      var currentAvatarContainer = document.querySelector("div[id^='Thumbnail_']");
      var currentFeedbackElement = document.querySelector("div[id^='ThumbnailError_']");
      if (currentAvatarContainer == null || this._settings.state.RefreshElements) {
        this.appendEditElements(newAvatarContainer, newFeedBackContainer);
      } else {
        this.resetElementIdentifiers(currentAvatarContainer, currentFeedbackElement);
      }
    }
  }

  set isReadOnly(newValue) {
    this._settings.disabled = newValue === true;
  }

  //events
  onUpload(e) {
    this._settings.fileToUpload = e.target.files[0];
    this.save();
  }

  onFileRemove() {
    this.deleteFile();
  }

  onAddFile(e) {
    this._settings.fileToUpload = e.target.files[0];
    this.save();
  }

  //Functions
  appendReadonlyElements(newAvatarContainer, newFeedBackContainer) {
    this._container.id = `ThumbnailBox_${this._settings.lastCodeValue}`;
    this._container.appendChild(newAvatarContainer);
    this._feedbackElement.appendChild(newFeedBackContainer);
  }

  appendEditElements(newAvatarContainer, newFeedBackContainer) {
    this._container.id = `ThumbnailBox_${this._settings.lastCodeValue}`;
    this._container.appendChild(newAvatarContainer);
    this._container.appendChild(getEditContainer(this.onUpload.bind(this), this.onFileRemove.bind(this)));
    this._feedbackElement.appendChild(newFeedBackContainer);
  }

  resetElementIdentifiers(currentAvatarContainer, currentFeedbackElement) {
    if (this._settings.path) this.deleteFile();
    currentAvatarContainer.id = `Thumbnail_${this._settings.lastCodeValue}`;
    currentFeedbackElement.id = `ThumbnailError_${this._settings.lastCodeValue}`;
    this._container.id = `ThumbnailBox_${this._settings.lastCodeValue}`;
  }

  save() {
    const code = this._settings.lastCodeValue;
    if (code == null || code.trim() === '') return;
    this.uploadFile(this._settings.fileToUpload);
  }

  downloadFile(file) {
    const fileNameSplit = file.split('/');
    const fileName = fileNameSplit.length > 1 ? fileNameSplit[2] : fileNameSplit[0];
    const originalCode = fileNameSplit.length > 1 ? fileNameSplit[1] : this._settings.lastCodeValue;
    this._settings.entity = fileNameSplit.length > 1 ? fileNameSplit[0] : this._settings.entity;
    const url = `${this.endpoint(originalCode)}/${fileName}`;
    const extension = file.split('.')[1];
    const apiClient = this._settings.context.createApiHttpClient();

    apiClient.doGetFile(url, extension).then(
      response => this.handlerGetFileResponse(response.data),
      response => showErrorMessage(response.message, this._settings.lastCodeValue),
    );
  }

  deleteFile() {
    const file = this._settings.path;
    if (file == null) return;
    const fileNameSplit = file.split('/');
    const fileName = fileNameSplit.length > 1 ? fileNameSplit[2] : fileNameSplit[0];
    const originalCode = fileNameSplit.length > 1 ? fileNameSplit[1] : this._settings.lastCodeValue;
    this._settings.entity = fileNameSplit.length > 1 ? fileNameSplit[0] : this._settings.entity;
    const url = `${this.endpoint(originalCode)}/${fileName}`;
    const apiClient = this._settings.context.createApiHttpClient();
    apiClient
      .doDelete(url)
      .then(this.handlerDeleteResponse(file), response =>
        showErrorMessage(response.message, this._settings.lastCodeValue),
      );
  }

  uploadFile(file) {
    const apiClient = this._settings.context.createApiHttpClient();
    const url = this.endpoint(this._settings.lastCodeValue);
    apiClient.doPostFile(url, file).then(
      response => this.handlerPostFileResponse(file, response),
      response => showErrorMessage(response.message, this._settings.lastCodeValue),
    );
  }

  handlerPostFileResponse(file, response) {
    hideErrorMessage(this._settings.lastCodeValue);
    let newValue = '';
    newValue = `${this._settings.entity}/${this._settings.lastCodeValue}/${file.name}`;
    this.dispatchEvent(new CustomEvent('value-updated', { detail: { value: newValue } }));
  }

  handlerDeleteResponse(file) {
    hideErrorMessage(this._settings.lastCodeValue);
    this._settings.files = this._settings.files.filter(f => f.name !== file);
    const newValue = this._settings.files.map(f => f.name);
    const avatar_container = document.querySelector('.avatar-container');
    avatar_container.style.backgroundImage = '';
    avatar_container.className = 'avatar-container';
    const addLabel = document.querySelector('label.btn-primary');
    if (addLabel != null) addLabel.className = 'btn-primary';
    const removeLabel = document.querySelector('label.remove');
    if (removeLabel != null) removeLabel.className = 'remove btn-danger';
    this.dispatchEvent(new CustomEvent('value-updated', { detail: { value: newValue.join(';') } }));
  }

  handlerGetFileResponse(blob) {
    hideErrorMessage(this._settings.lastCodeValue);
    const container = this._container;
    const reader = new FileReader();
    reader.readAsDataURL(blob);

    const avatar_container = document.querySelector(`#Thumbnail_${this._settings.lastCodeValue}.avatar-container`);
    reader.onload = function(e) {
      avatar_container.style.backgroundImage = `url('${reader.result}')`;
    };

    if (avatar_container) avatar_container.className = 'avatar-container no-after';
    const addLabel = document.querySelector('label.btn-primary');
    if (addLabel) addLabel.className = 'btn-primary add';
    const removeLabel = document.querySelector('label.remove');
    if (removeLabel) removeLabel.className = 'btn-danger remove on';
  }

  endpoint(code) {
    return `/api/v1/${this._settings.context.tenant.code}/${this._settings.context.tenant.environmentCode}/application/${this._settings.entity}/${this._settings.context.operation.dataSource}/${code}/Files`;
  }
}

customElements.define('omnia-thumbnail', Thumbnail);
