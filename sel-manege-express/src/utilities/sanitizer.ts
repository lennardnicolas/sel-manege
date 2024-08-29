import escapeHtml from 'escape-html'
import sanitizeHtml from 'sanitize-html'

export class Sanitizer {
    sanitizeString(str: string): string {
        return escapeHtml(sanitizeHtml(str))
    }

    sanitizeStringOfObject(obj: any): any {
        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = this.sanitizeString(obj[key])
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                obj[key] = this.sanitizeStringOfObject(obj[key])
            }
        }
    
        return obj
    }
}