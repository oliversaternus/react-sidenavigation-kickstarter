import { observable, action } from "mobx";

export default class SizeStore {
    @observable width;
    @observable innerHeight;

    @action setSize = () => {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    };

    constructor(){
        this.setSize();
        window.addEventListener('resize', this.setSize);
    }
}
