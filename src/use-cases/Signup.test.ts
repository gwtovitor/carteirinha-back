
import UserRepoMemory from "../repo/UserMemory.repo"
import Signup from "./Signup"
import UserRepo from "../repo/UserMemory.repo"
import Login from "./Login"
import User from "./User.do"

describe('Signup', () => {

    test('Deve criar um usuario', async () => {
        //given
        const repo: UserRepo = new UserRepoMemory()
        const input= {
            email:"gwtovitorpw@gmail.com",
            password: "Vitor1997@",
            name: "Vitor Augusto",
            validity: new Date()
        }
        //when
        
        const signin = new Signup(repo)
        await signin.execute(input);

        //then
        const login = new Login(repo)
        const output= await login.execute(input) 
        expect( output instanceof User).toBe(true)
      
    })

})
