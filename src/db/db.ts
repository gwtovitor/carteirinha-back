//using mongo
import mongoose from 'mongoose';
import { Service } from 'typedi';

export interface IDatabase {
	connect(): Promise<void>;
	on(eventName: string, callback: void): void;
	get(): typeof mongoose;
	repo(schema: object, name: string): any;
}

@Service()
export default class Database implements IDatabase {
	constructor() {
		mongoose.Promise = Promise;

		mongoose.connection.on('connected', () => {
			console.log('🟢 MongoDB - Connection Established');
		});

		mongoose.connection.on('reconnected', () => {
			console.log('🟢 MongoDB - Connection Reestablished');
		});

		mongoose.connection.on('disconnected', () => {
			console.log('🔴 MongoDB - Connection Disconnected');
		});

		mongoose.connection.on('close', () => {
			console.log('🔴 MongoDB - Connection Closed');
		});

		mongoose.connection.on('error', (error) => {
			console.log('🔴 MongoDB - ERROR: ' + error);
		});

		this.connect();
	}

	on(eventName: string, callback: any) {
		mongoose.connection.on(eventName, () => callback());
	}

	async connect() {
		const run = async () => {
			await mongoose.connect(process.env.DB_URL as string);
		};

		run().catch((error) => console.error(error, 'Error na conexção', "mongodb+srv://admin:FbnktXjNDDkJ7jiV@atlasdb.wx0smvj.mongodb.net/?appName=atlasdb"));
	}

	get() {
		return mongoose;
	}

	repo(schema: object, name: string) {
		const repoSchema = new mongoose.Schema(schema);
		return mongoose.model(name, repoSchema);
	}
}
