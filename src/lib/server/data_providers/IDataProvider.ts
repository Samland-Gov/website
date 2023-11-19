export default interface IDataProvider<Resource extends {id: string, data: any}>{
    createData: (resource: Resource) => Promise<void>;
    readData: (args: {id: string, matchField: string}) => Promise<Resource | undefined>;
    updateData: (args: {id: string, resource: Resource}) => Promise<void>;
    deleteData: (id: string) => Promise<void>;
}
