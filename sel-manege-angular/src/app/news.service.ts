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
    ): Promise<any> {
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
            return await axios.request(options)
        } catch (err) {
            console.error('Add news error : ' + err)
            return err
        }
    }

    async update(
        id: number,
        title: string,
        date: string | null,
        time: string | null,
        location: string | null,
        price: string | null,
        description: string,
    ): Promise<any> {
        const options = {
            method: 'POST',
            url: ENV.expressUrl + '/news',
            data: {
                id: id,
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
            return await axios.request(options)
        } catch (err) {
            console.error('Add news error : ' + err)
            return err
        }
    }

    async getAll(): Promise<any> {
        const options = {
            method: 'GET',
            url: ENV.expressUrl + '/allnews',
            withCredentials: true,
        }

        try {
            return await axios.request(options)
        } catch (err) {
            console.error('Impossible to get all the news : ' + err)
            return err
        }
    }
}
