const BaseSchema = {
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: Boolean,
        default: false,
    },
};

export default BaseSchema;
