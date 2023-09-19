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
    category:{
        id:number,
        name: string;
    }
    price: number;
    qty: number;
    modified: Date;
    delete_item: boolean;
}

export type Transaction={
    id: number;
    transaction_date: Date;
    total_price: number;
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

export type Category={
    id: number;
    name: string;
    delete_category: boolean;
}


export type chartType = {
    labels: string[],
    datasets:[{
      label: string,
      data: number[]
    }]
  }