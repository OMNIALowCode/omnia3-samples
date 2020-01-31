// OMNIA Low-Code Development Platform
// Text Area Web Component

class TextareaElement extends HTMLElement {

    constructor() {
        super();

        this.textarea = document.createElement('textarea');
        this.textarea.setAttribute('class', 'form-control');

        this.textarea.onchange = this.valueUpdated.bind(this);
    }

    connectedCallback() {
        this.appendChild(this.textarea);
    }

    valueUpdated(event) {
        // When the onChange event is fired, dispatch a new event 'value-updated' to notify the OMNIA Platform that the values has been updated
        this.dispatchEvent(new CustomEvent('value-updated', {
            detail: {
                value: event.target.value
            }
        }));
    }

    set value(newValue) {
        this.textarea.value = newValue;
    }

    set isReadOnly(newValue) {
        this.textarea.disabled = (newValue === true);
    }

    set isPreviousValue(newValue) {
        this.textarea.style.textDecoration = newValue === true ? 'line-through' : null;
    }

    set valueHasChanged(newValue) {
        this.textarea.style.border = newValue === true ? '2px solid #ffe187' : null;
    }
}

customElements.define('omnia-textarea', TextareaElement);