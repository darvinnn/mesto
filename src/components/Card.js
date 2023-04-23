class Card {
  constructor({ link, name }, cardTemplate, handleCardClick, checkCardsQuantity, deletePopup) {
    this._cardName = name;
    this._cardLink = link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._checkCardsQuantity = checkCardsQuantity;
    this._deletePopup = deletePopup
  }

  render = () => {
    this._createCard();
    return this._card;
  }

  _setEventListeners = () => {
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._cardName, this._cardLink));

    this._cardLikeButton = this._card.querySelector('.card__like-button');
    this._cardLikeButton.addEventListener('click', this._handleLikeButton)

    const openPopup = this._deletePopup.open.bind(this._deletePopup, this._card)
    this._cardDeleteButton = this._card.querySelector('.card__delete-button');
    this._cardDeleteButton.addEventListener('click', openPopup)
  }

  _handleLikeButton = (evt) => { evt.target.classList.toggle('card__like-button_active') }

  _getCard = () => { return this._cardTemplate.querySelector('.card').cloneNode(true) }

  _createCard = () => {
    this._card = this._getCard();

    this._card.setAttribute('name', this._cardName);
    this._cardImage = this._card.querySelector('.card__image');
    this._cardImage.src = this._cardLink;
    this._cardImage.alt = this._cardName;
    this._card.querySelector('.card__name').textContent = this._cardName;

    this._setEventListeners()
  }
}

export default Card