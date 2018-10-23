import PatientQuestionAnswer from './PatientQuestionAnswer';

export class PatientUser {
    patientAlias: string;
    email: string;
    password: string;
    selectedPackageId: number;
    SelectedPsychologistId: number;
    questionAnswers: PatientQuestionAnswer[] = [];
}