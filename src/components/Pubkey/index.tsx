import {FC} from "react";

import {
    PubkeyWrapper,
    PubkeyDescription,
    PublicKeyBox,
    PubkeyLink
} from './PubkeyComponents';

export const PubkeyContent: FC = () => {
    return (
        <>
            <PubkeyWrapper>
                <PubkeyDescription>
                    If you want to send me some encrypted stuff (I have no idea why you would do that, but you never know!), please use my public <PubkeyLink href={"https://github.com/FiloSottile/age"}>age</PubkeyLink> key:
                </PubkeyDescription>
                <PublicKeyBox>
                    age1999ymldckqr8tx90gjkrc7pyfntcfww9dyfe5wq7vzj3eqqszuksglz7eh
                </PublicKeyBox>
                <PubkeyDescription>
                    If I ever want to sign something (Again, I doubt I'll have to do such a thing more than twice in a lifetime), you may want to verify it using my <PubkeyLink href={"https://jedisct1.github.io/minisign/"}>minisign</PubkeyLink> public key:
                </PubkeyDescription>
                <PublicKeyBox>
                    RWRcrWVwVUbWiTvCawXgoDZ+RS6m8bI5VJ76CepnkL31cUOQjblaBvAm
                </PublicKeyBox>

            </PubkeyWrapper>
        </>

    )
}
