import Popup from './Popup'
import {api,popupAdd,cardList} from './script'
export default class PopupAdd extends Popup {
    constructor(element,nameForm,linkForm) {
        super(element);
        this.nameForm = nameForm;
        this.linkForm = linkForm;
        this.userData = {
            name: 'x',
            link: 'x'
        };
        this.element
            .querySelector('.close__type_add')
            .addEventListener('click', this.close.bind(this))
        this.element
            .querySelector('#formAdd')
            .addEventListener('submit', this.cardSetting.bind(this))
    }

    cardSetting() {
        event.preventDefault();             
        this.userData.name = this.nameForm.value;
        this.userData.link = this.linkForm.value;
        api.updateNewCard()
            .then(data => {
                console.log(data);
                cardList.addCard(data.name, data.link, data.likes.length, data._id, data.owner._id, data.likes);
            })
            .catch(err => console.log(err));
        popupAdd.close();
        formAdd.reset();
    };
}
