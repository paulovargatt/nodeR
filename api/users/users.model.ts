const users = [
    {id: '1', name: 'Paulo', email: 'pvargatt@gmail.com'},
    {id: '2', name: 'asda', email: 'adssa@gmail.com'}
]

export class User {
    static findAll(): Promise<any[]>{
        return Promise.resolve(users)
    }

    
    static findById(id: string):Promise<any>{
        return new Promise(resolve => {
            const filter = users.filter(user => user.id === id)
            let user = undefined
            if(filter.length > 0) {
                user = filter[0]
            }
            resolve(user)
        })
    }
}