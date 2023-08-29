export type Cart = {
    id: number;
    item_id: number;
    qty: number;
    item:{
        name:string;
        price: number
}}
    
export type Item = {
    id: number;
    name: string;
    category: string;
    price: number;
    qty: number;
    modified: Date;
    isDeleted: boolean;
}

export type Transaction={
    id: number;
    date: Date;
    totalPrice: number;
    transaction_details:{
        id: number;
        item_id: number;
        transaction_id: number;
        qty: number;
        current_price: number;
        item:{
            name: string;
            price: number;
        }
    }[]

}
