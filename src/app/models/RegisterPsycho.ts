import Psycho from './Pyscho';

export class RegisterPsycho {
    psychologistUser: Psycho;

    constructor(){
        this.psychologistUser = new Psycho();
        this.psychologistUser.psychoQualifications = [];
        this.psychologistUser.attachments = [];
    }
}