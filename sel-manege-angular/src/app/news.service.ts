import { Injectable } from '@angular/core'
import { ENV } from '../../environment/environment'
import axios from 'axios'

@Injectable({
    providedIn: 'root',
})
export class NewsService {
    constructor() {}

    async add(
        title: string,
        date: string | null,
        time: string | null,
        location: string | null,
        price: string | null,
        description: string,
    ): Promise<boolean> {
        const options = {
            method: 'PUT',
            url: ENV.expressUrl + '/news',
            data: {
                title: title,
                ...(date !== null && { date }),
                ...(time !== null && { time }),
                ...(location !== null && { location }),
                ...(price !== null && { price }),
                description: description,
            },
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }

        try {
            await axios.request(options)
            return true
        } catch (err) {
            console.error('Add news error (In contacting server) : ' + err)
            return false
        }
    }

    async getAll(): Promise<boolean | object> {
        const options = {
            method: 'GET',
            url: ENV.expressUrl + '/allnews',
            withCredentials: true,
        }

        try {
            const response = await (await axios.request(options)).data
            return response
        } catch (err) {
            console.error('Impossible to get all the news : ' + err)
            return false
        }
    }
}
