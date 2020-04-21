class PopupPhoto extends Popup {
    constructor(element) {
        super(element);
        this.element
            .querySelector('.close__type_photo')
            .addEventListener('click', this.close.bind(this))
    }

    imageInstaller() {
        const popupImage = document.querySelector('.popup__img');
        popupImage.setAttribute('src', event.target.style.backgroundImage.slice(5, -2));
    }
}