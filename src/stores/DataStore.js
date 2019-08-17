import { observable, action } from "mobx";

export default class DataStore {
  @observable mail;

  @action setMail = (value) => this.mail = value;
}
