import { APIGatewayProxyHandler } from 'aws-lambda';
import * as https from 'https';
import { Transaction, WalletScan, Graph_node } from './types'; // Ensure you define these types

const walletAddress: string = "0x5d2b684D9D741148a20EE7A06622122ec32cfeE3";
const apiKey: string = "8PY54PK4NETZH8CZ73S7N54RXBH3DNHQNT";
const apiUrlBase: string = `https://api.etherscan.io/api?module=account&action=txlist&address=`;
const apiOptions: string = `&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apiKey}`;
const unique_node_labels: Set<string> = new Set();
let idCounter: number = 0;
const walletLabelIdMaps: Map<string, number> = new Map();

async function scanWallet(wallet: string, depth: number): Promise<Transaction[]> {
	if (depth < 0) return [];
	const apiUrl: string = `${apiUrlBase}${wallet}${apiOptions}`;
	const response: WalletScan = await httpsGetPromise(apiUrl);
	let transactions: Transaction[] = response.result;

	const uniqueWallets: Set<string> = new Set();

	transactions = transactions.filter(tx => tx.to.length > 3);
	transactions.forEach((tx, i) => delete tx.input);

	// console.log("======start======");
	// console.log("scanning wallet: ", wallet);
	// console.log("transactionslog:", transactions.map(tx => ({from: tx.from, to: tx.to, hash: tx.hash})));
	// console.log("transactionslog:", transactions);
	// console.log("======end======");


	transactions.forEach(tx => {
		// console.log("======for each======");
		uniqueWallets.add(tx.from);
		uniqueWallets.add(tx.to);
	});

	const nextTransactions: Transaction[] = [];
	for (let nextWallet of uniqueWallets) {
		if (nextWallet !== wallet) {
			const result = await scanWallet(nextWallet, depth - 1);
			nextTransactions.push(...result);
		}
	}

	return transactions.concat(nextTransactions);
}

function httpsGetPromise(url: string): Promise<WalletScan> {
	return new Promise((resolve, reject) => {
		https.get(url, res => {
			let data = '';
			res.on('data', chunk => data += chunk);
			res.on('end', () => {
				resolve(JSON.parse(data))
			});
		}).on('error', err => reject(err));
	});
}

export const handler: APIGatewayProxyHandler = async (event: any) => {
	console.log(`EVENT: ${JSON.stringify(event)}`);
	try {
		const depth: number = parseInt(event.queryStringParameters?.depth || '2');
		const raw_transactions = await scanWallet(walletAddress, depth);
		const walletLabelIdMaps = new Map();

		const nodes: Graph_node[] = [];
		raw_transactions.forEach(tx => {
			unique_node_labels.add(tx.to);
			unique_node_labels.add(tx.from);
		});
		unique_node_labels.forEach(wallet_node => {
			walletLabelIdMaps.set(wallet_node, idCounter);
			nodes.push({
				id: idCounter++,
				label: wallet_node,
				group: wallet_node === walletAddress ? 0 : 1,
			});
		});

		const edges = raw_transactions.map(tx => ({
			to: walletLabelIdMaps.get(tx.to),
			from: walletLabelIdMaps.get(tx.from),
			label: `${parseInt(tx.value) / 1e18} ETH`,
			gas: parseInt(tx.gasUsed) / 1e18,
			arrows: { to: { enabled: true, scaleFactor: 0.5 } },
		}));
		return {
			statusCode: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "*",
			},
			body: JSON.stringify({ nodes, edges }),
		};
	} catch (error) {
		console.error(error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "An error occurred" }),
		};
	}
};
