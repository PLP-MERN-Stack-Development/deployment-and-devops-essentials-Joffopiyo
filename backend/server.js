require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const Sentry = require('@sentry/node');
const client = require('prom-client');
const logger = require('./monitoring/logger');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Sentry Initialization (Must be first)
Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Sentry.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// 2. Prometheus Metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', client.register.contentType);
    res.send(await client.register.metrics());
});

// 3. Security & Performance Middleware
app.use(helmet()); // Security headers
app.use(compression()); // Gzip compression
app.use(cors()); // CORS
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// 4. Health Checks
app.get('/health', async (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.status(200).json({
        status: 'ok',
        timestamp: new Date(),
        uptime: process.uptime(),
        database: dbStatus,
    });
});

app.get('/readiness', async (req, res) => {
    if (mongoose.connection.readyState === 1) {
        res.status(200).json({ status: 'ready' });
    } else {
        res.status(503).json({ status: 'not ready' });
    }
});

// 5. Routes (Placeholder)
app.get('/', (req, res) => {
    res.send('MERN Backend is running!');
});

// 6. Error Handling
// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.use((err, req, res, next) => {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined,
        sentry_id: res.sentry,
    });
});

// 7. Database Connection & Server Start
const startServer = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            logger.warn('MONGODB_URI is not defined. Skipping database connection for demo purposes.');
        } else {
            await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                maxPoolSize: 50, // Connection pooling
            });
            logger.info('Connected to MongoDB');
        }

        const server = app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
        });

        // Graceful Shutdown
        const shutdown = () => {
            logger.info('SIGTERM/SIGINT signal received: closing HTTP server');
            server.close(() => {
                logger.info('HTTP server closed');
                mongoose.connection.close(false, () => {
                    logger.info('MongoDB connection closed');
                    process.exit(0);
                });
            });
        };

        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);

    } catch (err) {
        logger.error('Failed to start server:', err);
        process.exit(1);
    }
};

startServer();
