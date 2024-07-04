import { Schema, model } from "mongoose";

const nameCollection = "producto";

const ProductSchema = new Schema({
    title: { type:String, required:[true, 'El titulo del producto es obligatorio']},
    description: { type:String, required:[true, 'La descripcion del producto es obligatorio']},
    code: { type:String, required:[true, 'El code del producto es obligatorio']},
    price: { type:Number, required:[true, 'El precio del producto es obligatorio']},
    status: { type:Boolean, default:true},
    stock: { type:Number, required:[true, 'El Stock del producto es obligatorio']},
    category: { type:String, required:[true, 'La categoria del producto es obligatorio']},
    thumbnails: { type:String}
});
