const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputError: 'input__error',
  inputErrorText: 'input__error-text'
}

const enableValidation = (config) => {
  const formList = Array.from(document.forms);
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement, config);
  })
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, submitButton, config) => {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.setAttribute('disabled', true);
  }
  else {
    submitButton.classList.remove(config.inactiveButtonClass)
    submitButton.removeAttribute('disabled', true);
  }
}

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, submitButton, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, submitButton, config);
    })
  })
}

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideError(formElement, inputElement, config);
  }
};

const showError = (formElement, inputElement, errorMessage, config) => {
  const inputError = formElement.querySelector(`#error__${inputElement.name}`)
  inputElement.classList.add(config.inputError);
  inputError.textContent = errorMessage;
  inputError.classList.add(config.inputErrorText);
};

const hideError = (formElement, inputElement, config) => {
  const inputError = formElement.querySelector(`#error__${inputElement.name}`)
  inputElement.classList.remove(config.inputError);
  inputError.textContent = '';
  inputError.classList.remove(config.inputErrorText);
}

// Очистка ошибок
const resetForm = (forms, config) => {
  forms.forEach((formElement) => {
    formElement.reset()
    const submitButton = formElement.querySelector(config.submitButtonSelector)
    submitButton.classList.add(config.inactiveButtonClass)
    submitButton.setAttribute('disabled', true);
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
    inputList.forEach((inputElement) => {
      hideError(formElement, inputElement, config)
    })
  })
}


enableValidation(validationConfig)
