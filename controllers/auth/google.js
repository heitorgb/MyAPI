const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://server.isalvei.com.br/auth/google/callback',
},
(accessToken, refreshToken, profile, done) => {
  // Aqui você pode salvar/verificar o usuário no banco se quiser
  // verificar se o usuário já existe no banco de dados posso chamar a função de busca

  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
