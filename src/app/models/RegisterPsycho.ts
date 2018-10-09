import Psychologist from './Psychologist';

export class RegisterPsycho {
    psychologistUser: Psychologist;

    constructor(){
        this.psychologistUser = new Psychologist();
        this.psychologistUser.psychologistQualifications = [];
        this.psychologistUser.attachments = [];
    }
}