import { Schema, model } from "mongoose";

const nameCollection = "products";  // Nombre de la colección más adecuado

const ProductSchema = new Schema({
    title: { type: String, required: [true, 'El título del producto es obligatorio'] },
    description: { type: String, required: [true, 'La descripción del producto es obligatoria'] },
    code: { type: String, required: [true, 'El código del producto es obligatorio'] },
    price: { type: Number, required: [true, 'El precio del producto es obligatorio'] },
    status: { type: Boolean, default: true },
    stock: { type: Number, required: [true, 'El stock del producto es obligatorio'] },
    category: { type: String, required: [true, 'La categoría del producto es obligatoria'] },
    thumbnails: { type: [String] }  // Cambiado a un arreglo de cadenas
});

ProductSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

export const productModel = model(nameCollection, ProductSchema);
