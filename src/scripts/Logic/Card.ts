export class Card {
  value: number;
  suit: string;
  name: string;

  constructor(value?: number, suit?: string, name?: string) {
    this.value = value;
    this.suit = suit;
    this.name = name;
  }

  getImagePath() {
    return new CardImagePaths().getPathToImage(`${this.suit}_${this.name}`);
  }
}

export class CardBack {
  name: string;
  constructor() {
    this.name = 'back';
  }

  getImagePath() {
    return new CardImagePaths().getPathToImage(this.name);
  }
}

export class CardBase {
  name: string;
  constructor() {
    this.name = 'card-base';
  }

  getImagePath() {
    return new CardImagePaths().getPathToImage(this.name);
  }
}

export class CardImagePaths {
  path: string;
  type: string;
  constructor() {
    this.path = 'playingcards';
    this.type = 'png';
  }

  getPathToImage(filename) {
    return `${this.path}/${filename}.${this.type}`;
  }
}
