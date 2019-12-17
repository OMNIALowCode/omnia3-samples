function setUpMaskToInput(el) {
    const pattern = el.getAttribute('placeholder'),
        slots = new Set('_'),
        prev = (j => Array.from(pattern, (c, i) => slots.has(c) ? j = i + 1 : j))(0),
        first = [...pattern].findIndex(c => slots.has(c)),
        accept = new RegExp('\\w', 'g'),
        clean = input => {
            input = input.match(accept) || [];
            return Array.from(pattern, c =>
                input[0] === c || slots.has(c) ? input.shift() || c : c
            );
        },
        format = () => {
            const [i, j] = [el.selectionStart, el.selectionEnd].map(i => {
                i = clean(el.value.slice(0, i)).findIndex(c => slots.has(c));
                return i < 0 ? prev[prev.length - 1] : back ? prev[i - 1] || first : i;
            });
            el.value = clean(el.value).join('');
            el.setSelectionRange(i, j);
            back = false;
        };

    let back = false;
    el.addEventListener('keydown', (e) => back = e.key === 'Backspace');
    el.addEventListener('input', format);
    el.addEventListener('focus', format);
    el.addEventListener('blur', () => {
        if (el.value === pattern) {
            el.value = '';
            el.onchange({ target: { value: el.value } });
        }
    });
}

function cleanInputValidation(input, messageContainer) {
    input.classList.remove('is-invalid');
    messageContainer.innerText = '';
}

function showInputAsInvalid(input, messageContainer) {
    input.classList.add('is-invalid');
    messageContainer.innerText = 'Invalid value';
}


class MaskedInputElement extends HTMLElement {

    constructor() {
        super();

        this._wrapper = document.createElement('div');

        this._input = document.createElement('input');
        this._input.type = 'text';
        this._input.className = 'form-control col';
        this._input.onchange = this.valueUpdated.bind(this);

        this._feedback = document.createElement('div');
        this._feedback.className = 'invalid-feedback';

        this._validator = null;
    }

    connectedCallback() {
        this._wrapper.appendChild(this._input);
        this._wrapper.appendChild(this._feedback);
        this.appendChild(this._wrapper);
    }

    validate(value) {
        try {
            if (typeof this._validator === 'function')
                return this._validator(value) === true;

            return this._validator.test(value);
        } catch (e) {
            return false;
        }
    }

    valueUpdated(event) {
        const value = String(event.target.value);

        cleanInputValidation(this._input, this._feedback);
        if (String(value || '') !== '' && !this.validate(value)) {
            showInputAsInvalid(this._input, this._feedback);
        }

        // When the onChange event is fired, dispatch a new event 'value-updated' to notify the OMNIA Platform that the values has been updated
        this.dispatchEvent(new CustomEvent('value-updated', { detail: { value: value } }));
    }


    set value(newValue) {
        this._input.value = newValue;
    }

    set isReadOnly(newValue) {
        this._input.disabled = (newValue === true);
    }

    set mask(newValue) {
        this._input.placeholder = newValue || '';
        setUpMaskToInput(this._input);
    }

    set validator(newValue) {
        this._validator = newValue;
    }

    set isPreviousValue(newValue) {
        this._input.style.textDecoration = newValue === true ? 'line-through' : null;
    }

    set valueHasChanged(newValue) {
        this._input.style.border = newValue === true ? '2px solid #ffe187' : null;
    }
}

customElements.define('omnia-masked-input', MaskedInputElement);