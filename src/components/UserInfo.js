class UserInfo {
  constructor({ name, description, avatar }) {
    this._name = name;
    this._description = description;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {
      'edit-name': this._name.textContent,
      'edit-profession': this._description.textContent
    }
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._description.textContent = about;
  }

  setAvatar({ avatar }) {
    this._avatar.src = avatar
  }
}


export default UserInfo