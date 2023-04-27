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


let userId


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
  }
  catch (error) { console.log(`Ошибка: ${error.message}`) }
  finally { editPopup.setButtonName('Сохранить') }
}


const newCardPopup = new PopupWithForm('.new-card-popup', addNewCard)
newCardPopup.setEventListeners()

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
  }
  catch (error) { console.log(`Ошибка: ${error.message}`) }
  finally { newCardPopup.setButtonName('Создать') }
}


const popupWithImage = new PopupWithImage('.image-popup')
popupWithImage.setEventListeners()


const deletePopup = new PopupWithDeleting('#delete-popup')
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
  }
  catch (error) { avatarPopup.setButtonName(`Ошибка: ${error.message}`) }
  finally { avatarPopup.setButtonName('Сохранить') }
}


function createCard(item) {
  const card = new Card(item, cardTemplate, handleCardClick, checkCardsQuantity, userId, openDeletePopup, likeHandler)
  const cardElement = card.render()
  return cardElement
}

async function likeHandler(evt, card, cardId) {
  try {
    if (!evt.target.classList.contains('card__like-button_active')) {
      const newCardInfo = await api.pressLike(cardId)
      card.renderLikes(newCardInfo.likes)
    }
    else {
      const newCardInfo = await api.deleteLike(cardId)
      card.renderLikes(newCardInfo.likes)
    }
  }
  catch (err) { console.log(err) }
}

function openDeletePopup(cardRemover, cardId) {
  const removeCard = async () => {
    try {
      deletePopup.setButtonName('Удаление...')
      await api.deleteCard(cardId)
      cardRemover()
      deletePopup.close()
    }
    catch (err) { console.log(err) }
    finally { deletePopup.setButtonName('Да') }
  }
  deletePopup.open(removeCard)
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link)
}


//Добавил функцию, чтобы карточки были резиновыми при адаптиве, но не растягивались на весь экран пк, если карточек меньше трех
function checkCardsQuantity() {
  elementsList.children.length < 3
    ? elementsList.classList.add('elements__list_few-cards')
    : elementsList.classList.remove('elements__list_few-cards');
}


function renderPage() {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
      setProfile(userData);
      addInitialCards(initialCards);
    })
    .catch((error) => console.log(error))
}

const setProfile = (userData) => {
  userInfo.setAvatar(userData)
  userInfo.setUserInfo(userData)
  userId = userData._id
}

const addInitialCards = (cards) => {
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
renderPage()