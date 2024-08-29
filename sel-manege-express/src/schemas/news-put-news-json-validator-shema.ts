export const newsPutNewsJsonValidatorShema: object = {
    type: 'object',
    properties: {
        title: { type: 'string', minLength: 1},
        date: { type: 'string', format: 'date' },
        time: { type: 'string', format: 'iso-time' },
        location: { type: 'string' },
        price: { type: 'integer', minimum: 0 },
        description: { type: 'string', minLength: 1 },
    },
    required: ['title', 'description'],
}