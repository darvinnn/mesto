let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__container');
let nameInput = document.getElementById('name');
let professionInput = document.getElementById('profession');
popup.classList.remove('popup_opened');

function popupOpen() {
  popup.classList.toggle('popup_opened');
}

function popupClosed() {
  popup.classList.toggle('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();

}

editButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClosed);