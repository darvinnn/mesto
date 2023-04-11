class UserInfo {
  constructor({ name, description }) {
    this._name = name;
    this._description = description;
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
}


export default UserInfo