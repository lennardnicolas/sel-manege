import { Component } from '@angular/core'
import { NewsElementComponent } from '../news-element/news-element.component'

@Component({
    selector: 'app-news-element-list',
    standalone: true,
    imports: [
        NewsElementComponent        
    ],
    templateUrl: './news-element-list.component.html',
    styleUrl: './news-element-list.component.css'
})

export class NewsElementListComponent {

}
