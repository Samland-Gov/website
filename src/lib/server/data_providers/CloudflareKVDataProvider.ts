import type IDataProvider from "./IDataProvider";

export default class CloudflareKVDataProvider<Resource extends { id: string, data: any }> implements IDataProvider<Resource> {
    private kvNamespace: KVNamespace;

    constructor(kvNamespace: KVNamespace) {
        this.kvNamespace = kvNamespace;
    }

    public async createData(resource: Resource) {
        await this.kvNamespace.put(resource.id, JSON.stringify(resource.data));
    }

    public async readData(args: { id: string, matchField: string }): Promise<Resource | undefined> {
        const listResult = await this.kvNamespace.list();
        
        for (const { name: key } of listResult.keys) {
            const storedValue = await this.kvNamespace.get(key);

            if (storedValue) {
                const data = JSON.parse(storedValue);

                if (data[args.matchField] === args.id) {
                    return { id: key, data } as Resource;
                }
            }
        }

        return undefined;
    }


    public async updateData(props: { id: string; resource: Resource; }) {
        const { id, resource } = props;
        await this.kvNamespace.put(id, JSON.stringify(resource.data));
    }

    public async deleteData(id: string) {
        await this.kvNamespace.delete(id);
    }
}


// export class InMemoryDataProvider<Resource extends {id: string, data: any}> implements IDataProvider<Resource> {
//     private _data: Resource[];
    
//     constructor() {
//         this._data = [];
//     };

//     public async createData(resource: Resource) {
//         this._data.push(resource);
//         return;
//     }

//     public async readData(args: {id: string, matchField: string}) {
//         return this._data.filter(x => x.data[args.matchField] === args.id)[0];
//     };

//     public async updateData(props: { id: string; resource: Resource; }) {
//         const {id, resource} = props;
//         for(const datum of this._data) {
//         if(datum.id === id) {
//             datum.data = resource.data;
//         }
//         }

//         return;
//     };

//     public async deleteData(id: string) {
//         this._data = this._data.filter(datum => datum.id !== id);
//         return;
//     };
// }