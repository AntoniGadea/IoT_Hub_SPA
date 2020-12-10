export {Light};
import {lightCard} from "../../templates/templates.js";

class Light{
    constructor(id,type,name,status,bright,maxbright,rgb,color,power,brand){
        this.id = id;
        this.name =name;
        this.status = status;
        this.type = type;
        this.bright = bright;
        this.maxbright = maxbright;
        this.color = color;
        this.power = power;
        this.rgb = rgb;
        this.brand = brand;
        this.card = lightCard;
    }

    on(){
        this.status = "on";
    }

    off(){
        this.status = "off";
    }

    changeColor(color){
        if(this.status == "on"){
            if(this.rgb == 1)
                this.color = color;
            else
                alert("This light is not RGB");
        }else{
            alert("Turn on the light first");
        }
    }

}
