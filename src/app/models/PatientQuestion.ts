export class PatientQuestion {
    constructor(data: Object|PatientQuestion) {
        Object.assign(this,data);
     }

    id: number;
    question: string;
    order: number;
    type: number;
    multipleChoiceOptions: string;

    get key() {
        return 'question' + this.id;
    }

    get multipleChoiceOptionsArr() {
        return this.multipleChoiceOptions.split(';');
    }
}