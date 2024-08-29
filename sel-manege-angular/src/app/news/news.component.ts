import { Component } from '@angular/core'
import { NavbarComponent } from '../navbar/navbar.component'
import { FooterComponent } from '../footer/footer.component'
import { NewsElementListComponent } from '../news-element-list/news-element-list.component'

@Component({
    selector: 'app-news',
    standalone: true,
    imports: [
        NavbarComponent,
        FooterComponent,
        NewsElementListComponent
    ],
    templateUrl: './news.component.html',
    styleUrl: './news.component.css'
})

export class NewsComponent {
    
}
