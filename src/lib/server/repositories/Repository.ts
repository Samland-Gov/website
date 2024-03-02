import type IDataProvider from "../data_providers/IDataProvider";

export default class Repository<Resource extends { id: string, data: any }> {
    protected _provider: IDataProvider<Resource>;

    constructor(args: {provider: IDataProvider<Resource>}) {
        this._provider = args.provider;
    };

    public get provider(): IDataProvider<Resource> {
        return this._provider;
    }
}