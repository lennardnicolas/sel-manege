import { Component, EventEmitter, Output } from '@angular/core'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatInputModule } from '@angular/material/input'
import {
    FormsModule,
    FormControl,
    FormGroupDirective,
    NgForm,
    Validators,
    ReactiveFormsModule,
    ValidatorFn,
    ValidationErrors,
    AbstractControl,
} from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { CustomMatInputAutofocusDirective } from '../custom-mat-input-autofocus.directive'

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted))
    }
}

@Component({
    selector: 'app-news-element',
    standalone: true,
    imports: [
        MatExpansionModule,
        MatInputModule,
        FormsModule,
        MatFormFieldModule,
        MatButtonModule,
        ReactiveFormsModule,
        CustomMatInputAutofocusDirective
    ],
    templateUrl: './news-element.component.html',
    styleUrl: './news-element.component.css',
})
export class NewsElementComponent {
    @Output() cancelEvent = new EventEmitter<void>()

    titleFormControl = new FormControl('', [Validators.required])
    descriptionFormControl = new FormControl('', [Validators.required])
    dateFormControl = new FormControl(null, [this.dateValidator()])
    matcher = new MyErrorStateMatcher()

    createState: boolean = false
    editView: boolean = false

    panelOpenState: boolean = false
    panelTitle: string = ''
    pannelDate: null | Date = null
    pannelTime: string | null = null
    pannelLocation: string = ''
    pannelPrice: string = ''
    pannelDescription = ''

    cancel() {
        this.cancelEvent.emit()
    }

    add() {
        this.titleFormControl.markAllAsTouched()
        this.descriptionFormControl.markAllAsTouched()
        this.dateFormControl.markAllAsTouched()
        
        if(this.titleFormControl.valid && this.descriptionFormControl.valid && this.dateFormControl.valid) {
            alert('add')
        }
    }

    dateValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value) {
                const inputDate = new Date(control.value)

                const year = inputDate.getFullYear()

                if (year < 2000 || year > 2100) {
                    return { invalidDate: true }
                }
                
            }
            return null
        }
    }

    recetDate() {
        this.pannelDate = null
        const dateInput = document.querySelector('#dateInput') as HTMLInputElement
        dateInput.value = ''
        this.dateFormControl.setErrors(null)
    }

    recetTime() {
        this.pannelTime = null
        const timeInput = document.querySelector('#timeInput') as HTMLInputElement
        timeInput.value = ''
    }
}
