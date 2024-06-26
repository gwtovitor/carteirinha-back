import * as dotenv from 'dotenv';
import Database from './db/db';
dotenv.config();
import * as http from 'http';
import appInstance from './app';



const app = appInstance.app;
const port = normalizePort(process.env.PORT || '8081');
app.set('port', port);

const server = http.createServer(app);


const db = new Database()
db.connect()

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: string) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(): void {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
    console.log(`Listening on ${bind}`);
}
