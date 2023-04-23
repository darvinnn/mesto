import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector('.form');
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'))
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => this._formSubmit(evt, this._getInputValues()))
  }

  close() {
    super.close();
    this._form.reset();
  }

  setInputValues(values) {
    this._inputList.forEach(input => {
      input.value = values[input.name];
    })
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value)
    return this._formValues;
  }
}