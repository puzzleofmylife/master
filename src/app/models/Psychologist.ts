import { User } from './User';

export class Psychologist extends User {
    status:string;
    statusId:number;
    idNumber: number;
    age: number;
    experienceYears: number;
    licenseNumber: string;
    qualifications: string[];
    accountNumber: number;
    bankName: string;
    branchCode: number;
    accountType: string;
    photo:string;
    attachments: any[];
    paymentPercent: number;
    isFullTime: boolean;
    pauseReturnDate: boolean;
}