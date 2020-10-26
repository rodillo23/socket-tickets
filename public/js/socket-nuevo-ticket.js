//comando para establecer la conexion
var socket = io()

var label = $('#lblNuevoTicket')

socket.on('connect', function(){
    console.log('Conectado al Server')
})

socket.on('disconnect', function(){
    console.log('Desconectado del Server')
})

$('button').on('click', function(){
    socket.emit('siguienteTicket', null, function(resp){
        console.log(resp)
        label.text(resp)
    })
})

socket.on('estadoActual', function(estado){
    label.text(estado.actual)
})