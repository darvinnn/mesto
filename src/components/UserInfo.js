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

  setUserInfo(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  }

  setAvatar(url) {
    this._avatar.src = url
  }
}


export default UserInfo