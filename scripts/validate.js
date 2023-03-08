const enableValidation = () => {
  const formList = Array.from(document.forms);
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement);
  })
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, submitButton) => {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add('popup__submit-button_disabled');
    submitButton.setAttribute('disabled', true);
  }
  else {
    submitButton.classList.remove('popup__submit-button_disabled')
    submitButton.removeAttribute('disabled', true);
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const submitButton = formElement.querySelector('.popup__submit-button');
  toggleButtonState(inputList, submitButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, submitButton);
    })
  })
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
};

const showError = (formElement, inputElement, errorMessage) => {
  const inputError = formElement.querySelector(`.error__${inputElement.name}`)
  inputElement.classList.add('input__error');
  inputError.textContent = errorMessage;
  inputError.classList.add('input__error-text');
};

const hideError = (formElement, inputElement) => {
  const inputError = formElement.querySelector(`.error__${inputElement.name}`)
  inputElement.classList.remove('input__error');
  inputError.textContent = '';
  inputError.classList.remove('input__error-text');
}


enableValidation()
