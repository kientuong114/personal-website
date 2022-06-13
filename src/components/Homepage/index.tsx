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
                    I'm <b>Kien Tuong Truong</b>, a CyberSecurity MSc. student at ETH Zürich with too many projects on my bucket list and too little time to finish any of them.
                    <br/>
                    <br/>
                    I'm passionate about cybersecurity, especially cryptography!<br/>
                    <b>I often play CTFs</b> (Capture the Flag competitions) with various teams. In the past I've played with Tower of Hanoi, Mhackeroni, Flagbot and 0rganizers.<br/>
                    <br/>
                    I'm also a musician/singer: in the future you might find a new section with some music here (I have a band called <b>Eigen</b>)
                    <br/>
                    <br/>
                    <i>Over-engineering solutions for the sake of elegance since 1998</i>
                </HomepageTextP>
            </HomepageText>
            <HomepageImage src={profileimg}/>
        </HomepageWrapper>
        <HomepageFooter/>
        </>
    )
}
