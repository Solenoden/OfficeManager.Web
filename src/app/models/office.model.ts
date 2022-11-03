import { OfficeMember } from './office-member.model'

export class Office {
    id: number
    name: string
    address: string
    phoneNumber: string
    emailAddress: string
    maximumCapacity: number
    colour: string
    officeMembers: OfficeMember[]

    constructor(jsonObject: {
        id?: number,
        name?: string,
        address?: string,
        phoneNumber?: string,
        emailAddress?: string,
        maximumCapacity?: number,
        colour?: string,
        officeMembers?: { [key: string]: any }[],
    }) {
        this.id = jsonObject.id
        this.name = jsonObject.name
        this.address = jsonObject.address
        this.phoneNumber = jsonObject.phoneNumber
        this.emailAddress = jsonObject.emailAddress
        this.maximumCapacity = jsonObject.maximumCapacity
        this.colour = jsonObject.colour
        this.officeMembers = (jsonObject.officeMembers && jsonObject.officeMembers.map(x => new OfficeMember(x))) || []
    }
}