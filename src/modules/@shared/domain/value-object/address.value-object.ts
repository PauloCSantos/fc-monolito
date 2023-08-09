import ValueObject from "./value-object.interface";

type AddressProps = {
  city: string;
  street: string;
  number: string;
  zipCode: string;
  complement: string;
  state: string;
};

export default class Address implements ValueObject {
  private _city: string;
  private _street: string;
  private _number: string;
  private _zipCode: string;
  private _complement: string;
  private _state: string;

  constructor(props: AddressProps) {
    this._city = props.city;
    this._street = props.street;
    this._number = props.number;
    this._zipCode = props.zipCode;
    this._complement = props.complement;
    this._state = props.state;
  }

  get city(): string {
    return this._city;
  }

  get street(): string {
    return this._street;
  }

  get number(): string {
    return this._number;
  }

  get zipCode(): string {
    return this._zipCode;
  }

  get complement(): string {
    return this._complement;
  }

  get state(): string {
    return this._state;
  }
}
