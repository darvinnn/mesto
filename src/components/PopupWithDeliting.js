import Popup from "./Popup";

class PopupWithDeleting extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._deleteButton = this._popup.querySelector('.popup__submit-button')
  }

  close() {
    super.close()
    this._deleteButton.removeEventListener('click', this._handleSubmit)
  }

  open(removeCard) {
    super.open()
    this._removeCard = removeCard;
    this._deleteButton.addEventListener('click', this._handleSubmit)
  }

  _handleSubmit = () => {
    this._removeCard()
    this.close()
  }

  _setButtonName(text) {
    this._deleteButton.textContent = text
  }
}

export default PopupWithDeleting