class FormValidator {
  constructor(config, currentForm) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputError = config.inputError;
    this._inputErrorText = config.inputErrorText;
    this._form = currentForm;
  }

  enableValidation = () => {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    this._setEventListeners();
  }

  _setEventListeners = () => {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector)
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    }
    else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled', true);
    }
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) { this._showError(inputElement, inputElement.validationMessage) }
    else { this._hideError(inputElement) }
  }

  _showError = (inputElement, errorMessage) => {
    const inputError = this._form.querySelector(`#error__${inputElement.name}`);
    inputElement.classList.add(this._inputError);
    inputError.textContent = errorMessage;
    inputError.classList.add(this._inputErrorText)
  }

  _hideError = (inputElement) => {
    const inputError = this._form.querySelector(`#error__${inputElement.name}`);
    inputElement.classList.remove(this._inputError);
    inputError.textContent = '';
    inputError.classList.remove(this._inputErrorText)
  }

  resetValidation = () => {
    this._toggleButtonState()
    this._inputList.forEach((inputElement) => {
      inputElement.value = ''
      this._hideError(inputElement)
    })
  }
}


export default FormValidator
