export class Card {
    constructor(value, suit, name) {
        this.value = value;
        this.suit = suit;
        this.name = name;
    }

    getImagePath() {
        return new CardImagePaths().getPathToImage(`${this.suit}_${this.name}`);
    }
}

export class CardBack {
    constructor() {
        this.name = "back";
    }

    getImagePath() {
        return new CardImagePaths().getPathToImage(this.name);
    }
}

export class CardBase {
    constructor() {
        this.name = "card-base";
    }

    getImagePath() {
        return new CardImagePaths().getPathToImage(this.name);
    }
}

export class CardImagePaths {
    constructor(){
        this.path = "playingcards";
        this.type = "png";
    }

    getPathToImage(filename) {
        return `${this.path}/${filename}.${this.type}`;
    }
}