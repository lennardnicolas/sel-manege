export const authPostLoginJsonValidatorShema: object = {
    type: 'object',
    properties: {
        email: { type: 'string', minLength: 1 },
        pass: { type: 'string', minLength: 1 },
    },
    required: ['email', 'pass'],
}
