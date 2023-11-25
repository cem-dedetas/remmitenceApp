//https://654b68155b38a59f28ef05c2.mockapi.io/scopex/api/Transfers

import { Transfer, createTransferDTO } from '../models/transfer';

const url = 'https://654b68155b38a59f28ef05c2.mockapi.io/scopex/api/Transfers';


export const getTransfers = async (): Promise<Transfer[]> => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const getTransfer = async (id: string): Promise<Transfer> => {
    if (id == '-1') return {
        createdAt: "2023-11-08T09:25:52.425Z",
        sent_amount: '123.45',
        received_amount: "516.15",
        to: 'Cem',
        rate: 21,
        completed: true,
        pending: false,
        issue: true,
        user_id: "a98cd5cead084cfb98abc9ae",
        id: "1"
    }
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();
    return data;
}

export const createTransfer = async (transfer: createTransferDTO): Promise<Transfer> => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transfer),
    });
    return await response.json();
}

export const filteredTransfers = async (to?:string): Promise<Transfer[]> => {
    const response = await fetch(`${url}/?to=${to}`);
    const data = await response.json();
    return data;
}