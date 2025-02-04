import { Address } from "../value-object/address";

export default class Customer {
  
  private _id: string;
  private _name: string;
  private _address!: Address; // "The _address! -> ! means that can inicialize empty (blank)"
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate(); // A entidade se AUTO valida
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get Address(): Address {
    return this._address;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  set Address(address: Address) {
    this._address = address;
    this.validate();
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  isActive(): boolean {
    return this._active;
  }

  validate() {
    if (this._id.length == 0) {
      throw new Error("ID cannot be null");
    }
    if (this._name.length == 0) {
      throw new Error("name cannot be null");
    }
  }

  // Mudança de regra de negócio...
  changeName(name: string): void {
    this._name = name;
    this.validate(); // A entidade se AUTO validando
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

}
