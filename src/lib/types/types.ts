export type BookType = {
    id?: number,
    name: string,
    price: string,
    category: BookCategory,
    description: string
}

export type BookFormType = {
    name: string,
    price: number,
    category: string,
    description: string
}

export type BookCategory = {
    id: number,
    name: string
}