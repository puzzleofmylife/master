import { User } from './User';

export class Psychologist extends User {
    status:string;
    idNumber: number;
    age: number;
    experienceYears: number;
    licenseNumber: string;
    qualifications: string[];
    AccountNumber: number;
    BankName: string;
    BranchCode: number;
    AccountType: string;
    photo:string;
    attachments: any[];
}