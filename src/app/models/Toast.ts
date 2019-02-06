export class Toast {
    constructor(state: string, message: string){
        this.state = state;
        this.message = message;
    }
    state: string;
    message: string;
}