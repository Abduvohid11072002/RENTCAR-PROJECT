export default () => ({
  port: parseInt(process.env.PORT, 10),
  bcrypt_salt: Number(process.env.BCRYPT_SALT),
  jwt: {
    accessTime: process.env.ACCESS_TIME,
    refreshTime: process.env.REFRESH_TIME,
    tokenSecret: process.env.TOKEN_SECRET,
  },
  mail: {
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASS: process.env.MAIL_PASS,
  }
});
