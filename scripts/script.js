import initialCards from "./initialCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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
const addNewCardButton = document.querySelector('.profile__add-button');
const newCardForm = document.forms['new-card'];
const imagePopup = document.querySelector('.image-popup');
const cardName = newCardForm.querySelector('.new-card-popup__input_type_name');
const cardImage = newCardForm.querySelector('.new-card-popup__input_type_image');
const cardTemplate = document.querySelector('#card-template').content;

const formValidators = {}
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach(formElement => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  })
}

function createCard(item) {
  const card = new Card(item.link, item.name, cardTemplate, handleCardClick, checkCardsQuantity)
  return card.render()
}

function addInitialCards(arr) {
  arr.forEach((item) => {
    const card = createCard(item)
    elementsList.append(card)
  })
  checkCardsQuantity()
}

function handleCardClick(name, link) {
  imagePopup.querySelector('.image-popup__image').src = link;
  imagePopup.querySelector('.image-popup__image').alt = name;
  imagePopup.querySelector('.image-popup__title').textContent = name;
  openPopup(imagePopup)
}

function handleEscKey(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscKey)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscKey)
}

function addNewCard(evt) {
  evt.preventDefault();
  const cardInfo = {
    link: cardImage.value,
    name: cardName.value
  }
  const card = createCard(cardInfo)
  elementsList.prepend(card);
  checkCardsQuantity()
  closePopup(newCardPopup);
}

function handleProfileFormSubmit(evt) {
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

editFormElement.addEventListener('submit', handleProfileFormSubmit);

newCardForm.addEventListener('submit', addNewCard);

editButton.addEventListener('click', () => {
  formValidators['profileEdit'].resetValidation()
  nameInput.value = profileName.textContent;
  professionInput.value = profession.textContent;
  openPopup(editPopup);
});

addNewCardButton.addEventListener('click', () => {
  formValidators['new-card'].resetValidation()
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
enableValidation(validationConfig);