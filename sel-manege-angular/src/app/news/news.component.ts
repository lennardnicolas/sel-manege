import { Component, ViewChild } from '@angular/core'
import { NavbarComponent } from '../navbar/navbar.component'
import { FooterComponent } from '../footer/footer.component'
import { NewsElementListComponent } from '../news-element-list/news-element-list.component'
import { MatButtonModule } from '@angular/material/button'
import { AuthService } from '../auth.service'
import { NewsElementComponent } from '../news-element/news-element.component'

@Component({
    selector: 'app-news',
    standalone: true,
    imports: [NavbarComponent, FooterComponent, NewsElementListComponent, MatButtonModule, NewsElementComponent],
    templateUrl: './news.component.html',
    styleUrl: './news.component.css',
})
export class NewsComponent {
    authenticated: boolean = false
    displayCreateNews: boolean = false

    @ViewChild(NewsElementComponent) newsElementComponent!: NewsElementComponent

    constructor(authService: AuthService) {
        authService.isAuthenticated().then((isAuthenticated: boolean) => {
            this.authenticated = isAuthenticated
        })
    }

    addNews() {
        this.displayCreateNews = true

        setTimeout(() => {
            if (this.newsElementComponent) {
                this.newsElementComponent.editView = true
                this.newsElementComponent.panelTitle = ''
                this.newsElementComponent.pannelDate = new Date().toString()
                this.newsElementComponent.pannelDescription = ''
                this.newsElementComponent.pannelLocation = ''
                this.newsElementComponent.pannelPrice = 'Gratuit'
                this.newsElementComponent.pannelTime = new Date().toTimeString().split(' ')[0]
            }
        }, 0)
    }
}
