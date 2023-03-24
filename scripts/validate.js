class FormValidation {
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
}

// Очистка ошибок
const resetForm = (popup, config) => {
  const formList = Array.from(popup.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.reset()
    const submitButton = formElement.querySelector(config.submitButtonSelector)
    submitButton.classList.add(config.inactiveButtonClass)
    submitButton.setAttribute('disabled', true);
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
    inputList.forEach((inputElement) => {
      const inputError = popup.querySelector(`#error__${inputElement.name}`);
      inputElement.classList.remove(config.inputError);
      inputError.textContent = '';
      inputError.classList.remove(config.inputErrorText)
    })
  })
}

export { FormValidation, resetForm }
