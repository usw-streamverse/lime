import { ICE_SERVERS, LIVE_STREAMING_SERVER } from 'config';
import React, { useEffect, useRef, useState } from 'react';

export type useBroadcastType = {run: (refVideo: React.RefObject<HTMLVideoElement> | null, isDisplayMedia: boolean) => Promise<void>, setVideo: (refVideo: React.RefObject<HTMLVideoElement>) => void, viewer: React.RefObject<number>, title: string, modifyTitle: (value: string) => void};

const useBroadcast = (): useBroadcastType => {
    const stream = useRef<MediaStream>();
    const ws = useRef<WebSocket>();
    const state = useRef<number>(0);
    const remote = useRef<RTCPeerConnection>();
    const viewer = useRef<number>(0);
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        return () => {
            if(ws.current) ws.current.close();
            if(remote.current) remote.current.close();
            if(stream.current) stream.current.getTracks().forEach(track => track.stop());
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
                    console.log(data);
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
                        case 'status':
                            viewer.current = Number(data.viewer);
                            break;
                        case 'title':
                            setTitle(String(data.title));
                            break;
                    }
                } catch(e) {

                }
            }
        }));
    }

    const modifyTitle = (value: string) => {
        if(ws.current)
            ws.current.send(JSON.stringify({type: 'modifyTitle', 'title': value}));
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
                    facingMode: 'environment',
                }
            });
            
            if(refVideo && refVideo.current){
                refVideo.current.srcObject = stream.current;
                refVideo.current.volume = 0;
                refVideo.current.play();
            }

            remote.current = new RTCPeerConnection(ICE_SERVERS);

            const _stream = stream.current;
            
            _stream.getTracks().forEach(track => remote.current?.addTrack(track, _stream));

            remote.current.createOffer(
                (desc) => {
                    if(!remote.current) return;
                    remote.current.setLocalDescription(desc, () => {}, () => alert('setLocalDescription Error'));
                    if(ws.current)
                        ws.current.send(JSON.stringify({'type': 'offer', 'mode': 'streamer', 'desc': desc}));
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

    return { run, setVideo, viewer: viewer, title, modifyTitle };
}

export default useBroadcast