export class Car{
    constructor(brand, model, year){
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
}

export class Factory{
    constructor(title, phone){
       this.title = title;
       this.phone = phone;
       this.countOfCar = [];
    }
    getInfo(){
        return `${this.name} - ${this.phone}`;
    }
    createNewCar(car){
        this.countOfCar.push(car);
        console.log(`Машина ${car.brand} выпущена`)
    }
    utilise(car){
        this.countOfCar = this.countOfCar.filter((c) => c !== car);
        console.log(`Машина ${car.brand} утилизирована`)
    }
    updateCar(year){
        this.car.year = year;
        return this.car;
    }
    listOfCar(){
        this.countOfCar.forEach((car) => {
        console.log(`${car.brand}, ${car.model}, ${car.year}`);
        });
    }
}

export class carShowroom extends Factory{
    constructor(title, phone){
        super(title, phone);
    }
    getInfo(){
        return `title ${this.title} located at ${this.address} presented ${this.countOfCar}`;
    }
}

// car = new Car('BMW', 'x7', 2019);
// factory = new Factory('BMW', '03020022');
// shop = new carShowroom('JDJ', '03202');
// factory.createNewCar(car);
// factory.listOfCar();
