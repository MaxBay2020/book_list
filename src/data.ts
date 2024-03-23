import {BookCategory} from "./lib/types/types";

type navLinkType = {
    name: string,
    path: string
}

export const navLinks: navLinkType[] = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Books',
        path: '/books'
    }
]

export const bookCategories: BookCategory[] = [
    {
        id: 1,
        name: 'Action'
    },
    {
        id: 2,
        name: 'Biography'
    },
    {
        id: 3,
        name: 'History'
    },
    {
        id: 4,
        name: 'Horror'
    },
    {
        id: 5,
        name: 'Kids'
    },
    {
        id: 6,
        name: 'Learning'
    },
    {
        id: 7,
        name: 'Sci-Fi'
    }
]

export const bookTableHeaders = ['name', 'price', 'category']

export const bookList = [
    {
        "id": 1,
        "name": "1984",
        "price": "19",
        "category": {
            "id": 1,
            "name": "Action"
        },
        "description": "A good book worthy to read."
    },
    {
        "id": 2,
        "name": "To Kill a Mockingbird",
        "price": "31",
        "category": {
            id: 7,
            name: 'Sci-Fi'
        },
        "description": "A epic battle that captivates and entertains."
    },
    {
        "id": 3,
        "name": "The Legend of Dreams",
        "price": "41",
        "category": {
            id: 5,
            name: 'Kids'
        },
        "description": "A mysterious journey that captivates and entertains."
    },
    {
        "id": 4,
        "name": "Brave New World",
        "price": "36",
        "category": {
            id: 2,
            name: 'Biography'
        },
        "description": "A compelling narrative and a beautiful story that weaves Brave New World's complex characters with magical realism."
    },
    {
        "id": 5,
        "name": "The Catcher in the Rye",
        "price": "18",
        "category": {
            id: 4,
            name: 'Horror'
        },
        "description": "A romantic saga that captivates and entertains."
    },
    {
        "id": 6,
        "name": "The Quest of Light",
        "price": "34",
        "category": {
            id: 6,
            name: 'Learning'
        },
        "description": "A time-traveling escapade that captivates and entertains."
    }
]