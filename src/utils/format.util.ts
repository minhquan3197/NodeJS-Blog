/**
 * This is function format object user
 * @param user
 */
export function userFormat(user: any): object {
    const userInfo = user.toObject();
    if (userInfo.password) delete userInfo.password;
    return userInfo;
}
