const PROXY_CONFIG=[
    {
        context: ['/api'],
        //target: 'http://192.168.49.2:30016', Esse é um target kubernetes
        //target: 'http://localhost:8080', Esse é um target localhost
        target: '${SPRING_API}:8080',
        secure: false,
        logLevel: 'debug',
        pathRewrite: {'^/api': ''}
    }
];

module.exports = PROXY_CONFIG