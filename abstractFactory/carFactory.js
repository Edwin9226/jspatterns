/**
 *  we have different cars, but all of them have some similar behavior, and similar properties 
 * define Vehicle 
 * @abstract
 *  */

class Vehicle {
    constructor() {
        if (this.constructor === Vehicle) throw new Error(' FYI: Instance of Abstract Class cannot be instantiated')
    }

    turnOn() {
        throw new Error('FYI: Abstract Method cannot be call');
    }
}

/**
 * @extends Vehicle
 */

class Car extends Vehicle {
    constructor() {
        super();
        this.name = 'Car';
        this.wheels = 4;

    }

    turnOn() {
        console.log('Chakabum');
    }
}

/**
 * @extends Vehicle
 */
class Truck extends Vehicle {
    constructor() {
        super();
        this.name = 'Truck';
        this.wheels = 6;

    }

    turnOn() {
        console.log('RRRRRRRRRRUUUUUUUUUUURRRRRRRRR');
    }
}

/**
 * @extends Vehicle 
 */

class Motorcycle extends Vehicle {
    constructor() {
        super();
        this.name = 'Motorcycle';
        this.wheels = 2;

    }

    turnOn() {
        console.log('SSSSSSSSSSShhhhhhhhh');
    }
    // turnOn() {
    //     console.log('SSSSSSSSSSShhhhhhhhh');
    // }
}

const vehicleFactory = {
    createVehicle: function (type) {
        switch (type) {
            case 'car':
                return new Car();
                break;
            case 'truck':
                return new Truck();
                break;
            case 'motorcycle':
                return new Motorcycle();
                break;
            default:
                return 'nothing method';
        }
    }
};

const car = vehicleFactory.createVehicle('car');
const truck = vehicleFactory.createVehicle('truck');
const motorcycle= vehicleFactory.createVehicle('motorcycle');

car.turnOn();
console.log(car.name);
truck.turnOn();
console.log(truck.name);
motorcycle.turnOn();
console.log(motorcycle.name);
console.log(motorcycle.wheels);