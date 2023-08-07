//For item in list.

const list = require("./fakeDb");

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    list.push(this);
  }

  //Returns all items in list.
  static getAllItems() {
    return list;
  }

  //Returns single item from list if name matches.
  static getItem(name) {
    const existingItem = list.find(x => x.name === name);

    if(existingItem === undefined) {
      throw {message: "Item Not Found", status: 404}
    } else {
      return existingItem;
    }
  }

  //Update an existing item in the list.
  static updateItem(name, data) {
    let existingItem = Item.getItem(name);

    if(existingItem === undefined) {
      throw {message: "Item Not Found", status: 404}
    } else {
      existingItem.name = data.name;
      existingItem.price = data.price;
    }
    return existingItem;
  }

  //Removes an existing item from the list if id matches.
  static removeItem(name) {
    let existingIdx = list.findIndex(x => x.name === name);

    if(existingIdx === -1) {
      throw {message: "Item Not Found", status: 404}
    } else {
      list.splice(existingIdx, 1);
    }
  }
}
module.exports = Item;