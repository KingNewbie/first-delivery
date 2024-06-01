import { promises as fs } from 'fs';
import { nanoid } from 'nanoid';

class CarManager {
    constructor() {
        this.path = "./src/models/cars.json";
    }

    writeCars = async (car) => {
        try {
            let cars = await fs.readFile(this.path, 'utf-8');
            let carsParse = JSON.parse(cars);
            car.id = nanoid();
            let carAll = [...carsParse, car];
            await fs.writeFile(this
                .path, JSON.stringify(carAll, null, 2));
            return "Car added successfully!";
        }
        catch (error) {
            console.error('Error writing cars:', error);
            throw new Error('Unable to write cars');
        }
    }

    getCars = async () => {
        try {
            let cars = await fs.readFile(this.path, 'utf-8');
            let carsParse = JSON.parse(cars);
            return carsParse;
        }
        catch (error) {
            console.error('Error reading cars:', error);
            throw new Error('Unable to read cars');
        }
    }

    getCarById = async (id) => {
        try {
            let cars = await fs.readFile(this.path, 'utf-8');
            let carsParse = JSON.parse(cars);
            let carById = carsParse
                .find(car => car.id === id);
            return carById;
        }
        catch (error) {
            throw new Error('Unable to read cars');
        }
    }


    updateCar = async (id, car) => {
        try {
            let cars = await fs.readFile(this.path, 'utf-8');
            let carsParse = JSON.parse(cars);
            let carIndex = carsParse.findIndex(car => car.id === id);
            if (carIndex === -1) {
                return "Car not found!";
            }
            carsParse[carIndex] = { ...carsParse[carIndex], ...car };
            await fs.writeFile(this.path, JSON.stringify(carsParse, null, 2));
            return "Car updated successfully!";
        }
        catch (error) {
            throw new Error('Unable to update car');
        }
    }


    deleteCar = async (id) => {
        try {
            let cars = await fs.readFile(this.path, 'utf-8');
            let carsParse = JSON.parse(cars);
            let carIndex = carsParse.findIndex(car => car.id === id);
            if (carIndex === -1) {
                return "Car not found!";
            }
            carsParse.splice(carIndex, 1);
            await fs.writeFile(this.path, JSON.stringify(carsParse, null, 2));
            return "Car deleted successfully!";
        }
        catch (error) {
            throw new Error('Unable to delete car');
        }
    }
}

export default new CarManager();