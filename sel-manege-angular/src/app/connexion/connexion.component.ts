import { Component } from '@angular/core'
import { NavbarComponent } from '../navbar/navbar.component'
import { FooterComponent } from '../footer/footer.component'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule, FormControl, FormGroupDirective, NgForm, Validators, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { CustomMatInputAutofocusDirective } from '../custom-mat-input-autofocus.directive'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'
import { ErrorStateMatcher } from '@angular/material/core'

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted))
    }
}

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
        ReactiveFormsModule,
    ],
    templateUrl: './connexion.component.html',
    styleUrl: './connexion.component.css',
})
export class ConnexionComponent {
    authService: AuthService
    router: Router
    invalidLoginError: boolean = false
    loginErrorDisplay = false

    matcher = new MyErrorStateMatcher()

    emailFormControl = new FormControl('', [Validators.required, Validators.email])
    passFormControl = new FormControl('', [Validators.required])

    constructor(AuthService: AuthService, router: Router) {
        this.authService = AuthService
        this.router = router
    }

    connect() {
        this.invalidLoginError = false
        this.loginErrorDisplay = false

        this.emailFormControl.markAllAsTouched()
        this.passFormControl.markAllAsTouched()

        if (this.emailFormControl.valid && this.passFormControl.valid) {
            this.authService.login(this.emailFormControl.value!, this.passFormControl.value!).then((response: any) => {
                if(response.status === 200) {
                    if (response.data) {
                        this.router.navigate(['/presentation'])
                    } else {
                        this.invalidLoginError = true
                    }
                } else {
                    this.loginErrorDisplay = true
                }
                
            })
        }
    }
}
