import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

function Menu({triggerScroll}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const menuBtn = useRef(null);
    const tl = useRef(null);

    const { contextSafe } = useGSAP(() => {
        tl.current = gsap.timeline({ paused: true })
            .to('.menu', { width: '50px', duration: 0.4, ease: 'power3.in' })
            .to('.menu', { backgroundColor: '#541e2b', duration: 0.2, ease: 'power3.in' })
            .to('.submenu', { y: -110, duration: 0.4, ease: 'power3.in' }, 0)
            .to('.menu-text', { display: 'none', duration: 0.4, ease: 'power3.in' }, 0)
            .to('.menu-icon', { rowGap: "0", duration: 0.4, ease: 'power3.in' }, 0);
    }, { scope: menuBtn });

    const menuClick = contextSafe(() => {
        if (!isExpanded) {
            tl.current.play();
        } else {
            tl.current.reverse();
        }
        setIsExpanded(!isExpanded);
    });

    return (
        <>
            <div ref={menuBtn} className='menu-wrapper'>
                <div className={`menu ${!isExpanded ? "" : 'animate'}`} onClick={menuClick}>
                    <div className='menu-icon'>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className='menu-text'>MENU</div>
                </div>
                <div className='submenu'>
                    <div onClick={(event)=>triggerScroll(event)} value="WORKS">WORKS</div>
                    <div onClick={(event)=>triggerScroll(event)} value="ABOUT">ABOUT</div>
                    <div onClick={(event)=>triggerScroll(event)} value="CONTACT">CONTACT</div>
                </div>
            </div>
        </>
    );
};

export default Menu;