import type IDataProvider from "../data_providers/IDataProvider";
import Repository from "./Repository";
import CloudflareKVDataProvider from "../data_providers/CloudflareKVDataProvider";
import { uuid } from '@cfworker/uuid';

type UserData = {
    email: string,
    full_name: string,
    password: string,
    createdAt: string,
    updatedAt: string
};

export class UserResource {
    private _id: string;

    constructor(private _data: UserData) {
        this._id = uuid();
    };

    public get id(): string {
        return this._id;
    }

    public get data(): UserData {
        return this._data;
    }
}

export class UserRepository extends Repository<UserResource> {
    constructor(args: {provider: IDataProvider<UserResource>}) {
        super({provider: args.provider});
    }

    public async createUser(user: UserResource) {
        await this.provider.createData(user);
        return;
    }

    public async getUserBy(args: {id: string, matchField: string}) {
        return this.provider.readData({id: args.id, matchField: args.matchField});
    }
}

function getRepository(kv: KVNamespace): UserRepository {
    const dataProvider = new CloudflareKVDataProvider<UserResource>(kv);
    const userRepository = new UserRepository({provider: dataProvider});
    return userRepository;
}

export default getRepository;