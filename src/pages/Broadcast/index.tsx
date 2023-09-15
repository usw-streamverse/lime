import useBroadcast, { useBroadcastType } from 'hooks/useBroadcast';
import { createContext, useState } from 'react';
import BroadcastSetup from './BroadcastSetup';
import BroadcastOnAir from './BroadcastOnAir';

interface BroadcastFormState {
    setStep: React.Dispatch<React.SetStateAction<number>>;
    broadcast: useBroadcastType;
}

export const BroadcastFormStateContext = createContext<BroadcastFormState>({} as any);

const Broadcast = () => {
    const broadcast = useBroadcast();
    const [step, setStep] = useState<number>(0);

    return (
        <BroadcastFormStateContext.Provider value={{setStep, broadcast}}>
            {
                [<BroadcastSetup />, <BroadcastOnAir/>][step]
            }
        </BroadcastFormStateContext.Provider>
    )
}

export default Broadcast