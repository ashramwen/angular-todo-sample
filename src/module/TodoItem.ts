export class TodoItem {
  text: string;
  done: boolean = false;

  private _created: number;
  private _id: string;
  // private _modified: number;
  // private _owner: string;
  // private _version: string;
  private _uri: string;

  constructor(text: string) {
    this.text = text;
  }

  getID() {
    return this._id;
  }

  setUri(uri: string) {
    this._uri = uri;
  }

  getUri() {
    return this._uri;
  }

  static fromObject(obj: KiiObject) {
    let todoItem = new TodoItem('');
    todoItem.text = obj.get<string>('text');
    todoItem.done = obj.get<boolean>('done');

    todoItem._created = obj.getCreated();
    todoItem._id = obj.getID();
    todoItem.setUri(obj.objectURI());
    // todoItem._modified = obj.get<number>('_modified');
    // todoItem._owner = obj.get<string>('_owner');
    // todoItem._version = obj.get<string>('_version');
    return todoItem;
  }
}

export declare type TodoItems = TodoItem[];
