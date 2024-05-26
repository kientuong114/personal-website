import { FC } from "react";
import profileimg from '../../assets/propic.jpg';
import {
    HomepageWrapper,
    HomepageText,
    HomepageTextTitle,
    HomepageTextP,
    HomepageImageContent,
    HomepageImageDeco,
    HomepageImageWrapper,
    FooterWrapper,
    FooterTitle,
    FooterButtonWrapper,
    FooterButtonLink,
    PublicationsWrapper,
    PublicationsTitle,
    PublicationName,
    PublicationVenue,
    PublicationAuthors,
} from "./HomepageComponents";

import {
    FaGithubSquare,
    FaLinkedin,
    FaTwitter,
} from 'react-icons/fa'

const HomepageImage: FC<{src: string}> = ({src}) => {
    return (
        <HomepageImageWrapper>
            <HomepageImageContent src={src}/>
            <HomepageImageDeco/>
        </HomepageImageWrapper>
    )
}

const FooterButton: FC<{href: string, icon: JSX.Element}> = ({href, icon}) => {
    return (
        <FooterButtonLink href={href}>
            {icon} 
        </FooterButtonLink>
    )

}

const iconProps = {
    size: 50,
    color: "white",
}

const HomepageFooter: FC = () => {
    return (
        <FooterWrapper>
            <FooterTitle>
                Other places in which you can find me:
            </FooterTitle>
            <FooterButtonWrapper>
                <FooterButton href={"https://github.com/kientuong114"} icon={<FaGithubSquare {...iconProps} />}/>
                <FooterButton href={"https://www.linkedin.com/in/kien-tuong-t-430306102/"} icon={<FaLinkedin {...iconProps} />}/>
                <FooterButton href={"https://twitter.com/kientuong114"} icon={<FaTwitter {...iconProps} />}/>
            </FooterButtonWrapper>
        </FooterWrapper>
    )
}

export const HomepageContent: FC = () => {
    return (
        <>
        <HomepageWrapper>
            <HomepageText>
                <HomepageTextTitle>
                    Hi! :)
                </HomepageTextTitle>
                <HomepageTextP>
                    I'm <b>Kien Tuong Truong</b>, a second-year PhD student at <a href="https://ethz.ch/en.html">ETH Zürich</a> (with the <a href="https://appliedcrypto.ethz.ch/">Applied Cryptography group</a>) with an interest in the real-world deployments of cryptography. In particular, I like to analyse cryptographic protocols "in the wild", with a focus on finding attacks and/or proving the security of these protocols. My current focus is on secure messaging and E2EE cloud storage.
                    <br/>
                    <br/>
                    <b>I (used to) play CTFs</b> with various teams. In the past I've played with Tower of Hanoi, Mhackeroni, Flagbot and 0rganizers.<br/>
                    <br/>
                    <i>Over-engineering solutions for the sake of elegance since 1998</i>
                </HomepageTextP>
            </HomepageText>
            <HomepageImage src={profileimg}/>
        </HomepageWrapper>
        <PublicationsTitle>Publications</PublicationsTitle>
        <PublicationsWrapper>
            <PublicationName href="https://www.usenix.org/conference/usenixsecurity23/presentation/paterson">Three Lessons from Threema: Analysis of a Secure Messenger</PublicationName>
            <PublicationVenue>USENIX Security 2023</PublicationVenue>
            <PublicationAuthors><i>Kenny Paterson, Matteo Scarlata, </i><b>Kien Tuong Truong</b></PublicationAuthors>

        </PublicationsWrapper>
        <HomepageFooter/>
        </>
    )
}
