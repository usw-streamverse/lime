import { LIVE_STREAMING_SERVER } from 'config';
import React, { useEffect, useRef } from 'react';

const iceServers: RTCConfiguration = {
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

export type useBroadcastType = {run: (refVideo: React.RefObject<HTMLVideoElement> | null, isDisplayMedia: boolean) => Promise<void>, setVideo: (refVideo: React.RefObject<HTMLVideoElement>) => void, viewer: number};

const useBroadcast = (): useBroadcastType => {
    const stream = useRef<MediaStream>();
    const ws = useRef<WebSocket>();
    const state = useRef<number>(0);
    const remote = useRef<RTCPeerConnection>();
    const viewer = useRef<number>(0);

    useEffect(() => {
        return () => {
            if(ws.current) ws.current.close();
            if(remote.current) remote.current.close();
        }
    }, []);

    const connect = () => {
        return new Promise(((resolve, reject) => {
            ws.current = new WebSocket(LIVE_STREAMING_SERVER, );
            const w = ws.current;
            w.onopen = (e) => {
                const token = localStorage.getItem('accessToken');
                w.send(JSON.stringify({'type': 'authorization', 'token': token}));
            }
            w.onclose = () => {
                state.current = 0;
            }
            w.onerror = (e) => {
                state.current = 0;
                reject();
            }
            w.onmessage = (e) => {
                try {
                    const data = JSON.parse(e.data);
                    switch(data.type){
                        case 'error':
                            alert(data.message);
                            break;
                        case 'authorization':
                            if(data.result){
                                resolve(e);
                            }else{
                                alert('로그인을 해주세요.');
                                reject();
                            }
                            break;
                        case 'offer': {
                            if(!remote.current) return;
                            const desc = new RTCSessionDescription(data.desc);
                            remote.current.setRemoteDescription(desc,
                                () => {
                                },
                                () => {
                                    alert('setRemoteDescription Error');
                                }
                            );
                        }
                            break;
                        case 'icecandidate':
                            if(!remote.current) return;
                            remote.current.addIceCandidate(new RTCIceCandidate(data.data));
                            break;
                    }
                } catch(e) {

                }
            }
        }));
    }

    const setVideo = (refVideo: React.RefObject<HTMLVideoElement>) => {
        if(refVideo.current && stream.current){
            refVideo.current.srcObject = stream.current;
            refVideo.current.volume = 0;
            refVideo.current.play();
        }
    }

    const run = async (refVideo: React.RefObject<HTMLVideoElement> | null, isDisplayMedia: boolean) => {
        if(state.current === 1) throw new Error('Already running');

        state.current = 1;

        try {
            await connect();

            stream.current = isDisplayMedia ? 
            await navigator.mediaDevices.getDisplayMedia({
                audio: true, 
                video: { 
                    frameRate: {ideal: 30, max: 30},
                }
            }) : 
            await navigator.mediaDevices.getUserMedia({
                audio: true, 
                video: { 
                    frameRate: {ideal: 30, max: 30},
                }
            });
            
            if(refVideo && refVideo.current){
                refVideo.current.srcObject = stream.current;
                refVideo.current.volume = 0;
                refVideo.current.play();
            }

            remote.current = new RTCPeerConnection(iceServers);

            const _stream = stream.current;
            
            _stream.getTracks().forEach(track => remote.current?.addTrack(track, _stream));

            remote.current.createOffer(
                (desc) => {
                    if(!remote.current) return;
                    remote.current.setLocalDescription(desc, () => {}, () => alert('setLocalDescription Error'));
                    if(ws.current)
                        ws.current.send(JSON.stringify({'type': 'offer', 'mode': 'broadcast', 'desc': desc}));
                }
            , () => console.log('description error'));

            remote.current.onicecandidate = (e) => {
                if(ws.current)
                    ws.current.send(JSON.stringify({'type': 'icecandidate', 'data': e.candidate}));
            }
        } catch (error) {
            state.current = 0;
            throw error;
        }
    }

    return { run, setVideo, viewer: viewer.current };
}

export default useBroadcast