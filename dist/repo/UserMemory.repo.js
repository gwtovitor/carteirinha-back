"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserRepoMemory {
    users;
    constructor() {
        this.users = [];
    }
    findById(id) {
        throw new Error('Method not implemented.');
    }
    update(user) {
        return new Promise((resolve, reject) => {
            const index = this.users.findIndex((u) => {
                return u.id.get() === user.id.get();
            });
            if (index !== -1) {
                this.users[index] = user;
                return resolve();
            }
            reject(new Error(`User not found`));
        });
    }
    create(user) {
        return new Promise((resolve) => {
            this.users.push(user);
            resolve();
        });
    }
    findByEmail(email) {
        return new Promise((resolve) => {
            const found = this.users.find((item) => item.getEmail() == email);
            resolve(found);
        });
    }
}
exports.default = UserRepoMemory;
