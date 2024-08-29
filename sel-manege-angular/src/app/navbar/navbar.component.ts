import { Component } from '@angular/core'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from '@angular/material/button'
import {MatSidenavModule} from '@angular/material/sidenav'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        MatToolbarModule, 
        MatButtonModule, 
        MatSidenavModule,
        RouterModule
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
