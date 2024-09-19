import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NewsElementListComponent } from './news-element-list.component'

describe('NewsElementListComponent', () => {
    let component: NewsElementListComponent
    let fixture: ComponentFixture<NewsElementListComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NewsElementListComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(NewsElementListComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
