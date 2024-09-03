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
import { NewsService } from '../news.service'

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
        CustomMatInputAutofocusDirective,
    ],
    templateUrl: './news-element.component.html',
    styleUrl: './news-element.component.css',
})
export class NewsElementComponent {
    newsService: NewsService
    @Output() cancelEvent = new EventEmitter<void>()

    panelTitle: string = ''
    panelDate: null | string = null
    panelTime: string | null = null
    panelLocation: string = ''
    panelPrice: string = ''
    panelDescription = ''

    titleFormControl = new FormControl('', [Validators.required])
    descriptionFormControl = new FormControl('', [Validators.required])
    dateFormControl = new FormControl('', [this.dateValidator()])
    timeFormControl = new FormControl('')
    locationFormControl = new FormControl('')
    priceFormControl = new FormControl('')
    matcher = new MyErrorStateMatcher()

    createState: boolean = false
    editView: boolean = false

    panelOpenState: boolean = false

    displayAddError: boolean = false

    constructor(newsService: NewsService) {
        this.newsService = newsService
    }

    cancel() {
        this.cancelEvent.emit()
    }

    async add() {
        this.displayAddError = false

        this.titleFormControl.markAllAsTouched()
        this.descriptionFormControl.markAllAsTouched()
        this.dateFormControl.markAllAsTouched()

        if (this.titleFormControl.valid && this.descriptionFormControl.valid && this.dateFormControl.valid) {
            const formattedTime: string | null =
                typeof this.timeFormControl.value === 'string' && this.timeFormControl.value != ''
                    ? this.timeFormControl.value + ':00'
                    : null
            const formattedDate: string | null =
                typeof this.dateFormControl.value === 'string' && this.dateFormControl.value != ''
                    ? this.dateFormControl.value
                    : null
            const formattedLocation: string | null =
                typeof this.locationFormControl.value === 'string' && this.locationFormControl.value != ''
                    ? this.locationFormControl.value
                    : null
            const formattedPrice: string | null =
                typeof this.priceFormControl.value === 'string' && this.priceFormControl.value != ''
                    ? this.priceFormControl.value
                    : null

            const success: boolean = await this.newsService.addNews(
                this.titleFormControl.value!,
                formattedDate,
                formattedTime,
                formattedLocation,
                formattedPrice,
                this.descriptionFormControl.value!,
            )

            if (!success) {
                this.displayAddError = true
            } else {
                this.cancelEvent.emit()
            }
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
        const dateInput = document.querySelector('#dateInput') as HTMLInputElement
        dateInput.value = ''
        this.dateFormControl.setErrors(null)
    }

    recetTime() {
        const timeInput = document.querySelector('#timeInput') as HTMLInputElement
        timeInput.value = ''
    }
}
