"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
let default_wallet = "0x5d2b684D9D741148a20EE7A06622122ec32cfeE3";
const apiKey = "8PY54PK4NETZH8CZ73S7N54RXBH3DNHQNT";
const apiUrlBase = `https://api.etherscan.io/api?module=account&action=txlist&address=`;
const apiOptions = `&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apiKey}`;
const unique_node_labels = new Set();
let idCounter = 0;
function scanWallet(wallet_param, depth) {
    return __awaiter(this, void 0, void 0, function* () {
        if (depth < 0)
            return [];
        const apiUrl = `${apiUrlBase}${wallet_param}${apiOptions}`;
        const response = yield httpsGetPromise(apiUrl);
        let transactions = response.result;
        const uniqueWallets = new Set();
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
        const nextTransactions = [];
        for (let nextWallet of uniqueWallets) {
            if (nextWallet !== wallet_param) {
                const result = yield scanWallet(nextWallet, depth - 1);
                nextTransactions.push(...result);
            }
        }
        return transactions.concat(nextTransactions);
    });
}
function httpsGetPromise(url) {
    return fetch(url)
        .then(res => res.json())
        .catch(err => {
        throw err;
    });
}
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const wallet = ((_a = event.queryStringParameters) === null || _a === void 0 ? void 0 : _a.wallet) || default_wallet;
    //const wallet: string = walletAddress;
    try {
        const depth = parseInt(((_b = event.queryStringParameters) === null || _b === void 0 ? void 0 : _b.depth) || '2');
        const raw_transactions = yield scanWallet(wallet, depth);
        const walletLabelIdMaps = new Map();
        const nodes = [];
        raw_transactions.forEach(tx => {
            unique_node_labels.add(tx.to);
            unique_node_labels.add(tx.from);
        });
        unique_node_labels.forEach(wallet_node => {
            walletLabelIdMaps.set(wallet_node, idCounter);
            nodes.push({
                id: idCounter++,
                label: wallet_node,
                group: wallet_node === wallet ? 0 : 1,
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
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({ scannedWallet: wallet, nodes, edges }),
        };
    }
    catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "An error occurred" }),
        };
    }
});
exports.handler = handler;
