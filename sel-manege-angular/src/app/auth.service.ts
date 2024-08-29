import { Injectable } from '@angular/core'
import axios from 'axios'
import { ENV } from '../../environment/environment'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor() {}

    async login(email: string, pass: string): Promise<boolean> {
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
            const response = await axios.request(options)
            return response.data
        } catch (err) {
            console.error('Login request error (In contacting server, not invalid login) : ' + err)
            return false
        }
    }

    async isAuthenticated(): Promise<boolean> {
        const options = {
            method: 'GET',
            url: ENV.expressUrl + '/authenticated',
            headers: {},
            withCredentials: true,
        }

        try {
            const response = await axios.request(options)
            return response.data
        } catch (err) {
            console.error('Authenticated request error : ' + err)
            return false
        }
    }

    async logout(): Promise<boolean> {
        const options = {
            method: 'GET',
            url: ENV.expressUrl + '/logout',
            headers: {},
            withCredentials: true,
        }

        try {
            const response = await axios.request(options)
            return response.data
        } catch (err) {
            console.error('Logout request error : ' + err)
            return false
        }
    }
}
