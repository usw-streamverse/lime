import { LIVE_STREAMING_SERVER } from 'config';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const iceServers: RTCConfiguration = {iceServers: [{ urls: [
    'stun:stun.l.google.com:19302',
    'stun:stun1.l.google.com:19302',
    'stun:stun2.l.google.com:19302',
    'stun:stun3.l.google.com:19302',
    'stun:stun4.l.google.com:19302',
]}]};

const offerOptions:RTCOfferOptions = {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true
};

const LiveStreaming = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const ws = useRef<WebSocket>();
    const remote = useRef<RTCPeerConnection>();


    const connect = () => {
        if(!videoRef.current) return;
        if(ws.current) ws.current.close();

        videoRef.current.onerror = (e) => {
            console.error(e);
        }

        ws.current = new WebSocket(LIVE_STREAMING_SERVER);
        ws.current.onopen = (e) => {
            if(!ws.current) return;

            remote.current = new RTCPeerConnection(iceServers);

            remote.current.createOffer(
                (desc) => {
                    if(!remote.current) return;
                    remote.current.setLocalDescription(desc, () => console.log('LocalSuccess'), () => alert('setLocalDescription Error'));
                    if(ws.current)
                        ws.current.send(JSON.stringify({'type': 'offer', 'mode': 'stream',  'desc': desc}));
                }
            , () => console.log('description error'), offerOptions);

            remote.current.ontrack = (e) => {
                if(!videoRef.current) return;
                videoRef.current.srcObject = e.streams[0];
                videoRef.current.autoplay = true;
                console.log('ontrack', e.streams[0]);
            }

            
            remote.current.onicecandidate = (e) => {
                if(ws.current)
                    ws.current.send(JSON.stringify({'type': 'icecandidate', 'data': e.candidate}));
            }
            //setVideoSrc(URL.createObjectURL(mediaSource.current));
    
        }
        
        ws.current.onmessage = (e) => {
            if(!remote.current) return;
            try {
                const data = JSON.parse(e.data);
                switch(data.type){
                    case 'offer': {
                        const desc = new RTCSessionDescription(data.desc);
                        remote.current.setRemoteDescription(desc,
                            () => {
                                if(ws.current)
                                ws.current.send(JSON.stringify({'type': 'track'}));        
                            },
                            () => {
                                alert('setRemoteDescription Error');
                            }
                        );
                    }
                        break;
                    case 'track':
                    break;
                    case 'icecandidate':
                        remote.current.addIceCandidate(new RTCIceCandidate(data.data));
                        break;
                }
            } catch(e) {

            }
        }
    };
    
    useEffect(() => {
        connect();
    }, []);

    return (
        <Container>
            <video ref={videoRef} autoPlay controls width={'100%'} />
        </Container>
    )
}

const Container = styled.div`
    padding: 1.0rem;
`

export default LiveStreaming