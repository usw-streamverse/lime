import React, { createContext, useState } from 'react';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

export const OverlayContext = createContext<{push: (element: JSX.Element, key: string) => void, show: (key: string) => void, hide: (key: string) => void}>([] as any);

const Overlay = (props: {children: React.ReactNode | React.ReactNode[]}) => {
    const [update, setUpdate] = useState<boolean>(false);
    const [OverlayElements, setOverlayElements] = useState<{element: JSX.Element, key: string, show: boolean}[]>([]); 

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
            setUpdate(!update);
        }
    }

    const hide = (key: string) => {
        const res = OverlayElements.find(e => e.key === key);
        if(res){
            if(res.show && window.history.state === key)
                window.history.go(-1);
            res.show = false;
            setUpdate(!update);
        }
    }

    return (
        <OverlayContext.Provider value={{push: push, show: show, hide: hide}}>
            {
                OverlayElements.map(i => {
                    return <Modal key={i.key} data-key={i.key} show={i.show}>{i.element}</Modal>
                })
            }
            {props.children}
        </OverlayContext.Provider>
    )
}

export default Overlay;