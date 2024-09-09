import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AuthService } from '../auth.service'

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css'
})
export class FooterComponent {
    authenticated: boolean = false

    constructor(authService: AuthService) {
        authService.isAuthenticated().then((response: any) => {
            if(response.status === 200) {
                this.authenticated = response.data
            }
        })
    }
}
