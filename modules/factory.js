const FactorySpace = {
    title: null,
    phone: null,
    countOfCar: [],

    getInfo(){
        return `${this.name} - ${this.phone}`;
    },

    createNewCar(car){
        this.countOfCar.push(car);
        return this.countOfCar;
        // console.log(`Машина ${car.brand} выпущена`)
    },

    utilise(car){
        this.countOfCar = this.countOfCar.filter((c) => c !== car);
        console.log(`Машина ${car.brand} утилизирована`)
    },

    updateCar(year){
        this.car.year = year;
        return this.car;
    },

    listOfCar(){
        this.countOfCar.forEach((car) => {
        console.log(`${car.brand}, ${car.model}, ${car.year}`);
        });
    }
};

// FactorySpace.Factory = class Factory{
//     constructor(title, phone){
//        this.title = title;
//        this.phone = phone;
//        this.countOfCar = [];
//     }
//     getInfo(){
//         return `${this.name} - ${this.phone}`;
//     }
//     createNewCar(car){
//         this.countOfCar.push(car);
//         console.log(`Машина ${car.brand} выпущена`)
//     }
//     utilise(car){
//         this.countOfCar = this.countOfCar.filter((c) => c !== car);
//         console.log(`Машина ${car.brand} утилизирована`)
//     }
//     updateCar(year){
//         this.car.year = year;
//         return this.car;
//     }
//     listOfCar(){
//         this.countOfCar.forEach((car) => {
//         console.log(`${car.brand}, ${car.model}, ${car.year}`);
//         });
//     }
// }

export default FactorySpace;
