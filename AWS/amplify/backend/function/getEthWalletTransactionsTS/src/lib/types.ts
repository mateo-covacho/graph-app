export interface Graph_node {
	id: number,
	label: string,
	group?: number,
	shape?: string
}

export interface Transaction {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    nonce: string;
    blockHash: string;
    transactionIndex: string;
    from: string;
    to: string;
    value: string;
    gas: string;
    gasPrice: string;
    isError: string;
    txreceipt_status: string;
    input?: string ;
    contractAddress: string;
    cumulativeGasUsed: string;
    gasUsed: string;
    confirmations: string;
}

// Response type for a wallet scan fetching transactions
export interface WalletScan {
    status: string;
    message: string;
    result: Transaction[];
}

