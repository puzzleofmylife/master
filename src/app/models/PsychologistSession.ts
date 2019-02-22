import PatientQuestionAnswer from "./PatientQuestionAnswer";

export class PsychologistSession {
    id: number;
    patientName: string;
    patientId: number;
    newMessageCount: number;
    mostRecentMessageDate: Date;
    patientQuestionAnswers: PatientQuestionAnswer[];
}