class PopupAvatar extends Popup {
    constructor(element) {
        super(element)
        this.element
            .querySelector('.close__type_avatar')
            .addEventListener('click', this.close.bind(this));
        this.element
            .querySelector('#formAvatar')
            .addEventListener('submit', this.avatarSetting.bind(this));

    }

    avatarSetting() {
        event.preventDefault();
        api.updateAvatar()
            .then(data => {
                console.log(data);
                userAvatar.style.backgroundImage = `url('${data.avatar}')`;
            })
            .catch(err => console.log(err));

        formAvatar.reset();
        popupAvatar.close();
    }
}