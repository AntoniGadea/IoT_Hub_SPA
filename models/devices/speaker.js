import {speakerCard} from "../../templates/templates.js"
export {Speaker};

class Speaker{
    constructor(id,type,name,status,volume,brand){
        this.id = id;
        this.brand = brand;
        this.name = name;
        this.status = status;
        this.type = type;
        this.volume = volume;
        this.card = speakerCard;

        if(this.volume == null){
            this.volume = (Math.floor(Math.random()*100)).toString();
        }

        if(this.status == null){
            this.status = "on";
        }
    }
}