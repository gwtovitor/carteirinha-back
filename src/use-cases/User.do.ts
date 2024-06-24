import UUID from "./UUID.vo";
import Password from "./Password.vo";

export default class User {
	
    private constructor(
		readonly id: UUID,
		readonly email: string,
		readonly name: string,
		readonly password: Password,
		readonly validity: Date
	) {}

	static create(input: createInput) {
		return new User(
			UUID.create(),
			input.email,
			input.name,
            Password.create(input.password),
			new Date()
		);
	}

	static build(input: buildInput) {
        return new User( 
            UUID.build(input.id), 
			input.email,
			input.name,
            Password.create(input.password),
			new Date()
        )
    }


    validatePassword(plainTextPassword: string): boolean {
        return this.password.validate(plainTextPassword);
    }
	
    getEmail(){
        return this.email
    }
}

type createInput = {
    email: string;
    name: string;
    password: string;
    validity: Date;
};


type buildInput = createInput & {
	id: string;
};
