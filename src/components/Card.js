class Card {
  constructor({ link, name, _id, likes, owner }, cardTemplate, handleCardClick, checkCardsQuantity, userId, openDeletePopup, likeHandler) {
    this._cardName = name;
    this._cardLink = link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._checkCardsQuantity = checkCardsQuantity;
    this._cardId = _id;
    this._likes = likes;
    this._likeHandler = likeHandler;
    this._userId = userId;
    this._owner = owner;
    this._openDeletePopup = openDeletePopup
  }

  render = () => {
    this._createCard();
    return this._card;
  }

  renderLikes(likes) {
    this._likeCounter.textContent = likes.length

    const isLiked = likes.some(user => user._id === this._userId)
    isLiked
      ? this._cardLikeButton.classList.add('card__like-button_active')
      : this._cardLikeButton.classList.remove('card__like-button_active')
  }

  _setEventListeners = () => {
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._cardName, this._cardLink));

    this._cardLikeButton.addEventListener('click', this._handleLikeButton)

    const cardRemover = this._cardRemover.bind(this)
    this._cardDeleteButton.addEventListener('click', () => this._openDeletePopup(cardRemover, this._cardId))
  }

  _cardRemover() {
    this._card.remove()
    console.log(this._card)
    this._checkCardsQuantity()
  }

  _handleLikeButton = (evt) => {
    this._likeHandler(evt, this, this._cardId)
  }

  _getCard = () => { return this._cardTemplate.querySelector('.card').cloneNode(true) }

  _createCard = () => {
    this._card = this._getCard();
    this._cardLikeButton = this._card.querySelector('.card__like-button');
    this._cardDeleteButton = this._card.querySelector('.card__delete-button');
    this._renderDeleteIcon()

    this._card.querySelector('.card__name').textContent = this._cardName;

    this._cardImage = this._card.querySelector('.card__image');
    this._cardImage.src = this._cardLink;
    this._cardImage.alt = this._cardName;

    this._likeCounter = this._card.querySelector('.card__like-counter')
    this.renderLikes(this._likes)

    this._setEventListeners()
  }

  _renderDeleteIcon() {
    if (this._owner._id !== this._userId.id) { this._cardDeleteButton.classList.add('card__delete-button_disabled') }
  }
}

export default Card