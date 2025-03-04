import JWT from 'passport-jwt';
import User from '../model/user.js';


const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;

const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'twitter_secret'
}


export const passportAuth = (passport) =>{
    try {
        passport.use(new JwtStrategy(opts,async (jwt_payload,done) =>{
            console.log('jwt_payload',jwt_payload);
            const user  = await User.findById(jwt_payload.id);
            console.log('user',user);
            if(!user){
                done(null,false);
            } else {
                done(null,user);
            }
        }));
    } catch (error) {
        throw error;
    }
}


