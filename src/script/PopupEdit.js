class PopupEdit extends Popup {
    constructor(element) {
        super(element);
        this.element
            .querySelector('.close__type_edit')
            .addEventListener('click', this.close.bind(this))
        this.element
            .querySelector('#formEdit')

        /**REVIEW3** Надо исправить. setUserInfo нельзя вызывать до прихода ответа с сервера, то есть его тоже можно
     * вызывать только в  методе then обработки ответа от сервера (смотрите комментарий по этому поводу ещё в модуле класса UserInfo).  */
            .addEventListener('submit', userInfo.updateUserInfo )
    }
}