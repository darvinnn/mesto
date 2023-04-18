(()=>{"use strict";class t{constructor(t){this._popup=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this)}setEventListeners(){this._popup.addEventListener("mousedown",(t=>{t.target.classList.contains("popup__overlay")&&this.close(),t.target.classList.contains("popup__close-button")&&this.close()}))}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}_handleEscClose(t){"Escape"===t.key&&this.close()}}class e extends t{constructor(t,e){super(t),this._formSubmit=e,this._form=this._popup.querySelector(".form"),this._inputList=Array.from(this._popup.querySelectorAll("input"))}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(t=>this._formSubmit(t,this._getInputValues())))}close(){super.close(),this._form.reset()}setInputValues(t){this._inputList.forEach((e=>{e.value=t[e.name],console.log(e.name)}))}_getInputValues(){return this._formValues={},this._inputList.forEach((t=>this._formValues[t.name]=t.value)),this._formValues}}const s=document.querySelector(".profile__edit-button"),r=(document.querySelector(".edit-popup__input_type_name"),document.querySelector(".edit-popup__input_type_profession"),document.querySelector(".profile__name")),i=document.querySelector(".profile__subtitle"),n=document.querySelector(".elements__list"),o=document.querySelector(".profile__add-button"),a=document.querySelector("#card-template").content,c={},d=new class{constructor(t,e){let{items:s,renderer:r}=t;this._items=s,this._renderer=r,this._container=e}addItem(t){this._container.prepend(t)}renderItems(){this._items.forEach((t=>{this._renderer(t)}))}}({items:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:t=>{const e=h(t);d.addItem(e)}},n),u=new class{constructor(t){let{name:e,description:s}=t;this._name=e,this._description=s}getUserInfo(){return{"edit-name":this._name.textContent,"edit-profession":this._description.textContent}}setUserInfo(t,e){this._name.textContent=t,this._description.textContent=e}}({name:r,description:i}),l=new e(".edit-popup",(function(t,e){t.preventDefault();const s=e["edit-name"],r=e["edit-profession"];u.setUserInfo.bind(u)(s,r),l.close()}));l.setEventListeners();const _=new e(".new-card-popup",(function(t,e){t.preventDefault();const s=h({link:e["new-card-image"],name:e["new-card-name"]});d.addItem(s),v(),_.close()}));_.setEventListeners();const p=new class extends t{constructor(t){super(t),this._popupImage=this._popup.querySelector(".image-popup__image"),this._popupTitle=this._popup.querySelector(".image-popup__title")}open(t,e){super.open(),this._popupImage.src=e,this._popupImage.alt=t,this._popupTitle.textContent=t}}(".image-popup");function h(t){return new class{constructor(t,e,s,r){let{link:i,name:n}=t;this._cardName=n,this._cardLink=i,this._cardTemplate=e,this._handleCardClick=s,this._checkCardsQuantity=r}render=()=>(this._createCard(),this._card);_setEventListeners=()=>{this._cardImage.addEventListener("click",(()=>this._handleCardClick(this._cardName,this._cardLink))),this._cardLikeButton=this._card.querySelector(".card__like-button"),this._cardLikeButton.addEventListener("click",this._handleLikeButton),this._cardDeleteButton=this._card.querySelector(".card__delete-button"),this._cardDeleteButton.addEventListener("click",this._handleDeleteButton)};_handleLikeButton=t=>{t.target.classList.toggle("card__like-button_active")};_handleDeleteButton=()=>{this._card.remove(),this._checkCardsQuantity()};_getCard=()=>this._cardTemplate.querySelector(".card").cloneNode(!0);_createCard=()=>{this._card=this._getCard(),this._card.setAttribute("name",this._cardName),this._cardImage=this._card.querySelector(".card__image"),this._cardImage.src=this._cardLink,this._cardImage.alt=this._cardName,this._card.querySelector(".card__name").textContent=this._cardName,this._setEventListeners()}}(t,a,m,v).render()}function m(t,e){p.open(t,e)}function v(){document.querySelectorAll(".card").length<3?n.classList.add("elements__list_few-cards"):n.classList.remove("elements__list_few-cards")}var f;p.setEventListeners(),s.addEventListener("click",(()=>{c.profileEdit.resetValidation();const t=u.getUserInfo();l.setInputValues(t),l.open()})),o.addEventListener("click",(()=>{c["new-card"].resetValidation(),_.open()})),f={formSelector:".form",inputSelector:".popup__input",submitButtonSelector:".popup__submit-button",inactiveButtonClass:"popup__submit-button_disabled",inputError:"input__error",inputErrorText:"input__error-text"},Array.from(document.querySelectorAll(f.formSelector)).forEach((t=>{const e=new class{constructor(t,e){this._formSelector=t.formSelector,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputError=t.inputError,this._inputErrorText=t.inputErrorText,this._form=e}enableValidation=()=>{this._form.addEventListener("submit",(t=>{t.preventDefault()})),this._setEventListeners()};resetValidation=()=>{this._toggleButtonState(!0),this._inputList.forEach((t=>{t.value="",this._hideError(t)}))};_setEventListeners=()=>{this._inputList=Array.from(this._form.querySelectorAll(this._inputSelector)),this._submitButton=this._form.querySelector(this._submitButtonSelector),this._toggleButtonState(),this._inputList.forEach((t=>{t.addEventListener("input",(()=>{this._checkInputValidity(t),this._toggleButtonState()}))}))};_toggleButtonState=t=>{this._hasInvalidInput()||t?(this._submitButton.classList.add(this._inactiveButtonClass),this._submitButton.setAttribute("disabled",!0)):(this._submitButton.classList.remove(this._inactiveButtonClass),this._submitButton.removeAttribute("disabled",!0))};_hasInvalidInput=()=>this._inputList.some((t=>!t.validity.valid));_checkInputValidity=t=>{t.validity.valid?this._hideError(t):this._showError(t,t.validationMessage)};_showError=(t,e)=>{const s=this._form.querySelector(`#error__${t.name}`);t.classList.add(this._inputError),s.textContent=e,s.classList.add(this._inputErrorText)};_hideError=t=>{const e=this._form.querySelector(`#error__${t.name}`);t.classList.remove(this._inputError),e.textContent="",e.classList.remove(this._inputErrorText)}}(f,t),s=t.getAttribute("name");c[s]=e,e.enableValidation()})),d.renderItems()})();
//# sourceMappingURL=main.8e86964ea0e4a7de1ae5.bundle.js.map