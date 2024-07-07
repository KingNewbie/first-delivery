import { Schema, model } from "mongoose";

const nameCollection = "car";

const CarSchema = new Schema({
    products:[
        {id: { 
            type:Schema.Types.ObjectId, 
            ref: 'producto',
        },
        quantity: { 
            type:Number, 
            required:[true, 'La cantidad del producto es obligatoria']
        }}
    ]
});

export const CarModel = model(nameCollection, CarSchema);