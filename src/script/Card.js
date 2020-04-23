import {myId, api} from './script'
export default class Card {
    constructor(nameValue, linkValue, likeValue, cardId, ownerId, likesArr) {
        this.nameValue = nameValue;
        this.linkValue = linkValue;
        this.likeValue = likeValue;
        this.cardId = cardId;
        this.ownerId = ownerId;
        this.likesArr = likesArr;
        this.result = null;
    }

    createCard() {
        const card = document.createElement('div');
        card.classList.add('place-card');

        const template = 
            `<div class="place-card__image" style="background-image: url(${this.linkValue})"> 
            <button class="place-card__delete-icon"></button>
            </div>
            <div class="place-card__description">
            <h3 class="place-card__name">${this.nameValue}</h3>
            <div>
            <button class="place-card__like-icon"></button>
            <p class="place-card__like-counter">${this.likeValue}</p>
            </div>
            </div>`;

        card.innerHTML = template;

        if (this.ownerId == myId) {
            card
                .querySelector('.place-card__delete-icon')
                .style.display = 'block';
        }

        const deleteServerCard = () => {
            if (window.confirm('Вы действительно хотите удалить эту карточку?')) {
                api.deleteCard(this.cardId)
                    .then(data => {
                        console.log(data);
                        card.remove();
                    })
                    .catch(err => console.log(err));
            }
        };


        this.likesArr.forEach(likeOwner => {
            if (likeOwner._id == myId) {
                this.result = true;
            };
            return this.result;            
        });
    
        if (this.result) {
            card
                .querySelector('.place-card__like-icon')
                .classList.add('place-card__like-icon_liked');
        };

        const likeHandler = () => {
            const likeCounter = card.querySelector('.place-card__like-counter');
            const likeDOM = card.querySelector('.place-card__like-icon');
            if (likeDOM.classList.contains('place-card__like-icon_liked')) {
                api.likeAdd(this.cardId)
                    .then(data => console.log(data))
                    .catch(err => console.log(err));
                likeCounter.textContent = Number(likeCounter.textContent) + 1;
            } else {
                api.likeDelete(this.cardId)
                    .then(data => console.log(data))
                    .catch(err => console.log(err));
                likeCounter.textContent = likeCounter.textContent - 1;
            };
        }
        
        
        card
            .querySelector('.place-card__delete-icon')
            .addEventListener('click', deleteServerCard);
        card
            .querySelector('.place-card__like-icon')
            .addEventListener('click', this.like.bind(this));
        card
            .querySelector('.place-card__like-icon')
            .addEventListener('click', likeHandler);

        return card;
    }

    remove(event) {
        const cardArea = document.querySelector('.places-list')
        cardArea.removeChild(event.target.closest('.place-card'))
    }

    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }
}
