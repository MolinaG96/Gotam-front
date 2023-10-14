import IEmployeeProp from '../interfaces/props/IEmployeeProp'

const EmployeeCard: React.FC<IEmployeeProp> = ({ employee, key }) => {
    return (
        <div
            key={employee._id}
            className="employee-card font-disketMonoBold text-[1vw] border-t-2 border-b-2 border-black mt-[0.3vw]"
        >
            <div className="flex flex-row items-center">
                <h2 className="p-4 text-center max-w-[13.5vw] w-[13.5vw]">
                    {employee.name}
                </h2>
                <p className="p-4 text-center max-w-[9.3vw] w-[9.3vw] ">
                    {employee.dni}
                </p>
                <p className="p-4 text-center max-w-[11.3vw] w-[11.3vw]">
                    {employee.birthday}
                </p>
                <p className="p-4 text-center max-w-[11.4vw] w-[11.4vw]">
                    {employee.developer ? 'Si' : 'No'}
                </p>
                <p className="p-4 text-center max-w-[12.3vw] w-[12.3vw]">
                    {employee.area}
                </p>
                <p className="p-4 text-center max-w-[21.4vw] w-[21.4vw]">
                    {employee.description}
                </p>
            </div>
        </div>
    )
}

export default EmployeeCard
