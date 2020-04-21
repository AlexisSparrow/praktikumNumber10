class Api {
    constructor(options) {
        this.options = options;
    }

    /*REVIEW. Надо исправить. Надо исправить структуру методов класса Api, поскольку эти методы должны только делать запрос к серверу, получать
    ответ от сервера, проверять статус этого ответа, и, если запрос выполнился успешно, возвращать объект ответа сервера, иначе возвращать промис
    с объектом произошедшей ошибки. Обработка же ответа сервера, или ошибки должна происходить в методах других классов. Так будет соблюдён принцип
    единственной ответственности метода Api - ведь его результат может понадобится нескольким классам, а значит этот ответ надо будет
    обрабатывать разными методами, что невозможно сделать при Вашей структуре методов Api.
    То есть структура любого метода Api должна быть такой:

    methodApi() {
        return fetch(`...`, {
                  ...
               })
               .then(res => {
                  if (!res.ok) {
                    return Promise.reject(res.status)
                  }
                  return res.json();
               })
    }                 //На этом метод должен заканчиваться.

    Как должен обрабатываться возвращаемый от сервера ответ res, смотрите в комментарии в script.js, где описана обработка ответа из Вашего метода
    класса Api getInitialCards.

    */

    getUserInfo() {
        return fetch(`${this.options.baseUrl}/users/me`, {
            methdod: 'GET',
            headers: {
                authorization: this.options.headers.authorization
            }
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.status)
            }

            return res.json()
        })
    }

    getInitialCards() {
        return fetch(`${this.options.baseUrl}/cards`,{
            method: 'GET',
            headers: {
                authorization: this.options.headers.authorization
            }
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.status)
            }

            return res.json()
        })
    }

    updateUserInfo() {
        return fetch(`${this.options.baseUrl}/users/me`,{
            method: 'PATCH',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-type': this.options.headers.ContentType
            },

            /**REVIEW3** Надо исправить. В теле запроса на сервер должны отсылаться данные из полей формы профиля, а не данные из элементов страницы
             * Поскольку к моменту запроса на странице должны ещё находиться старые данные, так как данные на странице должны обновляться только
             * после того как придёт ответ от сервера, при том только в случае положительного ответа сервера (смотрите ещё комментарий по этому поводу
             * в модуле класса UserInfo).
              */
            body : JSON.stringify({
                name: formEdit.elements.name.value,
                about : formEdit.elements.job.value
            })
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.status)
            }

            return res.json()
        })
    }

    updateNewCard() {
        return fetch(`${this.options.baseUrl}/cards`,{
            method: 'POST',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-type': this.options.headers.ContentType
            },
            body : JSON.stringify({
                name: formAdd.elements.name.value,
                link: formAdd.elements.link.value
            })
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.status)
            }

            return res.json()
        })
    }

    deleteCard(cardId) {
        return fetch(`${this.options.baseUrl}/cards/${cardId}`,{
            method: 'DELETE',
            headers: {
                authorization: this.options.headers.authorization
            }
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.status)
            }

            return res.json()
        })
    }

    likeAdd(cardId) {
        return fetch(`${this.options.baseUrl}/cards/like/${cardId}`,{
            method: 'PUT',
            headers: {
                authorization: this.options.headers.authorization
            }
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.status)
            }

            return res.json()
        })
    }

    likeDelete(cardId) {
        return fetch(`${this.options.baseUrl}/cards/like/${cardId}`,{
            method: 'DELETE',
            headers: {
                authorization: this.options.headers.authorization
            }
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.status)
            }

            return res.json()
        })
    }

    updateAvatar() {
        return fetch(`${this.options.baseUrl}/users/me/avatar`,{
            method: 'PATCH',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-type': this.options.headers.ContentType
            },
            body : JSON.stringify({
                avatar: formAvatar.elements.link.value
            })
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.status)
            }

            return res.json()
        })
    }
};

