export {User};
import {userCard} from '../templates/templates.js';

class User{
    constructor(nickname,name,rank,passwd){
        this.nickname = nickname;
        this.name = name;
        this.rank = rank;
        this.passwd = CryptoJS.SHA3(passwd);
        this.card = userCard;
    }

    getNick(){
        return this.nick;
    }

    setNick(nick){
        this.nick = nick;
    }

    getNombre(){
        return this.nombre;
    }

    setNombre(nombre){
        this.nombre = nombre;
    }

    getPasswd(){
        return this.passwd;
    }

    setPasswd(passwd){
        this.passwd = passwd;
    }
}