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
`
 // Create Elements
 function  getAvatarContainer(OnClick){
  const avatarContainer = document.createElement("div");
  avatarContainer.className = "avatar-container"
  return avatarContainer;
}

function getEditContainer(onChange,onClick){
  const editContainer = document.createElement("div");
  editContainer.className = "edit-container"
  const addLabel = document.createElement('label')
  addLabel.className = "btn-primary"
  const uploadImageInput = getUploadImageInput(onChange)
  addLabel.appendChild(uploadImageInput);
  const removeLabel = document.createElement('label')
  removeLabel.className = "remove btn-danger ";
  const removeImageButton  = getFileRemoveButton(onClick)
  removeLabel.appendChild(removeImageButton);
  editContainer.appendChild(addLabel);
  editContainer.appendChild(removeLabel);

  return editContainer;
}

function getUploadImageInput(onChange) {

  const input = document.createElement("input")
  input.type = "file";
  input.style =   "display:none";
  input.multiple = false;
  input.addEventListener("change", onChange);
  return input;
}

function getFileRemoveButton(onClick) {

  const button = document.createElement("button");
  button.type = "button";
  button.style =   "display:none";
  button.addEventListener("click",onClick);
  return button;
}

// function showErrorMessage(modal, message) {
//   const label = modal.querySelector('.omnia-file-error-label');
//   label.textContent = message;
//   label.classList.remove('d-none');
// }

// function hideErrorMessage(modal) {
//   const label = modal.querySelector('.omnia-file-error-label');
//   label.classList.add('d-none');
// }

class Thumbnail extends HTMLElement {
    constructor() {
      super();
  
      this.downloadFile = this.downloadFile.bind(this);
      this.handlerResponse = this.handlerResponse.bind(this);
     
  
      this._settings = {
        baseUrl: `${window.location.protocol}//${window.location.host}/api/v1/`,
        context: null,
        state: null,
        entity: null,
        files: [],
        entity: null,
        lastCodeValue: null,
        filesToUpload: [],
        lastpath: null,
        disabled: true,
      };
      
     
      this._container = document.createElement("div");
      this._container.className = "box";
      const styleElement = document.createElement("style");
      styleElement.innerHTML = css;
      this._container.appendChild(styleElement);
      this._container.appendChild(getAvatarContainer());
     
      
    }
  
  
    connectedCallback() {
      this.appendChild(this._container);
    }

    // setters
    set value(newValue) {
      if (newValue === "" || newValue === this._settings.lastpath) return;
        {
          this._settings.lastpath = newValue;
        }
     
      this.downloadFile(newValue);
    }

    set rootMetadata(newValue) {
      this._settings.entity = newValue ? newValue.entity : '';
    }
  
    set context(newValue) {
      if (newValue) {
        this._settings.context = newValue;
        this._settings.language = this._settings.context.getLanguageTranslator().language;   
      }
    }
  
    set state(newValue) {
      this._settings.state = newValue;
      if (this._settings.state != null && this._settings.lastCodeValue !== this._settings.state._code) {
        this._settings.lastCodeValue = this._settings.state._code;
      }
    }

    set isReadOnly(newValue){
      this._settings.disabled = newValue === true;
      if(!this._settings.disabled)
      {
        this._container.appendChild(getEditContainer(this.onUpload.bind(this), this.onFileRemove.bind(this)));
      }
    }

    
    
    //events
    onUpload(e) {
      this._settings.filesToUpload = e.target.files;
      this.save();  
    }

    onFileRemove() {
       this.deleteFile();
    }

    onAddFile(e) {
      this._settings.filesToUpload = e.target.files;
      this.save();
    }
    
    //Functions
    save() {
      const code = this._settings.lastCodeValue;
      if (code == null || code.trim() === '')
          return;
  
      const requests = [];
      for (const file of this._settings.filesToUpload)
          requests.push(this.uploadFile(file));
  
      if (requests.length === 0)
          return;
  
      
  
      Promise.all(requests)
          .then((responses) => {
              const errorMessage = responses
                  .filter(entry => entry.status >= 400)
                  .map(entry => entry.message)
                  .join('. ');
  
              if ((errorMessage || '') !== '') {
                  //showErrorMessage(this._modal, errorMessage);
                  return [];
              } else {
                  //hideErrorMessage(this._modal);
                  return responses;
              }
          })
          .then((responses) => {
              if (responses.length > 0) {
                let newValue = ""; 
                  for (const file of this._settings.filesToUpload) {
                      newValue = `${this._settings.entity}/${this._settings.lastCodeValue}/${file.name}`;
                  }
  
                  this.dispatchEvent(new CustomEvent('value-updated', { detail: { value: newValue } }));
              }
  
              
          });
    }

    //functions
    downloadFile(file) {
      const fileNameSplit = file.split("/");
      const fileName = fileNameSplit.length > 1 ? fileNameSplit[2] : fileNameSplit[0];
      const originalCode = fileNameSplit.length > 1 ? fileNameSplit[1] : this._settings.lastCodeValue;
      this._settings.entity = fileNameSplit.length > 1 ? fileNameSplit[0] : this._settings.entity;
      const url = `${this.endpoint(originalCode)}/${fileName}`;
      const extension = file.split(".")[1];
  
      fetch(url, {
        method: "GET",
  
        headers: new Headers({
          Authorization: "Bearer " + this._settings.context.authentication.token
        })
      })
        .then(response => response.blob())
        .then(blob => this.handlerResponse(blob, extension));
    }

    deleteFile() {
      const file = this._settings.lastpath;
      const fileNameSplit = file.split('/');
      const fileName = fileNameSplit.length > 1 ? fileNameSplit[2] : fileNameSplit[0];
      const originalCode = fileNameSplit.length > 1 ? fileNameSplit[1] : this._settings.lastCodeValue;
      this._settings.entity = fileNameSplit.length > 1 ? fileNameSplit[0] : this._settings.entity;
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
              const avatar_container = document.querySelector(".avatar-container");
              avatar_container.style.backgroundImage = "";
              avatar_container.className = "avatar-container";
              const addLabel = document.querySelector('label.btn-primary');
              addLabel.className = "btn-primary";
              const removeLabel = document.querySelector('label.remove');
              removeLabel.className = "remove btn-danger";
              this.dispatchEvent(new CustomEvent('value-updated', { detail: { value: newValue.join(';') } }));
          });
  }

  
  uploadFile(file) {
      const formData = new FormData();

      if(file && file.name){
        let fileNameSplit = file.name.split('/');
        let fileName = fileNameSplit.length > 1 ? fileNameSplit.pop() : fileNameSplit[0];
        formData.set('file', file, fileName);
      }else{
        formData.set('file', file);
      }

            return fetch(this.endpoint(this._settings.lastCodeValue), {
                    method: 'POST',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + this._settings.context.authentication.token,
                    }),
                    body: formData
                })
                .then(response => ({ status: response.status, message: `${file.name}: ${response.statusText}` }));
        }

      
        handlerResponse(blob, extension) {
          const container = this._container;
          const reader = new FileReader();
          reader.readAsDataURL(blob);
        
          let avatar_container = document.querySelector('.avatar-container');
          reader.onload = function(e) {
            avatar_container.style.backgroundImage = `url('${reader.result}')`;
          };
          avatar_container.className ="avatar-container no-after";
          const addLabel = document.querySelector('label.btn-primary');
          addLabel.className = "btn-primary add";
          const removeLabel = document.querySelector('label.remove');
          removeLabel.className = "btn-danger remove on";
        }
      
        endpoint(code) {
          return `${this._settings.baseUrl}${this._settings.context.tenant.code}/${this._settings.context.tenant.environmentCode}/application/${this._settings.entity}/${this._settings.context.operation.dataSource}/${code}/Files`;
        }
}

  customElements.define("omnia-thumbnail2", Thumbnail);
  