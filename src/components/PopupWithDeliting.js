import Popup from "./Popup";

class PopupWithDeleting extends Popup {
  constructor(popupSelector, checkCardsQuantity) {
    super(popupSelector)
    this._deleteButton = this._popup.querySelector('.popup__submit-button')
    this._checkCardsQuantity = checkCardsQuantity
  }

  open(card) {
    super.open()
    this._card = card
    const submit = this._submit.bind(this)
    this._deleteButton.addEventListener('click', submit)
  }

  _submit() {
    this._card.remove();
    this._checkCardsQuantity()
    this.close()
  }
}

export default PopupWithDeleting