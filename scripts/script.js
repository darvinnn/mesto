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
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function addCard(imageLink, cardName) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = card.querySelector('.card__delete-button');
  card.querySelector('.card__image').src = imageLink;
  card.querySelector('.card__name').textContent = cardName;
  card.querySelector('.card__like-button').addEventListener('click', evt => { evt.target.classList.toggle('card__like-button_active') });
  card.querySelector('.card__delete-button');
  card.querySelector('.card__image').addEventListener('click', () => {
    imagePopup.querySelector('.image-popup__image').src = imageLink;
    imagePopup.querySelector('.image-popup__title').textContent = cardName;
    imagePopup.classList.add('popup_opened');
    imagePopup.querySelector('.image-popup__close-button').addEventListener('click', () => { imagePopup.classList.remove('popup_opened'); })
  })
  deleteButton.addEventListener('click', () => {
    deleteButton.closest('.card').remove()
  })
  elementsList.prepend(card);
}

function addInitialCards(arr) {
  for (let i = 0; i < arr.length; i++) {
    addCard(arr[i].link, arr[i].name);
  }
}

function editPopupClose() {
  editPopup.classList.remove('popup_opened');
}

function newCardPopupClose() {
  newCardPopup.classList.remove('popup_opened')
}

function newCardAdd(evt) {
  evt.preventDefault();
  const cardName = newCardForm.querySelector('.new-card-popup__input_type_name');
  const cardImage = newCardForm.querySelector('.new-card-popup__input_type_image');
  addCard(cardImage.value, cardName.value);
  newCardPopupClose();
  cardImage.value = '';
  cardName.value = '';
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profession.textContent = professionInput.value;
  editPopupClose();
}

formElement.addEventListener('submit', handleFormSubmit);
newCardForm.addEventListener('submit', newCardAdd);
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  professionInput.value = profession.textContent;
  editPopup.classList.add('popup_opened');
});
newCardAddButton.addEventListener('click', () => { newCardPopup.classList.add('popup_opened') });
editPopupCloseButton.addEventListener('click', editPopupClose);
newCardPopupCloseButton.addEventListener('click', newCardPopupClose);

addInitialCards(initialCards);
console.log(editPopup)