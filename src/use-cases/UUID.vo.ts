import { randomUUID } from 'crypto'

export default class UUID{

    private value: string

    private constructor(uuid:string){
        if( uuid == undefined || uuid == null ) throw new Error('A UUID must have 36 characters')
        if(uuid.length < 36) throw new Error('A UUID must have 36 characters')
        this.value = uuid
    }

    static create(){
        return new UUID(randomUUID())
    }

    static build(uuid:string){
        return new UUID(uuid)
    }

    get(){
        return this.value
    }

}