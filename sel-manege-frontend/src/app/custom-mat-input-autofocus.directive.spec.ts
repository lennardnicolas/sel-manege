import { CustomMatInputAutofocusDirective } from './custom-mat-input-autofocus.directive'
import { MatInput } from '@angular/material/input'

class MockMatInput {
    focus() {}
}

describe('CustomMatInputAutofocusDirective', () => {
    it('should create an instance', () => {
        const mockMatInput = new MockMatInput() as unknown as MatInput
        const directive = new CustomMatInputAutofocusDirective(mockMatInput)

        expect(directive).toBeTruthy()
    })
})
