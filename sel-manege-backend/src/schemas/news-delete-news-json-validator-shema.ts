export const newsDeleteNewsJsonValidatorShema: object = {
    type: 'object',
    properties: {
        id: { type: 'number', minimum: 1 },
    },
    required: ['id'],
}
