import Realm from 'realm'

export class Model {
  static create(data, update = false) {
    if (data instanceof Array) {
      realm.write(() => {
        data.forEach((item) => {
          realm.create(this.schema.name, item, update)
        })
      })
    } else {
      realm.write(() => {
        return realm.create(this.schema.name, data, update)
      })
    }
  }

  static getBiggerId() {
    let biggerId = 0;
    const saves = realm.objects(this.schema.name).sorted('id', true);
    if (saves[0]) {
      biggerId = saves[0].id;
    }
    return biggerId;
  }

  static get() {
    return realm.objects(this.schema.name)
  }
}

export class Conference extends Model {
  static schema = {
    "name": "Conference",
    "properties": {
      "id": "int",
      "title": "string",
      "description": "string?",
      "startDate": "date?",
      "endDate": "date?",
      "image": "string?",
      "background": "string?",
      "color": "string?",
      "contact": {type: 'list', objectType: 'stringObject'},
      "url": "string?"
    },
    "primaryKey": "id"
  }
}

export class Event extends Model {
  static schema = {
    "name": "Event",
    "properties": {
      "id": "int",
      "title": "string",
      "description": "string?",
      "startDate": "date?",
      "endDate": "date?",
      "confId": "int",
      "image": "string?",
      "address": "string",
      "location": {type: 'list', objectType: 'doubleObject'},
      "contact": {type: 'list', objectType: 'stringObject'},
      "url": "string?",
      "speaker": {type: 'list', objectType: 'intObject'}
    },
    "primaryKey": "id"
  }
}

export class Speaker extends Model {
  static schema = {
    "name": "Speaker",
    "properties": {
      "id": "int",
      "rawId": "int",
      "name": "string",
      "description": "string?",
      "image": "string?",
    },
    "primaryKey": "id"
  }
}

class stringObject extends Realm.Object {
  static schema = {
    name: 'stringObject',
    properties: {value: 'string?'}
  };
}

class intObject extends Realm.Object {
  static schema = {
    name: 'intObject',
    properties: {value: 'int?'}
  };
}

class doubleObject extends Realm.Object {
  static schema = {
    name: 'doubleObject',
    properties: {value: 'double?'}
  };
}

const realm = new Realm({
  schema: [Conference, Event, Speaker, stringObject, intObject, doubleObject]
});

