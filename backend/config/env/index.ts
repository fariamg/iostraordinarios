import 'dotenv/config';

export default () => ({
    app: {
        port: process.env.APP_PORT || 10000,
        host: process.env.APP_HOST || '0.0.0.0',
    },
    database: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
    jwt_secret: process.env.JWT_SECRET,
    node_env: process.env.NODE_ENV,
});
