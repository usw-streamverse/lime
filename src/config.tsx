export const API_SERVER = 'https://usw-lime.azurewebsites.net';
export const LIVE_STREAMING_SERVER = 'wss://usw-lime.azurewebsites.net';
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