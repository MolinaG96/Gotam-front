import type IEmployee from './IEmployee'

export default interface IAreas {
    _id: string
    area: string
    employees: IEmployee[]
}
