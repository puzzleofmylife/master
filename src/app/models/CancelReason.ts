import { PsychologistHistory } from './PsychologistHistory';
export interface  CancelReason extends PsychologistHistory {
    createDate: Date;
    cancelReason: string;
    psychologistHistory: PsychologistHistory[];
}
