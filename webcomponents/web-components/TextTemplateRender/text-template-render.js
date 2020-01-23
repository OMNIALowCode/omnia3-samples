// OMNIA Low-Code Development Platform
// Text Template Render Web Component

// Developer Notes: This component allows you to render text templates and place them in you app.

class TextTemplateRenderElement extends HTMLElement {

    constructor() {
        super();

        this.container = document.createElement('div');

        this._settings = {identifier: null, parameters: null};
        this._context = null;
    }

    connectedCallback() {
        this.appendChild(this.container);
    }

    set identifier(newValue) {
        this._settings.identifier = newValue;
        this.updateTemplate();
    }

    set parameters(newValue) {
        this._settings.parameters = newValue;
        this.updateTemplate();
    }

    set context(newValue) {
        this._context = newValue;
    }

    updateTemplate(){
        if(this._context == null || this._settings.identifier == null)
            return;
            
        const apiClient = this._context.createApiHttpClient();

        apiClient
            .doPost(`/api/v1/${this._context.tenant.code}/${this._context.tenant.environmentCode}/application/TextTemplates/${this._settings.identifier}`, this._settings.parameters || {})
            .then(response => response.data.text())
            .then(text => {
                this.container.innerHTML = text;
            });
    }
}

customElements.define('omnia-text-template-render', TextTemplateRenderElement);