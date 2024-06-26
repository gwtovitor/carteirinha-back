"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class UUID {
    value;
    constructor(uuid) {
        if (uuid == undefined || uuid == null)
            throw new Error('A UUID must have 36 characters');
        if (uuid.length < 36)
            throw new Error('A UUID must have 36 characters');
        this.value = uuid;
    }
    static create() {
        return new UUID((0, crypto_1.randomUUID)());
    }
    static build(uuid) {
        return new UUID(uuid);
    }
    get() {
        return this.value;
    }
}
exports.default = UUID;
