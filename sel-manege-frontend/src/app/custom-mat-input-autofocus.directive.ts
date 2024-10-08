import { Directive, OnInit } from '@angular/core'
import { MatInput } from '@angular/material/input'

@Directive({
    selector: '[appCustomMatInputAutofocus]',
    standalone: true,
})
export class CustomMatInputAutofocusDirective implements OnInit {
    constructor(private matInput: MatInput) {}

    ngOnInit() {
        setTimeout(() => this.matInput.focus())
    }
}
