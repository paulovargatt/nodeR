"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [
    { id: '1', name: 'Paulo', email: 'pvargatt@gmail.com' },
    { id: '2', name: 'asda', email: 'adssa@gmail.com' }
];
class User {
    static findAll() {
        return Promise.resolve(users);
    }
    static findById(id) {
        return new Promise(resolve => {
            const filter = users.filter(user => user.id === id);
            let user = undefined;
            if (filter.length > 0) {
                user = filter[0];
            }
            resolve(user);
        });
    }
}
exports.User = User;
