import { Component } from '@angular/core'
import { NavbarComponent } from '../navbar/navbar.component'
import { FooterComponent } from '../footer/footer.component'
import { MatDividerModule } from '@angular/material/divider'
import { MatButtonModule } from '@angular/material/button'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-presentation',
    standalone: true,
    imports: [NavbarComponent, FooterComponent, MatDividerModule, MatButtonModule, RouterModule],
    templateUrl: './presentation.component.html',
    styleUrl: './presentation.component.css',
})
export class PresentationComponent {}
