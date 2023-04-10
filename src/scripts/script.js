import initialCards from "./initialCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import { PopupWithImage, PopupWithForm } from "./Popup.js";
import UserInfo from "./UserInfo.js";
import '../pages/index.css'

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputError: 'input__error',
  inputErrorText: 'input__error-text'
}
const editButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.edit-popup__input_type_name');
const professionInput = document.querySelector('.edit-popup__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profession = document.querySelector('.profile__subtitle');
const elementsList = document.querySelector('.elements__list');
const addNewCardButton = document.querySelector('.profile__add-button');
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


const initialCardsRendered = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, cardTemplate, handleCardClick, checkCardsQuantity)
    initialCardsRendered.addItem(card.render())
  }
}, elementsList)


const userInfo = new UserInfo({ name: profileName, description: profession })

const editPopup = new PopupWithForm('.edit-popup', handleProfileFormSubmit)
editPopup.setEventListeners()

const newCardPopup = new PopupWithForm('.new-card-popup', addNewCard)
newCardPopup.setEventListeners()

const popupWithImage = new PopupWithImage('.image-popup')
popupWithImage.setEventListeners()


function addNewCard(evt, inputsObject) {
  evt.preventDefault();
  const cardInfo = [{
    link: inputsObject['new-card-image'],
    name: inputsObject['new-card-name']
  }]

  const newCard = new Section({
    items: cardInfo,
    renderer: (item) => {
      const card = new Card(item, cardTemplate, handleCardClick, checkCardsQuantity)
      newCard.addItem(card.render())
    }
  }, elementsList)

  newCard.renderItems();
  checkCardsQuantity();
  newCardPopup.close();
}

function handleProfileFormSubmit(evt, inputsObject) {
  evt.preventDefault();
  const name = inputsObject['edit-name'];
  const description = inputsObject['edit-profession'];
  const setUserInfo = userInfo.setUserInfo.bind(userInfo)
  setUserInfo(name, description)
  editPopup.close();
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link)
}

//Добавил функцию, чтобы карточки были резиновыми при адаптиве, но не растягивались на весь экран пк, если карточек меньше трех
function checkCardsQuantity() {
  document.querySelectorAll('.card').length < 3
    ? elementsList.classList.add('elements__list_few-cards')
    : elementsList.classList.remove('elements__list_few-cards');
}

editButton.addEventListener('click', () => {
  formValidators['profileEdit'].resetValidation()
  const info = userInfo.getUserInfo()
  nameInput.value = info.name
  professionInput.value = info.description
  editPopup.open()
});

addNewCardButton.addEventListener('click', () => {
  formValidators['new-card'].resetValidation()
  newCardPopup.open();
});

enableValidation(validationConfig);
initialCardsRendered.renderItems()