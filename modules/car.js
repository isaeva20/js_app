const CarSpace = {
    brand: null,
    model: null,
    year: null,

    getInfo(){
        console.log(`Car "${this.brand}", "${this.model}" of the "${this.year}" year`);
    }
};

// CarSpace.Car = class Car {
//     constructor(brand, model, year) {
//         this.brand = brand;
//         this.model = model;
//         this.year = year;
//     }

//     getInfo(){
//         console.log(`Car "${this.brand}", "${this.model}" of the "${this.year}" year`)
//     }
// }

export default CarSpace;