import { Component } from '@angular/core'
import { NavbarComponent } from '../navbar/navbar.component'
import { FooterComponent } from '../footer/footer.component'

@Component({
    selector: 'app-erreur',
    standalone: true,
    imports: [
        NavbarComponent,
        FooterComponent
    ],
    templateUrl: './erreur.component.html',
    styleUrl: './erreur.component.css'
})

export class ErreurComponent {

}
