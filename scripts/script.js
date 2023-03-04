const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.edit-popup');
const editPopupCloseButton = document.querySelector('.edit-popup__close-button');
const formElement = document.querySelector('.edit-popup__form');
const nameInput = document.querySelector('.edit-popup__input_type_name');
const professionInput = document.querySelector('.edit-popup__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profession = document.querySelector('.profile__subtitle');
const elementsList = document.querySelector('.elements__list');
const newCardPopup = document.querySelector('.new-card-popup');
const newCardAddButton = document.querySelector('.profile__add-button');
const newCardPopupCloseButton = document.querySelector('.new-card-popup__close-button');
const newCardForm = document.querySelector('#new-card-form');
const imagePopup = document.querySelector('.image-popup');
const imagePopupPicture = imagePopup.querySelector('.image-popup__image');
const cardTemplate = document.querySelector('#card-template').content;
const cardName = newCardForm.querySelector('.new-card-popup__input_type_name');
const cardImage = newCardForm.querySelector('.new-card-popup__input_type_image');

function addCard(imageLink, cardName) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = card.querySelector('.card__delete-button');
  card.setAttribute('name', cardName);
  const cardImage = card.querySelector('.card__image');
  cardImage.src = imageLink;
  card.querySelector('.card__name').textContent = cardName;
  card.querySelector('.card__like-button').addEventListener('click', evt => { evt.target.classList.toggle('card__like-button_active') });
  card.querySelector('.card__delete-button');
  cardImage.addEventListener('click', () => {
    imagePopupPicture.src = imageLink;
    imagePopupPicture.setAttribute('alt', cardName);
    imagePopup.querySelector('.image-popup__title').textContent = cardName;
    openPopup(imagePopup);
  })
  deleteButton.addEventListener('click', () => {
    card.remove();
    checkCardsQuantity()
  })
  elementsList.prepend(card);
}

function addInitialCards(arr) {
  for (let i = 0; i < arr.length; i++) {
    addCard(arr[i].link, arr[i].name);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function newCardAdd(evt) {
  evt.preventDefault();
  addCard(cardImage.value, cardName.value);
  closePopup(newCardPopup);
  cardImage.value = '';
  cardName.value = '';
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profession.textContent = professionInput.value;
  closePopup(editPopup);
}

//Добавил функцию, чтобы карточки были ризиновыми при адаптиве, но не растягивались на весь экран пк, если карточек меньше трех
function checkCardsQuantity() {
  if (document.querySelectorAll('.card').length < 3) {
    document.querySelector('.elements__list').classList.add('elements__list_few-cards');
  }
}

formElement.addEventListener('submit', handleFormSubmit);
newCardForm.addEventListener('submit', newCardAdd);
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  professionInput.value = profession.textContent;
  openPopup(editPopup);
});
newCardAddButton.addEventListener('click', () => openPopup(newCardPopup));
editPopupCloseButton.addEventListener('click', () => closePopup(editPopup));
newCardPopupCloseButton.addEventListener('click', () => closePopup(newCardPopup));
imagePopup.querySelector('.image-popup__close-button').addEventListener('click', () => closePopup(imagePopup));

addInitialCards(initialCards);