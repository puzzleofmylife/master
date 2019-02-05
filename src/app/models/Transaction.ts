export interface Transaction {
    createDate: Date,
    description: string
    debitAmount: number,
    creditAmount: number,
    userId: string,
    transactionTypeId: number
}