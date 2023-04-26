class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._fetchObject = {}
    this._fetchObject.headers = headers
    this._fetchObject.method = 'GET'
  }

  getUserInfo() {
    return this._checkResponse(fetch(`${this._baseUrl}/users/me`, this._fetchObject))
  }

  getInitialCards() {
    return this._checkResponse(fetch(`${this._baseUrl}/cards`, this._fetchObject))
  }

  editUserInfo(name, about) {
    this._fetchObject.method = 'PATCH';
    this._fetchObject.body = JSON.stringify({ name, about })

    return this._checkResponse(fetch(`${this._baseUrl}/users/me`, this._fetchObject))
  }

  addCard({ name, link }) {
    this._fetchObject.method = 'POST';
    this._fetchObject.body = JSON.stringify({ name, link })

    return this._checkResponse(fetch(`${this._baseUrl}/cards`, this._fetchObject))
  }

  deleteCard(cardID) {
    this._fetchObject.method = 'DELETE';

    return this._checkResponse(fetch(`${this._baseUrl}/cards/${cardID}`, this._fetchObject))
  }

  pressLike(cardID) {
    this._fetchObject.method = 'PUT';

    return this._checkResponse(fetch(`${this._baseUrl}/cards/${cardID}/likes`, this._fetchObject))
  }

  deleteLike(cardID) {
    this._fetchObject.method = 'DELETE';

    return this._checkResponse(fetch(`${this._baseUrl}/cards/${cardID}/likes`, this._fetchObject))
  }

  changeAvatar(avatarLink) {
    this._fetchObject.method = 'PATCH';
    this._fetchObject.body = JSON.stringify({ avatar: avatarLink })

    return this._checkResponse(fetch(`${this._baseUrl}/users/me/avatar`, this._fetchObject))
  }

  _checkResponse(promise) {
    return promise.then(res => {
      if (res.ok) {
        return res.json()
      }
      console.log(`Ошибка: ${res.status}`);
    })
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '8e64748d-eef9-4a6a-8486-bec99847cca5',
    'Content-Type': 'application/json'
  }
});


export default api