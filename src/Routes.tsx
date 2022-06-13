import { FC, useState, useEffect } from "react";
import {
    Routes as Switch,
    Route,
    useLocation
} from 'react-router-dom';

import {
    Blog,
    Curriculum,
    Homepage,
    Pubkey,
} from './views';

export const Routes: FC = () => {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransitionStage] = useState("fadeIn");

    useEffect(() => {
        if (location !== displayLocation) setTransitionStage("fadeOut");
    }, [location, displayLocation]);
    
    return (
        <div
            className={`${transitionStage}`}
            onAnimationEnd={() => {
                if (transitionStage === "fadeOut") {
                    setTransitionStage("fadeIn");
                    setDisplayLocation(location);
                }
            }}
        >
                <Switch location={displayLocation}>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/pubkey" element={<Pubkey/>}/>
                    <Route path="/blog" element={<Blog/>}/>
                    <Route path="/cv" element={<Curriculum/>}/>

                    <Route path="*" element={<Homepage/>}/>
                </Switch>
        </div>
    )
}
