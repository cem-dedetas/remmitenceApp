/*{
        "createdAt": "2023-11-08T09:25:52.425Z",
        "sent_amount": "29.06",
        "received_amount": "516.15",
        "to": "Marlon",
        "rate": 21,
        "completed": false,
        "pending": false,
        "issue": true,
        "user_id": "a98cd5cead084cfb98abc9ae",
        "id": "1"
    },*/

export interface Transfer {
    createdAt: string;
    sent_amount: string;
    received_amount: string;
    to: string;
    rate: number;
    completed: boolean;
    pending: boolean;
    issue: boolean;
    user_id: string;
    id: string;
}

export interface createTransferDTO {
    sent_amount : number;
    to: string;
}