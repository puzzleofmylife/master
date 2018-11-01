import { User } from './User';

export class PsychologistNew extends User {
    statusId:number;
    psychologistIDNumber: number;
    psychologistAge: number;
    psychologistExperienceYears: number;
    psychologistLicenseNumber: string;
    psychologistQualifications: string[];
    psychologistBankAccountAccountNumber: number;
    psychologistBankAccountBankName: string;
    psychologistBankAccountBranchCode: number;
    psychologistBankAccountAccountType: string;
    photo:string;
    attachments: any[];
}