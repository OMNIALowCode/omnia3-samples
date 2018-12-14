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

		this.valueUpdated = this.valueUpdated.bind(this);

		this._select = document.createElement('select');
		this._select.setAttribute('class', 'form-control');
		this._select.addEventListener('change', this.valueUpdated);
	}
  
	connectedCallback() {
		this.renderOptions();
		this._select.selectedIndex = 0;
		
		this.appendChild(this._select);
	}
	
	disconnectedCallback() {
		this._select.removeEventListener('change', this.valueUpdated);
	}
	
	valueUpdated() {
		const currentSelection = this._select.selectedIndex;
		this.dispatchEvent(new CustomEvent('value-updated', { detail: { value: currentSelection > 0 ? this._options[currentSelection - 1].value : '' } }));
	}
	
	renderOptions(translator) {
		const currentSelection = this._select.selectedIndex;
		this._select.innerHTML = '';
		
		this._select.append(getSelectOption(getDefaultOption(translator)));
		for(const option of this._options)
			this._select.appendChild(getSelectOption(option, translator));

		this._select.selectedIndex = currentSelection;
	}
  
    set value(newValue) {
        const newValueIndex = this._options.map(obj => obj.value).indexOf(newValue) + 1;
		this._select.selectedIndex = newValueIndex >= 0 ? newValueIndex : 0;
    }
    
    get options() {
        return this._options;
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
			this.renderOptions(newValue.getLanguageTranslator());
        }
    }
}

customElements.define('omnia-select', OmniaSelect);