const CarShowroomSpace = {};

CarShowroomSpace.carShowroom = class carShowroom extends FactorySpace.Factory{
    constructor(title, phone){
        super(title, phone);
    }
    getInfo(){
        return `title ${this.title} located at ${this.address} presented ${this.countOfCar}`;
    }
}

export default CarShowroomSpace.carShowroom;