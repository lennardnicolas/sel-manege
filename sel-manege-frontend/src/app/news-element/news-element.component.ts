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
import { AuthService } from '../auth.service'

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
    authService: AuthService

    authenticated: boolean = false

    @Output() cancelEvent = new EventEmitter<void>()
    @Output() newsAddSuccess = new EventEmitter<void>()
    @Output() newsEditSuccess = new EventEmitter<void>()
    @Output() newsDeleteSuccess = new EventEmitter<void>()

    addBtnDisabled = false
    editBtnDisabled = false
    deleteBtnDisabled = false

    panelId!: number | null
    panelTitle!: string
    panelDate!: string | null
    panelTime!: string | null
    panelLocation!: string
    panelPrice!: string
    panelDescription!: string

    titleFormControl = new FormControl('', [Validators.required])
    descriptionFormControl = new FormControl('', [Validators.required])
    dateFormControl = new FormControl('', [this.dateValidator()])
    timeFormControl = new FormControl('')
    locationFormControl = new FormControl('')
    priceFormControl = new FormControl('')
    matcher = new MyErrorStateMatcher()

    createState: boolean = false
    editState: boolean = false
    editView: boolean = false

    panelOpenState: boolean = false

    displayAddError: boolean = false
    displayEditError: boolean = false
    displayDeleteError: boolean = false

    constructor(newsService: NewsService, authService: AuthService) {
        this.newsService = newsService
        this.authService = authService

        this.authService.isAuthenticated().then((response) => {
            if (response.status === 200) {
                this.authenticated = response.data
            }
        })
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

            this.addBtnDisabled = true

            const response: any = await this.newsService.add(
                this.titleFormControl.value!,
                formattedDate,
                formattedTime,
                formattedLocation,
                formattedPrice,
                this.descriptionFormControl.value!,
            )

            this.addBtnDisabled = false

            if (response.status === 200 && response.data) {
                this.newsAddSuccess.emit()
                this.cancelEvent.emit()
            } else {
                this.displayAddError = true
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

    edit(event: Event) {
        event.stopPropagation()
        this.editView = true
        this.editState = true

        setTimeout(() => {
            this.titleFormControl.setValue(this.panelTitle)
            this.titleFormControl.setErrors(null)

            this.descriptionFormControl.setValue(this.panelDescription)
            this.descriptionFormControl.setErrors(null)

            this.timeFormControl.setValue(this.panelTime ? this.panelTime : '')
            this.timeFormControl.setErrors(null)

            this.dateFormControl.setValue(this.panelDate ? this.panelDate : '')
            this.dateFormControl.setErrors(null)

            this.locationFormControl.setValue(this.panelLocation ? this.panelLocation : '')
            this.locationFormControl.setErrors(null)

            this.priceFormControl.setValue(this.panelPrice ? this.panelPrice : '')
            this.priceFormControl.setErrors(null)
        }, 0)
    }

    async update() {
        this.displayEditError = false

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

            this.editBtnDisabled = true

            const response: any = await this.newsService.update(
                this.panelId!,
                this.titleFormControl.value!,
                formattedDate,
                formattedTime,
                formattedLocation,
                formattedPrice,
                this.descriptionFormControl.value!,
            )

            this.editBtnDisabled = false

            if (response.status === 200 && response.data) {
                this.panelTitle = this.titleFormControl.value!
                this.panelDescription = this.descriptionFormControl.value!
                this.panelDate = this.dateFormControl.value
                this.panelTime = this.timeFormControl.value
                this.panelPrice = this.priceFormControl.value ? this.priceFormControl.value : ''
                this.panelLocation = this.locationFormControl.value ? this.locationFormControl.value : ''
                this.newsEditSuccess.emit()
                this.editState = false
                this.editView = false
            } else {
                this.displayEditError = true
            }
        }
    }

    cancelEdit() {
        this.editView = false
        this.editState = false
        this.displayEditError = false
    }

    async delete(event: Event) {
        event.stopPropagation()

        if (!this.deleteBtnDisabled) {
            this.deleteBtnDisabled = true
            this.displayDeleteError = false

            const response: any = await this.newsService.delete(this.panelId!)

            if (response.status === 200 && response.data) {
                this.newsDeleteSuccess.emit()
            } else {
                this.displayDeleteError = true

                setTimeout(() => {
                    this.displayDeleteError = false
                }, 5000)
            }

            this.deleteBtnDisabled = false
        }
    }
}
