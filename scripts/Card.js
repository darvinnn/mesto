import { checkCardsQuantity } from "./script.js";
import { escKeyHandler } from "./script.js";

class Card {
  constructor(cardLink, cardName, container, cardTemplate, imagePopup) {
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._container = container;
    this._cardTemplate = cardTemplate;
    this._imagePopup = imagePopup;
  }

  _openImagePopup = () => {
    this._imagePopupPicture = this._imagePopup.querySelector('.image-popup__image');
    this._imagePopupPicture.src = this._cardLink;
    this._imagePopupPicture.setAttribute('alt', this._cardName);
    this._imagePopup.querySelector('.image-popup__title').textContent = this._cardName;
    this._imagePopup.classList.add('popup_opened');
    document.addEventListener('keydown', escKeyHandler)
  }

  _handleLikeButton = (evt) => { evt.target.classList.toggle('card__like-button_active') }

  _handleDeleteButton = () => {
    this._card.remove();
    checkCardsQuantity();
  }

  // Получаем разметку карточки
  _getCard = () => { return this._cardTemplate.querySelector('.card').cloneNode(true) }

  _createCard = () => {
    this._card = this._getCard();

    // Работа с разметкой
    this._card.setAttribute('name', this._cardName);
    this._cardImage = this._card.querySelector('.card__image');
    this._cardImage.src = this._cardLink;
    this._cardImage.alt = this._cardName;
    this._card.querySelector('.card__name').textContent = this._cardName;

    // Кнопка лайка
    this._cardLikeButton = this._card.querySelector('.card__like-button');
    this._cardLikeButton.addEventListener('click', this._handleLikeButton)

    // Кнопка удаления
    this._cardDeleteButton = this._card.querySelector('.card__delete-button');
    this._cardDeleteButton.addEventListener('click', this._handleDeleteButton)

    // Попап картинки
    this._cardImage.addEventListener('click', this._openImagePopup)
  }

  render = () => {
    this._createCard();
    this._container.prepend(this._card);
  }
}

export default Card