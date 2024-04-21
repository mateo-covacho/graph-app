"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const https = __importStar(require("https"));
const walletAddress = "0x9aa99c23f67c81701c772b106b4f83f6e858dd2e";
const apiKey = "8PY54PK4NETZH8CZ73S7N54RXBH3DNHQNT";
const apiUrlBase = `https://api.etherscan.io/api?module=account&action=txlist&address=`;
const apiOptions = `&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apiKey}`;
let idCounter = 0;
const walletLabelIdMaps = new Map();
function scanWallet(wallet, depth) {
    return __awaiter(this, void 0, void 0, function* () {
        if (depth < 0)
            return [];
        const apiUrl = `${apiUrlBase}${wallet}${apiOptions}`;
        const response = yield httpsGetPromise(apiUrl);
        const transactions = response.result;
        const uniqueWallets = new Set();
        console.log("======start======");
        console.log("scanning wallet: ", wallet);
        console.log("transactionslog:", transactions);
        console.log("======end======");
        transactions.forEach(tx => {
            uniqueWallets.add(tx.from);
            uniqueWallets.add(tx.to);
        });
        const nextTransactions = [];
        for (let nextWallet of uniqueWallets) {
            if (nextWallet !== wallet) {
                const result = yield scanWallet(nextWallet, depth - 1);
                nextTransactions.push(...result);
            }
        }
        return transactions.concat(nextTransactions);
    });
}
function httpsGetPromise(url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', err => reject(err));
    });
}
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(`EVENT: ${JSON.stringify(event)}`);
    try {
        const depth = parseInt(((_a = event.queryStringParameters) === null || _a === void 0 ? void 0 : _a.depth) || '1');
        const raw_transactions = yield scanWallet(walletAddress, depth);
        const nodes = Array.from(walletLabelIdMaps).map(([wallet, id]) => ({
            id,
            label: wallet,
            group: wallet === walletAddress ? 0 : 1,
            title: wallet,
        }));
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
