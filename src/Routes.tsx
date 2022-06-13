import { FC } from "react";
import {
    Routes as Switch,
    Route,
    BrowserRouter
} from 'react-router-dom';

import {
    Blog,
    Curriculum,
    Homepage,
    Pubkey,
} from './views';

export const Routes: FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/pubkey" element={<Pubkey/>}/>
                <Route path="/blog" element={<Blog/>}/>
                <Route path="/cv" element={<Curriculum/>}/>

                <Route path="*" element={<Homepage/>}/>
            </Switch>
        </BrowserRouter>
    )
}
