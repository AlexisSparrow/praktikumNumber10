class Api {
    constructor(options) {
        this.options = options;
    }

    
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

