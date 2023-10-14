import IEmployee from './IEmployee'

export default interface IArea {
    _id: string
    area: string
    employees: IEmployee[]
}
