class UserInfo {
  constructor({ name, description }) {
    this._name = name;
    this._description = description;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent
    }
  }

  setUserInfo(name, description) {
    console.log(this)
    this._name.textContent = name;
    this._description.textContent = description;
  }
}


export default UserInfo