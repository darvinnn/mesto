class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._fetchObject = {}
    this._fetchObject.headers = headers
    this._fetchObject.method = 'GET'
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, this._fetchObject).then(res => res.json())
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, this._fetchObject).then(res => res.json())
  }

  editUserInfo(name, about) {
    this._fetchObject.method = 'PATCH';
    this._fetchObject.body = JSON.stringify({ name, about })

    return fetch(`${this._baseUrl}/users/me`, this._fetchObject).then(res => res.json())
  }

  addCard({ name, link }) {
    this._fetchObject.method = 'POST';
    this._fetchObject.body = JSON.stringify({ name, link })

    return fetch(`${this._baseUrl}/cards`, this._fetchObject).then(res => res.json())
  }

  deleteCard(cardID) {
    this._fetchObject.method = 'DELETE';

    return fetch(`${this._baseUrl}/cards/${cardID}`, this._fetchObject).then(res => res.json())
  }

  pressLike(cardID) {
    this._fetchObject.method = 'PUT';

    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, this._fetchObject).then(res => res.json())
  }

  deleteLike(cardID) {
    this._fetchObject.method = 'DELETE';

    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, this._fetchObject).then(res => res.json())
  }

  changeAvatar(avatarLink) {
    this._fetchObject.method = 'PATCH';
    this._fetchObject.body = JSON.stringify({ avatar: avatarLink })

    return fetch(`${this._baseUrl}/users/me/avatar`, this._fetchObject).then(res => res.json())
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