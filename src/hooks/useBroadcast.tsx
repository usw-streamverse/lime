import { LIVE_STREAMING_SERVER } from "config";
import { useRef } from "react";

const iceServers: RTCConfiguration = {iceServers: [{ urls: [
    'stun:stun.l.google.com:19302',
    'stun:stun1.l.google.com:19302',
    'stun:stun2.l.google.com:19302',
    'stun:stun3.l.google.com:19302',
    'stun:stun4.l.google.com:19302',
]}]};

const useBroadcast = () => {
    const stream = useRef<MediaStream>();
    const ws = useRef<WebSocket>();
    const state = useRef<number>(0);
    const remote = useRef<RTCPeerConnection>();

    const connect = () => {
        return new Promise(((resolve, reject) => {
            ws.current = new WebSocket(LIVE_STREAMING_SERVER);
            const w = ws.current;
            w.onopen = (e) => {
                resolve(e);
            }
            w.onclose = () => {
                state.current = 0;
            }
            w.onerror = (e) => {
                state.current = 0;
                reject(e);
            }
            w.onmessage = (e) => {
                if(!remote.current) return;
                try {
                    const data = JSON.parse(e.data);
                    switch(data.type){
                        case 'offer': {
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
                            remote.current.addIceCandidate(new RTCIceCandidate(data.data));
                            break;
                    }
                } catch(e) {

                }
            }
        }));
    }

    const run = async (refVideo: React.RefObject<HTMLVideoElement>) => {
        if(state.current === 1){
            alert('스트리밍 서버와 연결 중입니다.');
            return;
        }
        state.current = 1;

        try {
            await connect();

            stream.current = await navigator.mediaDevices.getDisplayMedia({
                audio: true, 
                video: { 
                    //width: videoResolution.current.width,
                    //hiehgt: videoResolution.current.height,
                    frameRate: {ideal: 30, max: 30},
                }
            });
            
            if(refVideo.current){
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
                    remote.current.setLocalDescription(desc, () => console.log('LocalSuccess'), () => alert('setLocalDescription Error'));
                    if(ws.current)
                        ws.current.send(JSON.stringify({'type': 'offer', 'mode': 'broadcast', 'desc': desc}));
                }
            , () => console.log('description error'));

            remote.current.onicecandidate = (e) => {
                if(ws.current)
                    ws.current.send(JSON.stringify({'type': 'icecandidate', 'data': e.candidate}));
            }
        } catch (error) {
            console.log(error);
            alert('알 수 없는 오류가 발생하였습니다.');
        }
    }

    return { run };
}

export default useBroadcast