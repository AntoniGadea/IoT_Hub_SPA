export {User};

class User{
    constructor(nick,nombre,passwd){
        this.nick = nick;
        this.nombre = nombre;
        this.passwd = CryptoJS.SHA3(passwd);
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