import Address from "./address";

export default class Customer {

    private _id: string;
    private _name: string;
    private _address!: Address;
    private _activated:boolean = false;
    private _rewardPoints: number = 0;


    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;

        this.validate();
    }

    get name(): string {
        return this._name;
    }

    get id(): string {
        return this._id;
    }

    get activated(): boolean {
        return this._activated;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    isActive(): boolean {
        return this._activated;
    }

    validate(): boolean {
        if (this._name.length < 3) {
            throw new Error("Invalid customer name");
        }   
        if (this._id.length === 0) {
            throw new Error("Invalid customer id");
        }

        return true;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    get address() {
        return this._address;
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Invalid address");
        }

        this._activated = true;
    }

    deactivate() {
        this._activated = false;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    
}