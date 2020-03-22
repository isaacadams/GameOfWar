export function randomlyRemoveItemsFromArray(array, numberToRemove){
    let itemsRemoved = [];

    while(itemsRemoved.length < numberToRemove) {
        let indexToGetItem = getRandomInt(0, array.length - 1);
        itemsRemoved = [ ...itemsRemoved, ...array.splice(indexToGetItem, 1)];
    }

    return itemsRemoved;
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}