import React, { useRef, useEffect, useState, CSSProperties } from 'react';

const useRippleEffect = <T extends HTMLElement>(ref: React.RefObject<T>, color: string) => {
    const [ripples, setRipples] = useState<CSSProperties[]>([]);
    const timerRef = useRef<NodeJS.Timeout>();
    useEffect(() => {
        const el = ref.current;
        if(el){
            const activeHandler = (e: MouseEvent) => {
                let rect = el.getBoundingClientRect();
                setRipples([...ripples, {
                    left: (e.clientX - rect.left) + 'px',
                    top: (e.clientY - rect.top) + 'px',
                    width: Math.max(el.offsetWidth, el.offsetHeight) / 8,
                    height: Math.max(el.offsetWidth, el.offsetHeight) / 8,
                    opacity: '0',
                }])

                if(timerRef.current !== null)
                    clearTimeout(timerRef.current);
                timerRef.current = setTimeout(() => {setRipples([])}, 1000);
            }
            el.addEventListener('mousedown', activeHandler);

            return () => {
                el.removeEventListener('mousedown', activeHandler);
            }
        }

    }, [ref, ripples, timerRef]);

    return (
        ripples.map((e, i) => {
            return <div key={i} style={{position: 'absolute', borderRadius: '50%', backgroundColor: color, top: '0', left: '0', animation: 'ripple 1000ms ease', ...e}}></div>
        })
    )
}

export default useRippleEffect;