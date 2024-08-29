import { Component } from '@angular/core'
import { NavbarComponent } from '../navbar/navbar.component'
import { FooterComponent } from '../footer/footer.component'

@Component({
    selector: 'app-echange',
    standalone: true,
    imports: [
        NavbarComponent,
        FooterComponent
    ],
    templateUrl: './echange.component.html',
    styleUrl: './echange.component.css'
})

export class EchangeComponent {

}
