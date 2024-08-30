import { Component } from '@angular/core'
import {MatExpansionModule} from '@angular/material/expansion'
@Component({
    selector: 'app-news-element',
    standalone: true,
    imports: [
        MatExpansionModule
    ],
    templateUrl: './news-element.component.html',
    styleUrl: './news-element.component.css'
})

export class NewsElementComponent {
    editView: boolean = false
    panelOpenState: boolean = false
    panelTitle: string = 'Apéro'
    pannelDate: string = '30.01.2024'
    pannelTime: string = '17:30'
    pannelLocation: string = 'Quai du Cheval-Blanc 10, 1227 Genève'
    pannelPrice: string = 'Gratuit'
    pannelDescription = 'Rejoignez-nous pour célébrer la magie de la lumière lors du désormais traditionnel Festival des Lumières de Belleville, un événement familial incontournable qui illumine le cœur de notre ville pendant trois nuits féériques. Alors que le soleil se couche, le Parc Central de Belleville se transforme en un éblouissant paysage de rêve, baigné de couleurs et de lumières, offrant une expérience immersive à tous les visiteurs.'
}
