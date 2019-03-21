// The component only supports en-us and pt-pt languages
const TRANSLATIONS = {
    default: {
        DefaultOption: 'Please select a value',
        
    },
    ptpt: {
        DefaultOption: 'Selecione uma opção',
    }
};

function getTranslation(translation, language) {
    const translationSet = language != null ? TRANSLATIONS[language.toLowerCase()] || TRANSLATIONS.default : TRANSLATIONS.default;
    return translationSet ? translationSet[translation] : translation;
}

function getDefaultOption(translator){
	return { value: '', text: getTranslation('DefaultOption',  translator ? translator.language : null) };
}

function getSelectOption(opt, translator){
	const option = document.createElement('option');
	option.value = opt.value;
	option.text = translator ? translator.translateToApplication(opt.text) : opt.text;
	return option;
}

class OmniaSelect extends HTMLElement {
	constructor() {
		super();
	
		this._options = [];
        this._text = "";
        this._translator = null;
		this.valueUpdated = this.valueUpdated.bind(this);

		this._select = document.createElement('select');
		this._select.setAttribute('class', 'form-control');
	}
  
	connectedCallback() {
		this.renderOptions();
		this._select.selectedIndex = 0;
		
		this._select.addEventListener('change', this.valueUpdated);
		
		this.appendChild(this._select);
	}
	
	disconnectedCallback() {
		this._select.removeEventListener('change', this.valueUpdated);
	}
	
	valueUpdated() {
		const currentSelection = this._select.selectedIndex;
		this.dispatchEvent(new CustomEvent('value-updated', { detail: { value: currentSelection > 0 ? this._options[currentSelection - 1].value : '' } }));
	}
	
	renderOptions() {
		this._select.innerHTML = '';
		
		this._select.append(getSelectOption(getDefaultOption(this._translator)));
		for(const option of this._options)
			this._select.appendChild(getSelectOption(option, this._translator));

        const newValueIndex = this._options.map(obj => obj.value).indexOf(this._value) + 1;
		this._select.selectedIndex = newValueIndex >= 0 ? newValueIndex : 0;
	    if (this._options[newValueIndex - 1])
			this._text = this._options[newValueIndex - 1].text;
	}
  
    set value(newValue) {
        this._value = newValue;
        this.renderOptions();
    }
    
    get options() {
        return this._options;
    }
	
	get text() {
		return this._text;
	}
	
	set options(newValue) {
		this._options = newValue;
		this.renderOptions();
	}
	
	set isReadOnly(newValue)
    {
        this._select.disabled = (newValue === true);
	}
	
	set context(newValue) {
        if (newValue) {
            this._translator = newValue.getLanguageTranslator();
			this.renderOptions();
        }
    }
}

customElements.define('omnia-select', OmniaSelect);
