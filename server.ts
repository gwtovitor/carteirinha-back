// import * as http from 'http'
// import AppInstance from './app'

// const app = AppInstance.app
// const port = normalizePort(process.env.PORT || '8081')
// app.set('port', port)

// const server = http.createServer(app)

// //Socket
// import { Server } from 'socket.io'
// import EscapeLive from '@entities/games/escape-live/sockets/escape-live'
// import SalaMagia from '@entities/games/sala-magia/sala-magia'

// const io = new Server(server, {
//     path: '/socket.io',
//     cors: {
//         origin: '*',
//         credentials: true,
//         methods: ['GET', 'POST'],
//     },
// })

// // io.on('connection', (socket: any) => {})

// SalaMagia(server)
// EscapeLive(server)

// server.listen(port)
// server.on('error', onError)
// server.on('listening', onListening)

// export { io }

// /**
//  * Normalize a port into a number, string, or false.
//  */

// function normalizePort(val: any) {
//     const port = parseInt(val, 10)

//     if (isNaN(port)) {
//         // named pipe
//         return val
//     }

//     if (port >= 0) {
//         // port number
//         return port
//     }

//     return false
// }

// /**
//  * Event listener for HTTP server "error" event.
//  */

// function onError(error: any) {
//     if (error.syscall !== 'listen') {
//         throw error
//     }

//     const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

//     // handle specific listen errors with friendly messages
//     switch (error.code) {
//         case 'EACCES':
//             console.error(bind + ' requires elevated privileges')
//             process.exit(1)

//         case 'EADDRINUSE':
//             console.error(bind + ' is already in use')
//             process.exit(1)

//         default:
//             throw error
//     }
// }

// /**
//  * Event listener for HTTP server "listening" event.
//  */

// function onListening() {
//     const addr = server.address()
//     const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port
// }
