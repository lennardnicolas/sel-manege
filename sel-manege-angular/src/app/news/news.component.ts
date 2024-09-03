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
    displaySuccesAddNews: boolean = false

    @ViewChild(NewsElementComponent) newsElementComponent!: NewsElementComponent
    @ViewChild(NewsElementListComponent) newsElementListComponent!: NewsElementListComponent

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
                this.newsElementComponent.createState = true
            }
        }, 0)
    }

    newNewsCancelled() {
        this.displayCreateNews = false
    }

    newsAddedSuccess() {
        this.displaySuccesAddNews = true

        setTimeout(() => {
            this.displaySuccesAddNews = false
        }, 5000)

        this.newsElementListComponent.reloadNews()
    }
}
