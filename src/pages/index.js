import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithDeleting from "../components/PopupWithDeliting.js";
import UserInfo from "../components/UserInfo.js";
import { validationConfig, avatarEditButton, avatar, editButton, profileName, profession, elementsList, addNewCardButton, cardTemplate } from "../utils/constants.js";
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
  try {
    avatarPopup.setButtonName('Сохранение...')
    await api.changeAvatar(avatarInput)
    userInfo.setAvatar({ avatar: avatarInput })
    avatarPopup.close()
    avatarPopup.setButtonName('Сохранить')
  } catch (error) {
    avatarPopup.setButtonName(`Ошибка: ${error.message}`)
    setTimeout(() => avatarPopup.setButtonName('Сохранить'), 2000)
  }
}

function createCard(item) {
  const card = new Card(item, cardTemplate, handleCardClick, checkCardsQuantity, api, openDeletePopup)
  const cardElement = card.render()
  return cardElement
}

function openDeletePopup(cardRemover) {
  deletePopup.open(cardRemover)
}

async function addNewCard(evt, inputsObject) {
  evt.preventDefault();
  const cardInfo = {
    link: inputsObject['new-card-image'],
    name: inputsObject['new-card-name']
  }

  try {
    newCardPopup.setButtonName('Создание...')
    const card = await api.addCard(cardInfo)
    const cardElement = createCard(card)
    cardsSection.addItem(cardElement);
    checkCardsQuantity();
    newCardPopup.close();
    newCardPopup.setButtonName('Создать')
  } catch (error) {
    newCardPopup.setButtonName(`Ошибка: ${error.message}`)
    setTimeout(() => newCardPopup.setButtonName('Сохранить'), 2000)
  }
}

async function handleProfileFormSubmit(evt, inputsObject) {
  evt.preventDefault();
  const name = inputsObject['edit-name'];
  const about = inputsObject['edit-profession'];

  try {
    editPopup.setButtonName('Сохранение...')
    await api.editUserInfo(name, about)
    const setUserInfo = userInfo.setUserInfo.bind(userInfo)
    setUserInfo({ name, about })
    editPopup.close();
    editPopup.setButtonName('Сохранить')
  } catch (error) {
    editPopup.setButtonName(`Ошибка: ${error.message}`)
    setTimeout(() => editPopup.setButtonName('Сохранить'), 2000)
  }
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
  try {
    const profileParameters = await api.getUserInfo()
    userInfo.setAvatar(profileParameters)
    userInfo.setUserInfo(profileParameters)
    api.id = profileParameters._id
  } catch (error) {
    userInfo.setUserInfo({ name: 'Ошибка загрузки', about: error.message })
  }
}

const addInitialCards = async () => {
  try {
    const cards = await api.getInitialCards()
    cardsSection.renderItems(cards)
    checkCardsQuantity()
  } catch (error) { console.log(error) }
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


async function renderPage() {
  try {
    await Promise.all([setProfile(), addInitialCards()])
  } catch (error) { console.log(error) }
}

enableValidation(validationConfig);
renderPage()