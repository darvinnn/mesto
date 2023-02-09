let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('#name');
let professionInput = document.querySelector('#profession');
let name = document.querySelector('.profile__name');
let profession = document.querySelector('.profile__subtitle');
popup.classList.remove('popup_opened');

function popupActivate() {
  popup.classList.toggle('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  profession.textContent = professionInput.value;
  popupActivate()
}

formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', popupActivate);
popupCloseButton.addEventListener('click', popupActivate);