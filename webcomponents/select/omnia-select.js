class OmniaSelect extends HTMLElement {
	constructor() {
		super();
	
		this._options = [{ value: '', text: 'Please select a value'}];
		this.select = document.createElement('select');
	}
  
	connectedCallback() {
	    this.renderOptions();
		
		this.select.selectedIndex = 0;
		this.select.addEventListener('change', this.valueUpdated.bind(this));
		this.select.setAttribute('class', 'form-control');
		
		this.appendChild(this.select);
	}
	
	disconnectedCallback() {
		this.select.removeEventListener('change', this.valueUpdated.bind(this));
	}
	
	valueUpdated(event) {
		let evtValue = (event.target.value || event.target.options[event.target.selectedIndex].value);
		
		this.dispatchEvent(new CustomEvent('value-updated', {
			detail: {
				value: evtValue
			}
		}));
	}
	
	
	renderOptions() {
		this.select.innerHTML = '';
	    
		this._options.forEach(opt => {
            let option = document.createElement('option');
            option.value = opt.value;
            option.text = opt.text;
 
            this.select.appendChild(option);
        });
	}
  
    set value(newValue) {
        const newValueIndex = this._options.map(obj => obj.value).indexOf(newValue);
		this.select.selectedIndex = newValueIndex >= 0 ? newValueIndex : 0;
    }
    
    get options() {
        return this._options;
    }
	
	set options(newValue) {
		this._options = this._options.concat(newValue);
		this.renderOptions();
	}
	
	set isReadOnly(newValue)
    {
        this.select.disabled = (newValue === true);
    }
}

customElements.define('omnia-select', OmniaSelect);