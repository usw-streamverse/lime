import { ICE_SERVERS, LIVE_STREAMING_SERVER } from 'config';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const offerOptions:RTCOfferOptions = {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true
};

const WatchLive = () => {
    const userid = useParams()['id'] || '';
    const videoRef = useRef<HTMLVideoElement>(null);
    const ws = useRef<WebSocket>();
    const remote = useRef<RTCPeerConnection>();
    const [title, setTitle] = useState<string>('');

    const connect = () => {
        if(!videoRef.current) return;
        if(ws.current) ws.current.close();

        videoRef.current.onerror = (e) => {
            console.error(e);
        }

        ws.current = new WebSocket(LIVE_STREAMING_SERVER);
        ws.current.onopen = (e) => {
            if(!ws.current) return;
            remote.current = new RTCPeerConnection(ICE_SERVERS);

            remote.current.createOffer(
                (desc) => {
                    if(!remote.current) return;
                    remote.current.setLocalDescription(desc, () => {}, () => alert('setLocalDescription Error'));
                    if(ws.current)
                        ws.current.send(JSON.stringify({'type': 'offer', 'mode': 'stream', 'channel': userid, 'desc': desc}));
                }
            , () => console.log('description error'), offerOptions);

            remote.current.ontrack = (e) => {
                if(!videoRef.current) return;
                const video = videoRef.current;
                video.srcObject = e.streams[0];
                video.play();

                const tracks = video.srcObject.getTracks();
                for(const i of e.streams[0].getTracks()){
                    if(!tracks.includes(i))
                        video.srcObject.addTrack(i);
                }
            }

            
            remote.current.onicecandidate = (e) => {
                if(ws.current)
                    ws.current.send(JSON.stringify({'type': 'icecandidate', 'data': e.candidate}));
            }
        }
        
        ws.current.onmessage = (e) => {
            if(!remote.current) return;
            try {
                const data = JSON.parse(e.data);
                console.log(data);
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
                    case 'title':
                        setTitle(data.title);
                        break;
                }
            } catch(e) {

            }
        }
    };
    
    useEffect(() => {
        connect();

        return () => {
            if(ws.current) ws.current.close();
            if(remote.current) remote.current.close();
        }
    }, []);

    return (
        <Container>
            <video ref={videoRef} autoPlay controls width={'100%'} />
            <Title>{title}</Title>
        </Container>
    )
}

const Container = styled.div`
    padding: 1.0rem;
`

const Title = styled.div`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`

export default WatchLive