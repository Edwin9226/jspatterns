/**
 * @abstract
 */

class MapSite{

    enter(){
        throw new Error('NOt defined in Subclass ')
    }
}

/***
 * @extends Mapsite
 */

class Wall extends MapSite{

    enter(){
        console.log('Auch! You bump into a Wall');
    }
}

/**
 * @extends MapSite
 */

class Room extends MapSite{
    constructor(roomNumber){
        super();
        this.sides= {
            north: null,
            south: null,
            east: null,
            west: null
        };

        this.roomNumber= roomNumber;

    }

    getSide(direction){
        return this.sides[direction];
    }

    setSide(direction, mapSide){
       this.sides[direction]= mapSide; 
    } 

    enter(){
        console.log(`You are the room: ${this.roomNumber}`);

    }

}

/**
 * @extends Mapsite
 */

class Door extends MapSite{
    constructor(roomOne, roomTwo) {
        super();
        this.roomOne= roomOne;
        this.roomTwo= roomTwo;
        this.isOpen = false;
    }
    enter(currentRoom){
        if(this.isOpen)
        {
            const room = this.getNextRoom(currentRoom);
            room.enter();
        }else{
            console.log(' Auch! You bumped your node on the door');
        }
    }

    open(){
        console.log(`You open the room`);
        this.isOpen= true;
    }

    getNextRoom(currentRoom){
        let nextRoom = null;
        if(this.roomOne.roomNumber === currentRoom)
        {
            nextRoom= this.roomTwo;
        }else if (this.roomTwo.roomNumber === currentRoom){
            nextRoom = this.roomOne;
        }
        return nextRoom;

    }
}

class Maze{
     constructor(){
        this.rooms= [];
     }

     addRoom(room){
        this.rooms.push(room);
     }

     getRoom(roomNumber){
        return this.rooms.find((room)=> (room.roomNumber === roomNumber));
     }
}

class MazeGame {
    constructor(){
        this.currentRoom= null;
    }

    tryDirection(direction, action){
        const targetDir = this.currentRoom.getSide(direction);

        if(action){
            console.log(`--- trying to make action: ${action} on direction: ${direction}`);

            if(action ==='open' && targetDir instanceof Door){
                targetDir.open();
            }else{
                console.log(`You can´t open that`);

        }
        return;
        }
        console.log(`trying to got to ${direction}`);
        const newRoom= targetDir.enter(this.currentRoom.roomNumber);
        if(newRoom){
            this.currentRoom = newRoom;
        }
    }

    getCurrentRoom(){
        this.currentRoom.enter();
        return this.currentRoom;
    }

    createMaze(){
        const aMaze= new Maze();
        const r1= new Room(1);
        const r2= new Room(2);
        const door = new Door(r1, r2);
        aMaze.addRoom(r1);
        aMaze.addRoom(r2);

        // set sides of the rooms 

        r1.setSide('north', new Wall());
        r1.setSide('east', door);
        r1.setSide('south', new Wall());
        r1.setSide('west', new Wall());
        
        r1.setSide('north', new Wall());
        r1.setSide('east', new Wall());
        r1.setSide('south', new Wall());
        r1.setSide('west', door);
        
        this.currentRoom = r1;
        return aMaze;
    }
}

/**
 * @abstract
 */

class MazeBuilder {
 constructor(){}
 buildMaze(){}
 buildRoom(){}
 buildDoor(){}
 getMaze(){}

}

/**
 * @extends MazeBUilders
 */
class StandarMazeBuilder extends MazeBuilder{
    constructor(){
        super();
        this._currenMaze=null;
    }

    buildMaze (){
        this._currenMaze= new Maze();
        return this;
    }

    buildRoom(id){
        if(!this._currenMaze.getRoom(id)){
            const room= new Room(id);
            room.setSide('north', new Wall());
            room.setSide('east',  new Wall());
            room.setSide('south', new Wall());
            room.setSide('west', new Wall());
            this._currenMaze.addRoom(room);
            return this;
        }
    }
    buildDoor(id1, dir1 , id2, dir2){
        const r1= this._currenMaze.getRoom(id1);
        const r2= this._currenMaze.getRoom(id2);
        const door= new Door(r1,r2);
        r1.setSide(dir1, door);
        r2.setSide(dir2, door);
        return this;
    }

    getMaze(){
        return this._currenMaze;
    }
}

class BuilderMazeGame extends MazeGame{
    createMaze(builder){
        const maze= builder.buildMaze().buildRoom(1).buildRoom(2).buildDoor(1,'east',2, 'west').getMaze();
        this.currentRoom= maze.getRoom(1);
        return maze;
    }
}


console.log('---------------------- GAME IS BEGINING ---------------');

const builderGame= new BuilderMazeGame();
const builder= new StandarMazeBuilder();
const maze= builderGame.createMaze(builder);

builderGame.getCurrentRoom();
builderGame.tryDirection('north');
builderGame.tryDirection('east');
builderGame.tryDirection('south','open');
builderGame.tryDirection('east', 'open');
builderGame.tryDirection('east');
builderGame.tryDirection('west');

/**
 * while mike a builder, I suggest an abstract builder for others builders. 
 */