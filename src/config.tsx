export const API_SERVER = 'http://localhost:3000';
export const LIVE_STREAMING_SERVER = 'ws://localhost:4000';
export const ICE_SERVERS: RTCConfiguration = {
    iceServers: [
        {
            urls: "stun:stun.relay.metered.ca:80",
        },
        {
            urls: "turn:a.relay.metered.ca:80",
            username: "faa70f6f53fda5703594c0c2",
            credential: "UJH/kAmY0wAqKcgI",
        },
        {
            urls: "turn:a.relay.metered.ca:80?transport=tcp",
            username: "faa70f6f53fda5703594c0c2",
            credential: "UJH/kAmY0wAqKcgI",
        },
        {
            urls: "turn:a.relay.metered.ca:443",
            username: "faa70f6f53fda5703594c0c2",
            credential: "UJH/kAmY0wAqKcgI",
        },
        {
            urls: "turn:a.relay.metered.ca:443?transport=tcp",
            username: "faa70f6f53fda5703594c0c2",
            credential: "UJH/kAmY0wAqKcgI",
        },
    ],
};