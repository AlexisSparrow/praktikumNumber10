class UserInfo {
    constructor(username, userJob) {
        this.username = username;
        this.userJob = userJob

    }

    setUserInfo(name,job) {
        this.username.textContent = name;
        this.userJob.textContent = job;
    }

    updateUserInfo() {
        event.preventDefault();
        /**REVIEW**3. Надо исправить. Получается, что Вы заносите информацию о профиле из полей формы в элементы страницы до того, как пришёл
         * ответ от сервера, но это неправильно. Ведь может произойти ошибка и данные не сохраняться на сервере, тогда и страницу новыми данными
         * обновлять нельзя. По этой же причине надо будет изменить метод updateUserInfo класса Api (смотрите комментарий по этому поводу
         * в модуле класса Api). Таким образом две нижеследующие команды надо поместить в метод then, где у Вас
         * сейчас находится одна команда вывода ответа от сервера в консоль. При этом лучше на страницу внедреть не данные из полей формы,
         * а те же самые данные, но из объекта ответа сервера, то есть вместо this.nameReserved брать data.name, а вместо this.dutyReserved
         * - data.about. Надо продумать что делать с методом  setUserInfo. Он должен сохранять в свойствах класса актуальную информацию,
         * при этом и при загрузке страницы и при сабмите формы профиля. То есть при сабмите формы профиля, свойства класса должны обновляться
         * так же только после ответа сервера, при том положительного, а если произойдёт ошибка setUserInfo не должен обновлять свойства класса,
         * и в них должны находится старые значения. То есть setUserInfo нельзя вызывать до прихода ответа с сервера, то есть его тоже можно
         * вызывать только в  методе then обработки ответа от сервера (смотрите комментарий по этому поводу ещё в модуле класса PopupEdit).  */
        api.updateUserInfo()
            .then(data => {
                console.log(data);
                userInfo.setUserInfo(data.name,data.about);
                popupEdit.close();
            })
            .catch(err => console.log(err));
        /**REVIEW**3. Надо исправить. Если оставить действие закрытия окна формы здесь, то оно со 100%-й вероятностью произойдёт раньше,
         * чем придёт ответ от сервера, так как запрос к серверу - это асинхронная операция, а это значит, что пока выполнится запрос и придёт ответ,
         * выполнятся все операции следующие за методами then и лежащие вне этих методов. Закрытие формы раньше, чем придёт и обработается ответ
         * от сервера, будет выглядеть некрасиво для пользователя, поэтому popupEdit.close() так же нужно поместить в метод then обработки ответа.
         *  В случае неуспешного запроса к серверу форма вообще не должна закрываться - Вы можете предложить пользователю
         * попробовать ещё раз, или он сам выйдет по крестику.*/
    }
}