export class OfficeMember {
    id: number
    officeId: number
    firstName: string
    lastName: string
    avatarId: number

    constructor(jsonObject: {
        id?: number,
        officeId?: number,
        firstName?: string,
        lastName?: string,
        avatarId?: number
    }) {
        this.id = jsonObject.id
        this.officeId = jsonObject.officeId
        this.firstName = jsonObject.firstName
        this.lastName = jsonObject.lastName
        this.avatarId = jsonObject.avatarId
    }
}