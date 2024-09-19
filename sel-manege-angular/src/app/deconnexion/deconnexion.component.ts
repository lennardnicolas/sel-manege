import { Component } from '@angular/core'
import { NavbarComponent } from '../navbar/navbar.component'
import { FooterComponent } from '../footer/footer.component'
import { AuthService } from '../auth.service'
import { MatButtonModule } from '@angular/material/button'

@Component({
    selector: 'app-deconnexion',
    standalone: true,
    imports: [NavbarComponent, FooterComponent, MatButtonModule],
    templateUrl: './deconnexion.component.html',
    styleUrl: './deconnexion.component.css',
})
export class DeconnexionComponent {
    logoutSuccess: boolean = false
    displayLogoutLoading = true
    authService: AuthService

    constructor(authService: AuthService) {
        this.authService = authService
        this.logout()
    }

    logout() {
        this.displayLogoutLoading = true

        this.authService.logout().then((response: any) => {
            if (response.status === 200 && response.data) {
                this.displayLogoutLoading = false
                this.logoutSuccess = true
            } else {
                this.displayLogoutLoading = false
                this.logoutSuccess = false
            }
        })
    }
}
