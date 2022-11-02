export class Office {
    id: number
    name: string
    address: string
    phoneNumber: string
    emailAddress: string
    maximumCapacity: number
    colour: string

    constructor(jsonObject: {
        id?: number,
        name?: string,
        address?: string,
        phoneNumber?: string,
        emailAddress?: string,
        maximumCapacity?: number,
        colour?: string
    }) {
        this.id = jsonObject.id
        this.name = jsonObject.name
        this.address = jsonObject.address
        this.phoneNumber = jsonObject.phoneNumber
        this.emailAddress = jsonObject.emailAddress
        this.maximumCapacity = jsonObject.maximumCapacity
        this.colour = jsonObject.colour
    }
}