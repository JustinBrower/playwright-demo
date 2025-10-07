export type Shoe = {
    name: string;
    size: number[];
    price: number;
    imageUrl: string;
    category: string;
    brand: string;
    color: string;
    material: string;
    inStock: number | boolean;
};

export type Cart = {
    items: Shoe[];
};

export type Order = {
    id: string;
    date: string;
    items: Shoe[];
    status: Status;
};

export type Status = 'Approved' | 'Cancelled';