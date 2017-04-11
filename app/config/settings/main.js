var convict = require('convict');
// 'default' is in quotes because without quotes it is a keyword.
module.exports = convict({
    thisnode: {
        hostName: {
            doc: 'VoiceReach Web API hostname.',
            format: 'ipaddress',
            'default': '127.0.0.1',
            env: 'VoiceReach_API_IP_ADDRESS'
        },
        masterPort: {
            doc: 'VoiceReach Web API master port. This is the port which is used in the cluster mode to talk to the master process',
            format: 'port',
            'default': '30101',
            env: 'VoiceReach_API_MASTER_PORT'
        },
        workerPort: {
            doc: 'VoiceReach Web API worker port. This is the port that external services will talk to the API.',
            format: 'port',
            'default': '30100',
            env: 'VoiceReach_API_WORKER_PORT'
        },
        name: {
            doc: 'VoiceReach Web API server name',
            format: String,
            'default': 'VoiceReach WebAPI',
            env: 'VoiceReach_API_NAME'
        },
        version: {
            doc: 'VoiceReach Web API version',
            format: String,
            'default': '1.0.0',
            env: 'VoiceReach_API_VERSION'
        },
    },
    environment: {
        doc: 'environment',
        format: ['prod', 'dev', 'beta', 'local'],
        'default': 'local',
        env: 'VoiceReach_API_MODE'
    },
    supressLogstash: {
        doc: 'supress connecting to logstash server',
        format: Boolean,
        'default': false,
        env: 'VoiceReach_API_SUPRESS_LOGSTASH'
    },
    DEBUG: {
        doc: 'Debug flag',
        format: Boolean,
        'default': true,
        env: 'VoiceReach_API_DEBUG'
    },
    clusterEnabled: {
        doc: 'enable cluster service. If enabled the api server will run in cluster mode and will spin up instances equal to the number of cores on the server',
        format: Boolean,
        'default': false,
        env: 'VoiceReach_API_ENABLE_CLUSTER_SERVICE'
    },
    'riaknodes': {
        'doc': 'Riak nodes that the service will connect to. comma seperated host:port pairs',
        'format': String,
        'default': 'localhost:8087',
        'env': 'RIAK_NODES'
    },
    'queues': {
        'server': {
            'doc': 'Queue Server IP',
            'format': String,
            'default': '127.0.0.1',
            'env': 'QUEUE_HOST'
        },
        'port': {
            'doc': 'Queue server port',
            'format': 'port',
            'default': 11300,
            'env': 'QUEUE_PORT'
        }
    },
    cache: {
        server: {
            doc: 'Cache Manager IP',
            format: String,
            'default': '127.0.0.1',
            env: 'CACHE_HOST'
        },
        port: {
            doc: 'Queue server port',
            format: 'port',
            'default': 11300,
            env: 'CACHE_PORT'
        }
    },
    'Error': {
        'doc': 'Error level enumeration.',
        'format': Object,
        'default': {
            'IGNORE': 0,
            'NORMAL': 1,
            'CRITICAL': 2
        }
    },
    'logger': {
        'ip': {
            'doc': 'Logger IP address.',
            'format': String,
            'default': '127.0.0.1',
            'env': 'LOGGER_IP_ADDRESS',
        },
        'port': {
            'doc': 'Logger port.',
            'format': 'port',
            'default': 24224,
            'env': 'LOGGER_PORT'
        },
        'tag': {
            'VoiceReachWebAPI': {
                'doc': 'fluent label for VoiceReachWebAPI.',
                'format': String,
                'default': 'VoiceReachWebAPI',
                'env': 'LOGGER_TAG_VoiceReach'
            },
            'node': {
                'doc': 'fluent tag for node components.',
                'format': String,
                'default': 'node',
                'env': 'LOGGER_TAG_NODE'
            }
        }
    }
});
