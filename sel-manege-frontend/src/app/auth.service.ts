import { Injectable } from '@angular/core'
import axios from 'axios'
import { ENV } from '../../environment/environment'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor() {}

    async login(email: string, pass: string): Promise<any> {
        const options = {
            method: 'POST',
            url: ENV.expressUrl + '/login',
            data: {
                email: email,
                pass: pass,
            },
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }

        try {
            return await axios.request(options)
        } catch (err) {
            console.error('Login request error (Not invalid login) : ' + err)
            return err
        }
    }

    async isAuthenticated(): Promise<any> {
        const options = {
            method: 'GET',
            url: ENV.expressUrl + '/authenticated',
            headers: {},
            withCredentials: true,
        }

        try {
            return await axios.request(options)
        } catch (err) {
            console.error('Authenticated request error : ' + err)
            return err
        }
    }

    async logout(): Promise<any> {
        const options = {
            method: 'GET',
            url: ENV.expressUrl + '/logout',
            headers: {},
            withCredentials: true,
        }

        try {
            return await axios.request(options)
        } catch (err) {
            console.error('Logout request error : ' + err)
            return err
        }
    }
}
