import UUID from "./UUID.vo";
import Password from "./Password.vo";

export default class User {
    private constructor(
        readonly id: UUID,
        readonly email: string,
        readonly name: string,
        readonly password: Password,
        readonly validity: Date,
        readonly photo: string
    ) {}

    static create(input: createInput): User {
        if (!process.env.SECRET_KEY) {
            throw new Error("Undefined secret key");
        }
        return new User(
            UUID.create(),
            input.email,
            input.name,
            Password.create(input.password, process.env.SECRET_KEY),
            new Date(),
            input.photo
        );
    }

    static build(input: buildInput): User {
        if (!process.env.SECRET_KEY) {
            throw new Error("Undefined secret key");
        }
        return new User(
            UUID.build(input.id),
            input.email,
            input.name,
            Password.build(input.password, process.env.SECRET_KEY),
            new Date(input.validity),
            input.photo
        );
    }

    getEmail(): string {
        return this.email;
    }

    getId(): UUID {
        return this.id;
    }

    getPassword(): Password {
        return this.password;
    }
}

type createInput = {
    email: string;
    name: string;
    password: string;
    validity: Date;
	photo: string
};


type buildInput = createInput & {
	id: string;
};
