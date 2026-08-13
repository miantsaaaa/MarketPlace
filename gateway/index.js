const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const GATEWAY_PORT = 8000;
const BACKEND = 'http://localhost:8080';
const FRONTEND = 'http://localhost:5173';

const server = http.createServer((req, res) => {
    const target = req.url.startsWith('/api/')
        ? BACKEND
        : FRONTEND;

    console.log(`[GATEWAY] ${req.method} ${req.url} -> ${target}`);

    proxy.web(req, res, {
        target,
        changeOrigin: true
    }, (error) => {
        console.error('[GATEWAY ERROR]', error.message);

        if (!res.headersSent) {
            res.writeHead(502, {
                'Content-Type': 'application/json'
            });
        }

        res.end(JSON.stringify({
            error: 'Gateway error',
            message: error.message
        }));
    });
});

server.listen(GATEWAY_PORT, () => {
    console.log('========================================');
    console.log(' Marketplace Gateway');
    console.log('========================================');
    console.log(`Gateway : http://localhost:${GATEWAY_PORT}`);
    console.log('');
    console.log('/api/*  -> http://localhost:8080');
    console.log('/*      -> http://localhost:5173');
    console.log('========================================');
});