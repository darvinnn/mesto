import Popup from "./Popup";

class PopupWithDeleting extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._deleteButton = this._popup.querySelector('.popup__submit-button')
  }

  open(removeCard) {
    super.open()
    this._removeCard = removeCard;
  }

  setEventListeners() {
    super.setEventListeners()
    this._deleteButton.addEventListener('click', () => this._removeCard())
  }

  setButtonName(text) {
    this._deleteButton.textContent = text
  }
}

export default PopupWithDeleting