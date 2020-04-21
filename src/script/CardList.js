
class CardList {
    constructor(container) {
        this.container = container;
    }

    addCard(name, link, likes, cardId, ownerId, likesArr) {
        const card = new Card(name, link, likes, cardId, ownerId, likesArr);
        const element = card.createCard();
        this.container.appendChild(element);
    }

    addListCard(list) {
        for (const element of list) {
        const data = element;
        this.addCard(data.name, data.link, data.likes.length, data._id, data.owner._id, data.likes);
        };
    }
}

