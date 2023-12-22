
type NumberString = string | number

export type Books = {
    _id?: number | string,
    author?: string,
    publishYear?: NumberString,
    title?: string,
    createdAt?: NumberString,
    updatedAt?: NumberString,
}