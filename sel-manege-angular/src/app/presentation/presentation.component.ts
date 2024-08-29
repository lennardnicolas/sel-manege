import { Component } from '@angular/core'
import { NavbarComponent } from '../navbar/navbar.component'
import { FooterComponent } from '../footer/footer.component'
import { MatDividerModule } from '@angular/material/divider'
import { MatButtonModule } from '@angular/material/button'

@Component({
    selector: 'app-presentation',
    standalone: true,
    imports: [
    NavbarComponent,
    FooterComponent,
    MatDividerModule,
    MatButtonModule
    ],
    templateUrl: './presentation.component.html',
    styleUrl: './presentation.component.css'
})

export class PresentationComponent {

}
