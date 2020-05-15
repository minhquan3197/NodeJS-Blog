import { object, string } from '@hapi/joi';

export default {
    login: object({
        phoneNumber: string().required().min(10).max(11).messages({
            "string.base": `"username" should be a type of 'text'`,
            "string.empty": `"username" cannot be an empty field`,
            "string.min": `"username" should have a minimum length of {#limit}`,
            "string.max": `"username" should have a maximum length of {#limit}`,
            "any.required": `"username" is a required field`
        }),
        password: string().required().messages({
            "string.base": `"username" should be a type of 'text'`,
            "string.empty": `"username" cannot be an empty field`,
            "string.min": `"username" should have a minimum length of {#limit}`,
            "string.max": `"username" should have a maximum length of {#limit}`,
            "any.required": `"username" is a required field`
        }),
    }),
    register: object({
        phoneNumber: string().required().min(10).max(11).messages({
            "string.base": `"username" should be a type of 'text'`,
            "string.empty": `"username" cannot be an empty field`,
            "string.min": `"username" should have a minimum length of {#limit}`,
            "string.max": `"username" should have a maximum length of {#limit}`,
            "any.required": `"username" is a required field`
        }),
        password: string().required().messages({
            "string.base": `"username" should be a type of 'text'`,
            "string.empty": `"username" cannot be an empty field`,
            "string.min": `"username" should have a minimum length of {#limit}`,
            "string.max": `"username" should have a maximum length of {#limit}`,
            "any.required": `"username" is a required field`
        }),
    }),
};
