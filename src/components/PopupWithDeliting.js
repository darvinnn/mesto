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

  open(cardRemover) {
    super.open()
    this._cardRemover = cardRemover
    this._deleteButton.addEventListener('click', this._handleSubmit)
  }

  _handleSubmit = async () => {
    try {
      this._setButtonName('Удаление...')
      await this._cardRemover();
      this.close();
      this._setButtonName('Да')
    } catch (error) {
      this._setButtonName(`Ошибка: ${error.message}`)
      setTimeout(() => this._setButtonName(`Да`), 2000)
    }
  }

  _setButtonName(text) {
    this._deleteButton.textContent = text
  }
}

export default PopupWithDeleting