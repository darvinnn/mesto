import initialCards from "./initialCards.js";
import Card from "./Card.js";
import { FormValidation, resetForm } from "./validate.js";

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputError: 'input__error',
  inputErrorText: 'input__error-text'
}

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.edit-popup');
const editFormElement = document.querySelector('.edit-popup__form');
const nameInput = document.querySelector('.edit-popup__input_type_name');
const professionInput = document.querySelector('.edit-popup__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profession = document.querySelector('.profile__subtitle');
const elementsList = document.querySelector('.elements__list');
const newCardPopup = document.querySelector('.new-card-popup');
const newCardAddButton = document.querySelector('.profile__add-button');
const newCardForm = document.querySelector('#new-card-form');
const editForm = document.querySelector('#edit-popup-form');
const imagePopup = document.querySelector('.image-popup');
const cardName = newCardForm.querySelector('.new-card-popup__input_type_name');
const cardImage = newCardForm.querySelector('.new-card-popup__input_type_image');
const cardTemplate = document.querySelector('#card-template').content;

new FormValidation(validationConfig, newCardForm).enableValidation()
new FormValidation(validationConfig, editForm).enableValidation()


function addInitialCards(arr) {
  arr.forEach((item) => {
    const card = new Card(item.link, item.name, elementsList, cardTemplate, imagePopup)
    card.render();
  })
}

export function escKeyHandler(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escKeyHandler)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escKeyHandler)
}

function newCardAdd(evt) {
  evt.preventDefault();
  const card = new Card(cardImage.value, cardName.value, elementsList, cardTemplate, imagePopup)
  card.render();
  checkCardsQuantity()
  closePopup(newCardPopup);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profession.textContent = professionInput.value;
  closePopup(editPopup);
}

//Добавил функцию, чтобы карточки были резиновыми при адаптиве, но не растягивались на весь экран пк, если карточек меньше трех
export function checkCardsQuantity() {
  if (document.querySelectorAll('.card').length < 3) {
    elementsList.classList.add('elements__list_few-cards');
  }
  else {
    elementsList.classList.remove('elements__list_few-cards');
  }
}

editFormElement.addEventListener('submit', handleFormSubmit);
newCardForm.addEventListener('submit', newCardAdd);
editButton.addEventListener('click', () => {
  resetForm(editPopup, validationConfig);
  nameInput.value = profileName.textContent;
  professionInput.value = profession.textContent;
  openPopup(editPopup);
});
newCardAddButton.addEventListener('click', () => {
  resetForm(newCardPopup, validationConfig);
  openPopup(newCardPopup);
});

const popups = Array.from(document.querySelectorAll('.popup'));
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__overlay')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
})

addInitialCards(initialCards);