import { Component } from '@angular/core'
import { NavbarComponent } from '../navbar/navbar.component'
import { FooterComponent } from '../footer/footer.component'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { CustomMatInputAutofocusDirective } from '../custom-mat-input-autofocus.directive'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'

@Component({
    selector: 'app-connexion',
    standalone: true,
    imports: [
        NavbarComponent,
        FooterComponent,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        MatButtonModule,
        CustomMatInputAutofocusDirective,
    ],
    templateUrl: './connexion.component.html',
    styleUrl: './connexion.component.css',
})
export class ConnexionComponent {
    authService: AuthService
    router: Router
    email: string = ''
    pass: string = ''
    invalidLoginError: boolean = false
    invalidEmail: boolean = false
    enableConnexion: boolean = false
    invalidPass: boolean = false

    constructor(AuthService: AuthService, router: Router) {
        this.authService = AuthService
        this.router = router
    }

    connect() {
        this.authService.login(this.email, this.pass).then((authentificated: boolean) => {
            if (authentificated) {
                this.router.navigate(['/presentation'])
            } else {
                this.invalidLoginError = true
            }
        })
    }

    // Add a set timeout because on input change trigger before password value update
    onInputChange(newValue: any) {
        setTimeout(() => {
            this.invalidLoginError = false

            this.checkEmail()
            this.checkPass()

            this.checkEnableConnexion()
        })
    }

    checkEmail() {
        const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        this.invalidEmail = !emailPattern.test(this.email)
    }

    checkPass() {
        this.invalidPass = this.pass.length == 0
    }

    checkEnableConnexion() {
        this.enableConnexion = !this.invalidEmail && !this.invalidPass
    }
}
