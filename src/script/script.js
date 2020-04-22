import "../index.css"

var Api = require('./Api').default;
var PopupAdd = require('./PopupAdd').default;
var PopupPhoto = require('./PopupPhoto').default;
var PopupEdit = require('./PopupEdit').default;
var PopupAvatar = require('./PopupAvatar').default;
var UserInfo = require('./UserInfo').default;
var FormValidatorEdit = require('./FormValidatorEdit').default;
var FormValidatorAdd = require('./FormValidatorAdd').default;
var FormValidatorAvatar = require('./FormValidatorAvatar').default;
var CardList = require('./CardList').default;



const root = document.querySelector('.root')
const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');
const myId = 'cc13f2e6e980cc31a0218ebe';
const userAvatar = document.querySelector('.user-info__photo');
const api = new Api({
    baseUrl: 'https://praktikum.tk/cohort9',
    headers: {
        authorization: '3da3f1f7-00db-4edd-b225-5b13ee20d1ea',
        ContentType: 'application/json'
    }
});


const userInfo = new UserInfo(document.querySelector('.user-info__name'), document.querySelector('.user-info__job'));

const formValidatorEdit = new FormValidatorEdit(document.forms.edit,formEdit.elements.name,formEdit.elements.job);

const formValidatorAdd = new FormValidatorAdd(document.forms.add,formAdd.elements.name,formAdd.elements.link);

const formValidatorAvatar = new FormValidatorAvatar(document.forms.avatar,formAvatar.elements.link);

const cardList = new CardList(document.querySelector('.places-list'));

const popupAdd = new PopupAdd(document.querySelector('.popup__type_add'),formAdd.elements.name,formAdd.elements.link);

const popupPhoto = new PopupPhoto(document.querySelector('.popup__type_photo'));

const popupEdit = new PopupEdit(document.querySelector('.popup__type_edit'));

const popupAvatar = new PopupAvatar(document.querySelector('.popup__type_avatar'));

const valueOfEditChecker = () => { formEdit.elements.name.value = userName.textContent; formEdit.elements.job.value = userJob.textContent};

const openPopupAdd = () => { if (event.target.classList.contains('user-info__button')) popupAdd.open(); };

const openPopupEdit = () => { if (event.target.classList.contains('edit__button')) popupEdit.open(); }

const openPopupImage = () => { if (event.target.classList.contains('place-card__image')) { popupPhoto.open(); popupPhoto.imageInstaller(); } };

const openPopupAvatar = () => { if (event.target.classList.contains('user-info__opacity')) popupAvatar.open(); };

const openPopup = () => { openPopupAdd(); openPopupEdit(); openPopupImage(); openPopupAvatar(); };

root.addEventListener('click', openPopup)

api.getUserInfo()
    .then(data => {
        userName.textContent = data.name;
        userJob.textContent = data.about;
        userAvatar.style.backgroundImage = `url('${data.avatar}')`;
        valueOfEditChecker();
    })
    .catch(err => console.log(err));

api.getInitialCards()
    .then(data => cardList.addListCard(data))
    .catch(err => console.log(err));


export default {userInfo,myId};
