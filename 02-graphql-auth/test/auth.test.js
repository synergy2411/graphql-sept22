import axios from 'axios';
import { UserModel } from '../src/model/user.model';

// Test Suite
describe("Auth App", () => {
    // contains individual test
    test("should be able to login with created user", async () => {
        try {
            const response = await axios.post("http://localhost:9090/api", {
                query: `
                mutation {
                    userLogin(data:{
                      email:"alice@test"
                      password:"alice123"
                    }){
                      token
                    }
                  }
                `
            })
            expect(response.status).toBe(200)
            expect(response.data.data.userLogin.token).not.toBeNull()
        } catch (err) {
            throw new Error(err)
        }
    })

    xtest("Should Create User", async () => {
        try {
            const response = await axios.post("http://localhost:9090/api", {
                query: `
                    mutation{
                        createUser(data:{
                            username:"dummy",
                            email:"dummy@test",
                            password:"dummy123"
                            age: 32
                            }){
                                id
                                username
                                email
                             }
                    }
                `
            })
            expect(response.status).toBe(200)
            const { data } = response;
            expect(data.data.createUser.username).toMatch(/dummy/)
        } catch (err) {
            throw new Error(err)
        }
    })
    test("Should be truthy", () => {
        expect(true).toBeTruthy()
    })
})