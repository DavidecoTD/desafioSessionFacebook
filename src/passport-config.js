import passport from "passport";
import fbStrategy from 'passport-facebook';
import {users} from './daos/index.js';
const FacebookStrategy = fbStrategy.Strategy;

const initializePassportConfig =  () =>{
    passport.use('facebook',new FacebookStrategy ({
        clientID: '217360733858008',
        clientSecret: '95877f37279398b82484de2c99963d60',
        callbackURL: 'https://0c47-181-64-61-139.ngrok.io/auth/facebook/callback',
        profileFields:['emails']
    },async(accessToken,refreshToken,profile,done)=>{
        try {
            console.log(accessToken)
            console.log(profile)
            let user = await users.findOne({email:profile.emails[0].value})
            done(null,user)
        } catch (error) {
            done(error)
            
        }
    }))
    passport.serializeUser((user,done)=>{
        done(null,user._id);
    })
    passport.deserializeUser((id,done)=>{
        users.findById(id,done);
    })
}

export default initializePassportConfig;