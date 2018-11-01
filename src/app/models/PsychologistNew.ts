import { User } from './User';

export class PsychologistNew extends User {
    status:string;
    idNumber: number;
    age: number;
    experienceYears: number;
    licenseNumber: string;
    qualifications: string[];
    bankAccountAccountNumber: number;
    bankAccountBankName: string;
    bankAccountBranchCode: number;
    bankAccountAccountType: string;
    photo:string;
    attachments: any[];
}