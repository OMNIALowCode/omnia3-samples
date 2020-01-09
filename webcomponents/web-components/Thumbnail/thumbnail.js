class Thumbnail extends HTMLElement {
    constructor() {
      super();
  
      this.downloadFile = this.downloadFile.bind(this);
      this.handlerResponse = this.handlerResponse.bind(this);
  
      this._settings = {
        baseUrl: `${window.location.protocol}//${window.location.host}/api/v1/`,
        context: null,
        state: null,
        lastCodeValue: null,
        entity: null
      };
  
      this._container = document.createElement("img");
      this._container.className = "rounded img-fluid img-circle";
    }
  
    connectedCallback() {
      this.appendChild(this._container);
    }
  
    set value(newValue) {
      if (newValue === "") return;
  
      this.downloadFile(newValue);
    }
  
    // setters
    set context(newValue) {
      if (newValue) {
        this._settings.context = newValue;
        this._settings.language = this._settings.context.getLanguageTranslator().language;
      }
    }
  
    set state(newValue) {
      this._settings.state = newValue;
  
      if (
        this._settings.state != null &&
        this._settings.lastCodeValue !== this._settings.state._code
      ) {
        this._settings.lastCodeValue = this._settings.state._code;
      }
    }
  
    set rootMetadata(newValue) {
      this._settings.entity = newValue ? newValue.entity : "";
    }
  
    //functions
    downloadFile(file) {
      const fileNameSplit = file.split("/");
      const fileName =
        fileNameSplit.length > 1 ? fileNameSplit[1] : fileNameSplit[0];
      const originalCode =
        fileNameSplit.length > 1
          ? fileNameSplit[0]
          : this._settings.lastCodeValue;
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
  
    handlerResponse(blob, extension) {
      const container = this._container;
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      var base64data;
      reader.onload = function(e) {
        base64data = reader.result;
        console.log(base64data);
        container.setAttribute(
          "src",
          `data:image/${extension};base64 ${base64data}`
        );
      };
    }
  
    endpoint(code) {
      return `${this._settings.baseUrl}${this._settings.context.tenant.code}/${this._settings.context.tenant.environmentCode}/application/${this._settings.entity}/${this._settings.context.operation.dataSource}/${code}/Files`;
    }
  }
  
  customElements.define("omnia-thumbnail", Thumbnail);
  