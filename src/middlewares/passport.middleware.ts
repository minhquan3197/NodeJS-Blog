import Jwt from 'passport-jwt';

import config from '../config/constants';
import { User } from '../models/user.model';

const JwtStrategy = Jwt.Strategy;
const ExtractJwt = Jwt.ExtractJwt;
const Keys = config.key.secret;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: Keys,
};

/**
 * This is function verify token with passport
 * @param passport
 */
export const initPassport = (passport: any) => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            const user = await User.findById(jwt_payload.id);
            if (user) return done(null, user);
            return done(null, false);
        }),
    );
};
