class Card {
  constructor({ link, name, _id, likes, owner }, cardTemplate, handleCardClick, checkCardsQuantity, deletePopup, api) {
    this._cardName = name;
    this._cardLink = link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._checkCardsQuantity = checkCardsQuantity;
    this._deletePopup = deletePopup;
    this._id = _id;
    this._likes = likes;
    this._api = api;
    this._owner = owner;
  }

  render = () => {
    this._createCard();
    return this._card;
  }

  _setEventListeners = () => {
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._cardName, this._cardLink));

    this._cardLikeButton.addEventListener('click', this._handleLikeButton)

    const openPopup = this._deletePopup.open.bind(this._deletePopup, this._card)
    this._cardDeleteButton.addEventListener('click', openPopup)
  }

  _handleLikeButton = async (evt) => {
    evt.target.classList.toggle('card__like-button_active');
    if (evt.target.classList.contains('card__like-button_active')) {
      const newCardInfo = await this._api.pressLike(this._id)
      this._likes = newCardInfo.likes
    } else {
      const newCardInfo = await this._api.deleteLike(this._id)
      this._likes = newCardInfo.likes
    }
    this._renderLikes()
  }

  _getCard = () => { return this._cardTemplate.querySelector('.card').cloneNode(true) }

  _createCard = () => {
    this._card = this._getCard();
    this._cardLikeButton = this._card.querySelector('.card__like-button');
    this._cardDeleteButton = this._card.querySelector('.card__delete-button');
    this._renderDeleteIcon()

    this._card.setAttribute('name', this._cardName);
    this._card.querySelector('.card__name').textContent = this._cardName;

    this._cardImage = this._card.querySelector('.card__image');
    this._cardImage.src = this._cardLink;
    this._cardImage.alt = this._cardName;

    this._likeCounter = this._card.querySelector('.card__like-counter')
    this._renderLikes()

    this._setEventListeners()
  }

  _renderLikes() {
    this._likeCounter.textContent = this._likes.length

    const isLiked = this._likes.some(user => user._id === this._api.id)
    if (isLiked) {
      this._cardLikeButton.classList.add('card__like-button_active')
    }
  }

  _renderDeleteIcon() {
    if (this._owner._id !== this._api.id)
      this._cardDeleteButton.style.display = 'none'
  }
}

export default Card