// ===================
// Entorno desarrollo / produccion
// ===================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ===================
// Puerto
// ===================
process.env.PORT = process.env.PORT || 3000;

// ===================
// Token
// ===================
process.env.TOKEN_CADUCIDAD = 60 * 60;
process.env.TOKEN_SEED = process.env.TOKEN_SEED || 'SEED-DE-DESARROLLO';

// ===================
// Google
// ===================
process.env.CLIENT_ID = process.env.CLIENT_ID || "565491488261-c4juv2ibba89a3ml3ukkbepeldvc15k2.apps.googleusercontent.com"

// ===================
// Base de datos
// ===================
if (process.env.NODE_ENV === 'dev') {
    process.env.URLDB = 'mongodb://localhost:27017/osm';
} else {
    process.env.URLDB = process.env.MONGO_URI;
};