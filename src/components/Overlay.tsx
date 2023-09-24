import React, { createContext, useEffect, useState } from 'react';
import Modal from './Modal';
import Alert from './Modal/Alert';

export const OverlayContext = createContext<{push: (element: JSX.Element, key: string) => void, show: (key: string) => void, hide: (key: string) => void, alert: (message: string) => void}>([] as any);

const Overlay = (props: {children: React.ReactNode | React.ReactNode[]}) => {
    const [OverlayElements, setOverlayElements] = useState<{element: JSX.Element, key: string, show: boolean}[]>([]); 
    const [alertQueue, setAlertQueue] = useState<string[]>([]);
    const [states, setStates] = useState<string[]>([]);

    const push = (element: JSX.Element, key: string) => {
        const res = OverlayElements.findIndex((e) => e.key === key);
        if(res > -1)
            OverlayElements.splice(res, 1);
        setOverlayElements([{element: element, key: key, show: false}, ...OverlayElements]);
    }

    const show = (key: string) => {
        const res = OverlayElements.find(e => e.key === key);
        if(res){
            res.show = true;
            window.history.pushState({...window.history.state, modal: key}, '', '');
            setStates([...states, res.key]);
        }
    }

    const hide = (key: string) => {
        if(key === 'alert'){
            if(states.length && states[states.length-1] === key){
                setAlertQueue(alertQueue.splice(1));
                setStates(states.splice(0, states.length-1));
            }
            return;
        }
        const res = OverlayElements.find(e => e.key === key);
        if(res){
            res.show = false;
            setStates(states.splice(0, states.length-1));
        }
    }

    const alert = (message: string) => {
        setAlertQueue([...alertQueue, message]);
        window.history.pushState({...window.history.state, modal: 'alert'}, '', '');
        setStates([...states, 'alert']);
    }

    useEffect(() => {
        const handlePopState = (e: PopStateEvent) => {
            if(states.length) hide(states[states.length-1]);
        }
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        }
    }, [states]);

    return (
        <OverlayContext.Provider value={{push, show, hide, alert}}>
            {
                OverlayElements.map(i => {
                    return <Modal key={i.key} data-key={i.key} show={i.show}>{i.element}</Modal>
                })
            }
            {
                <Modal key={'alert'} data-key={'alert'} show={alertQueue.length > 0}><Alert>{alertQueue[0]}</Alert></Modal>
            }
            {props.children}
        </OverlayContext.Provider>
    )
}

export default Overlay;