export class PatientPackage {
    id: number;
    packageId: number;
    packageName: string;
    packageDurationDays: number;
    packageCost: number;
    createDate: Date;
    nextBillDate: Date;
    statusId: number;
    statusName: string;
    patientId: number;
    pendingCancellation: boolean;
}