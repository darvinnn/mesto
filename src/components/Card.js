class Card {
  constructor({ link, name, _id, likes, owner }, cardTemplate, handleCardClick, checkCardsQuantity, api, openDeletePopup) {
    this._cardName = name;
    this._cardLink = link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._checkCardsQuantity = checkCardsQuantity;
    this._cardId = _id;
    this._likes = likes;
    this._api = api;
    this._owner = owner;
    this._openDeletePopup = openDeletePopup
  }

  render = () => {
    this._createCard();
    return this._card;
  }

  async _handleDelete() {
    try {
      await this._api.deleteCard(this._cardId)
      this._card.remove()
      this._checkCardsQuantity()
    } catch (error) {
      console.log(error)
      throw new Error(error.message)
    }
  }

  _setEventListeners = () => {
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._cardName, this._cardLink));

    this._cardLikeButton.addEventListener('click', this._handleLikeButton)

    const handleDelete = this._handleDelete.bind(this)
    const openDeletePopup = this._openDeletePopup.bind(this)
    this._cardDeleteButton.addEventListener('click', () => openDeletePopup(handleDelete))
  }

  _handleLikeButton = async (evt) => {
    try {
      if (!evt.target.classList.contains('card__like-button_active')) {
        const newCardInfo = await this._api.pressLike(this._cardId)
        this._likes = newCardInfo.likes
      } else {
        const newCardInfo = await this._api.deleteLike(this._cardId)
        this._likes = newCardInfo.likes
      }
      evt.target.classList.toggle('card__like-button_active');
      this._renderLikes()
    } catch (error) { console.log(error) }
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
    if (this._owner._id !== this._api.id) { this._cardDeleteButton.classList.add('card__delete-button_disabled') }
  }
}

export default Card