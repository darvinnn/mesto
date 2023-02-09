let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_type_name');
let professionInput = document.querySelector('.popup__input_type_profession');
let name = document.querySelector('.profile__name');
let profession = document.querySelector('.profile__subtitle');

function popupOpen() {
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  profession.textContent = professionInput.value;
  popupClose();
}

formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);