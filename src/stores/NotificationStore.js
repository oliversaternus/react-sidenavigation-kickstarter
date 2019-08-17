import { observable, action } from "mobx";

export default class NotificationStore {
  @observable isOpen = false;
  @observable message = '';
  @observable variant = 'success';

  @action setIsOpen = (value) => this.isOpen = value;
  @action setMessage = (value) => this.message = value;
  @action setVariant = (value) => this.variant = value;
  
  openNotification = (variant, message) => {
      this.setVariant(variant);
      this.setMessage(message);
      this.setIsOpen(true);
  };

  closeNotification = () => {
      this.setIsOpen(false);
  };
}
