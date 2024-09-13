import { Component, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core'
import { NewsElementComponent } from '../news-element/news-element.component'
import { NewsService } from '../news.service'

@Component({
    selector: 'app-news-element-list',
    standalone: true,
    imports: [NewsElementComponent],
    templateUrl: './news-element-list.component.html',
    styleUrl: './news-element-list.component.css',
})
export class NewsElementListComponent {
    newsService: NewsService

    newsList: any = []

    @Output() newsEditSuccess = new EventEmitter<void>()

    @ViewChildren(NewsElementComponent) newsElementComponentList!: QueryList<NewsElementComponent>

    constructor(newsService: NewsService) {
        this.newsService = newsService

        this.reloadNews()
    }

    reloadNews() {
        this.newsService.getAll().then((response: any) => {
            if (response.status === 200) {
                if (response.data.length == 0) {
                    this.newsList = [
                        {
                            title: 'Aucune news',
                            description: "Oups, aucune news n'existe pour le moment...",
                        },
                    ]
                } else {
                    this.newsList = response.data
                }
            } else {
                this.newsList = [
                    {
                        title: 'Erreur',
                        description:
                            "Oups, une erreur s'est produite en tentant de charger les news",
                    },
                ]
            }

            setTimeout(() => {
                this.newsElementComponentList.forEach((newsElement: NewsElementComponent, i) => {
                    newsElement.panelId = this.newsList[i].id ? this.newsList[i].id : null
                    newsElement.panelTitle = this.newsList[i].title ? this.newsList[i].title : ''
                    newsElement.panelDescription = this.newsList[i].description ? this.newsList[i].description : ''
                    newsElement.panelDate = this.newsList[i].date ? this.newsList[i].date : null
                    newsElement.panelTime = this.newsList[i].time ? this.newsList[i].time.substring(0, 5) : null
                    newsElement.panelLocation = this.newsList[i].location ? this.newsList[i].location : ''
                    newsElement.panelPrice = this.newsList[i].price ? this.newsList[i].price : ''
                })
            }, 0)
        })
    }

    newsEditedSuccess() {
        this.newsEditSuccess.emit()
    }
}
