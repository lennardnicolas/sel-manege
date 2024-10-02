export const newsPostNewsJsonValidatorShema: object = {
    type: 'object',
    properties: {
        id: { type: 'number', minimum: 1 },
        title: { type: 'string', minLength: 1 },
        date: { type: 'string', format: 'date' },
        time: { type: 'string', format: 'iso-time' },
        location: { type: 'string' },
        price: { type: 'string' },
        description: { type: 'string', minLength: 1 },
    },
    required: ['id', 'title', 'description'],
}
