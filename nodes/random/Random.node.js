"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const axios_1 = __importDefault(require("axios"));
class Random {
    constructor() {
        this.description = {
            displayName: 'True Random Number Generator',
            name: 'random',
            icon: 'file:random.svg',
            group: ['transform'],
            version: 1,
            description: 'Gera número aleatório usando random.org',
            defaults: { name: 'True Random Number Generator' },
            inputs: ['main'],
            outputs: ['main'],
            properties: [
                { displayName: 'Min', name: 'min', type: 'number', default: 1 },
                { displayName: 'Max', name: 'max', type: 'number', default: 100 },
                { displayName: 'Campo de Saída', name: 'outputField', type: 'string', default: 'random' }
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const out = [];
        for (let i = 0; i < Math.max(1, items.length); i++) {
            try {
                const min = this.getNodeParameter('min', i);
                const max = this.getNodeParameter('max', i);
                const outputField = this.getNodeParameter('outputField', i);
                if (!Number.isInteger(min) || !Number.isInteger(max)) {
                    throw new Error('Min/Max devem ser inteiros.');
                }
                if (max < min)
                    throw new Error('Max deve ser >= Min.');
                const resp = await axios_1.default.get(`https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`);
                const value = Number.parseInt(String(resp.data).trim(), 10);
                if (Number.isNaN(value))
                    throw new Error(`Resposta inesperada: ${resp.data}`);
                const base = items[i]?.json ?? {};
                out.push({ json: { ...base, [outputField]: value, _min: min, _max: max } });
            }
            catch (err) {
                throw new n8n_workflow_1.NodeOperationError(this.getNode(), err);
            }
        }
        return [out];
    }
}
exports.Random = Random;
