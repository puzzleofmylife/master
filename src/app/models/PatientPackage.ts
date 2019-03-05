import { PatientPackageVoucher } from "./PatientPackageVoucher";

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
    pendingCancellationJobDate: Date;
    pendingChange: boolean;
    pendingChangeJobDate: Date;
    pendingChangePackageName: string;
    pendingChangePackageId: number;
    packageVoucher: PatientPackageVoucher;
    isInTrial: boolean;
}