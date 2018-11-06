import PatientQuestionAnswer from './PatientQuestionAnswer';
import { User } from './User';

export class Patient extends User {
    alias: string;
    currentPackageId: number;
    currentPsychologistId: number;
    questionAnswers: PatientQuestionAnswer[] = [];
}