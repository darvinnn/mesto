import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithDeleting from "../components/PopupWithDeliting.js";
import UserInfo from "../components/UserInfo.js";
import { validationConfig, editSubmitButton, newCardSubmitButton, avatarSubmitButton, avatarEditButton, avatar, editButton, profileName, profession, elementsList, addNewCardButton, cardTemplate } from "../utils/constants.js";
import api from "../components/Api.js";

import '../pages/index.css'


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


const cardsSection = new Section({
  renderer: (item) => {
    const card = createCard(item);
    cardsSection.addItem(card);
  }
}, elementsList)

const userInfo = new UserInfo({ name: profileName, description: profession, avatar: avatar })

const editPopup = new PopupWithForm('.edit-popup', handleProfileFormSubmit)
editPopup.setEventListeners()

const newCardPopup = new PopupWithForm('.new-card-popup', addNewCard)
newCardPopup.setEventListeners()

const popupWithImage = new PopupWithImage('.image-popup')
popupWithImage.setEventListeners()

const deletePopup = new PopupWithDeleting('#delete-popup', checkCardsQuantity)
deletePopup.setEventListeners()

const avatarPopup = new PopupWithForm('#avatar-popup', changeAvatar)
avatarPopup.setEventListeners()


async function changeAvatar(evt, { avatarInput }) {
  evt.preventDefault()

  avatarSubmitButton.value = 'Сохранение...'
  await api.changeAvatar(avatarInput)
  userInfo.setAvatar({ avatar: avatarInput })
  avatarPopup.close()
  avatarSubmitButton.value = 'Сохранить'
}

function createCard(item) {
  const card = new Card(item, cardTemplate, handleCardClick, checkCardsQuantity, deletePopup, api)
  const cardElement = card.render()
  return cardElement
}

async function addNewCard(evt, inputsObject) {
  evt.preventDefault();
  const cardInfo = {
    link: inputsObject['new-card-image'],
    name: inputsObject['new-card-name']
  }

  newCardSubmitButton.value = 'Создание...'
  const card = await api.addCard(cardInfo)
  const cardElement = createCard(card)
  cardsSection.addItem(cardElement);
  checkCardsQuantity();
  newCardPopup.close();
  newCardSubmitButton.value = 'Создать'
}

async function handleProfileFormSubmit(evt, inputsObject) {
  evt.preventDefault();
  const name = inputsObject['edit-name'];
  const about = inputsObject['edit-profession'];

  editSubmitButton.value = 'Сохранение...'
  await api.editUserInfo(name, about)
  const setUserInfo = userInfo.setUserInfo.bind(userInfo)
  setUserInfo({ name, about })
  editPopup.close();
  editSubmitButton.value = 'Сохранить'
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

const setProfile = async () => {
  const profileParameters = await api.getUserInfo()
  userInfo.setAvatar(profileParameters)
  userInfo.setUserInfo(profileParameters)
  api.id = profileParameters._id
}

const addinitialCards = async () => {
  const cards = await api.getInitialCards()
  cardsSection.renderItems(cards)
  checkCardsQuantity()
}


editButton.addEventListener('click', () => {
  formValidators['profileEdit'].resetValidation();
  const info = userInfo.getUserInfo();
  editPopup.setInputValues(info);
  editPopup.open();
});

addNewCardButton.addEventListener('click', () => {
  formValidators['new-card'].resetValidation()
  newCardPopup.open();
});

avatarEditButton.addEventListener('click', () => {
  formValidators['avatar'].resetValidation()
  avatarPopup.open()
})


enableValidation(validationConfig);
setProfile()
addinitialCards()