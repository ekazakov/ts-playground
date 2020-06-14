export interface Person {
    name: string
}

export interface SocialNetwork {
    title: string,
    getUsers(): Person[]
}