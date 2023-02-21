const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.edit-popup');
const editPopupCloseButton = document.querySelector('.edit-popup__close-button');
const formElement = document.querySelector('.edit-popup__form');
const nameInput = document.querySelector('.edit-popup__input_type_name');
const professionInput = document.querySelector('.edit-popup__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profession = document.querySelector('.profile__subtitle');
const elementsList = document.querySelector('.elements__list')
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
  card.querySelector('.card__image').src = imageLink;
  card.querySelector('.card__name').textContent = cardName;
  elementsList.append(card);
}

function addInitialCards(arr) {
  for (let i = 0; i < arr.length; i++) {
    addCard(arr[i].link, arr[i].name);
  }
}

function editPopupOpen() {
  nameInput.value = profileName.textContent;
  professionInput.value = profession.textContent;
  editPopup.classList.add('popup_opened');
}

function editPopupClose() {
  editPopup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profession.textContent = professionInput.value;
  editPopupClose();
}

formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', editPopupOpen);
editPopupCloseButton.addEventListener('click', editPopupClose);

addInitialCards(initialCards);
console.log(editPopup)