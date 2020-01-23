// OMNIA Low-Code Development Platform
// Time Picker Web Component

function isValidTimeValue(input) {
    return /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(input);
}

function getInput() {
    const input = document.createElement('input');
    input.type = 'time';
    input.className = 'form-control';

    return input;
}

class TimePickerElement extends HTMLElement {

    constructor() {
        super();

        this._lastDispatchedValue = null;

        this._container = document.createElement('div');

        this._input = getInput();
        this._input.addEventListener('blur', this.valueUpdated.bind(this));

        this._container.appendChild(this._input);
    }

    connectedCallback() {
        this.appendChild(this._container);
    }

    valueUpdated() {
        if (this._input.value === this._lastDispatchedValue)
            return;

        this.dispatchEvent(new CustomEvent('value-updated', { detail: { value: this._input.value } }));
        this._lastDispatchedValue = this._input.value;
    }

    set value(newValue) {
        if (isValidTimeValue(newValue)) {
            this._input.value = newValue;
        } else {
            this._input.value = '';
        }
    }

    set isReadOnly(newValue) {
        this._input.disabled = newValue === true;
    }

    set isPreviousValue(newValue) {
        this._input.style.textDecoration = newValue === true ? 'line-through' : null;
    }

    set valueHasChanged(newValue) {
        this._input.style.border = newValue === true ? '2px solid #ffe187' : null;
    }
}

customElements.define('omnia-time-picker', TimePickerElement);