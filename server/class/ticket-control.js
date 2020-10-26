const fs = require('fs')

class Ticket{
    constructor(numero, escritorio){
        this.numero = numero
        this.escritorio = escritorio
    }
}


class TicketControl{

    constructor(){
        this.ultimo = 0
        this.hoy = new Date().getDate()
        this.ticketsPendientes = []
        this.ultimos4 = []


        let data = require('../data/data.json')
        
        if(data.hoy === this.hoy){
            this.ultimo = data.ultimo
            this.ticketsPendientes = data.ticketsPendientes
            this.ultimos4 = data.ultimos4
        }else{
            this.reiniciarConteo()
        }
    }

    siguienteTicket(){
        this.ultimo += 1
        let ticket = new Ticket(this.ultimo, null);
        this.ticketsPendientes.push(ticket)

        this.grabarArchivo()
        return `Ticket: ${this.ultimo}`
    }

    getUltimoTicket(){
        return `Ticket: ${this.ultimo}`
    }

    getUltimos4(){
        return this.ultimos4
    }

    atenderTicket(escritorio){
        //verifico si hay tickets penientes en el arreglo 
        if(this.ticketsPendientes.length === 0){
            return 'No hay tickets pendientes!'
        }

        //obtengo el primer ticket del arreglo
        let numeroTicket = this.ticketsPendientes[0].numero
        //despues de obtenerlo, lo elimino del arreglo
        this.ticketsPendientes.shift()

        //creo una nueva instancia de ticket con el numero de escritorio que recibimos 
        let atenderTicket = new Ticket(numeroTicket, escritorio)
        //lo agregamos al inicio del arreglo de los ultimos 4
        this.ultimos4.unshift(atenderTicket)

        //verificamos que solo existan los ultimos cuatro dentro del arreglo
        if(this.ultimos4.length > 4){
            this.ultimos4.splice(-1,1) //borra el ultimo elemento
        }

        //grabamos en el archivo
        this.grabarArchivo()
        return atenderTicket
    }

    reiniciarConteo(){
        this.ultimo = 0
        this.ticketsPendientes = []
        this.ultimos4 = []
        console.log('Se ha inicializado el Sistema')
        this.grabarArchivo()
    }

    grabarArchivo(){

        let jsonData = {
            ultimo : this.ultimo,
            hoy : this.hoy,
            ticketsPendientes : this.ticketsPendientes,
            ultimos4 : this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData)

        fs.writeFileSync('./server/data/data.json', jsonDataString)
    }
}

module.exports = {
    TicketControl
}