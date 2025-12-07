"use client";

import TiltedCard from "@/components/TiltedCard";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Reusable class name constants
const baseTextClasses = "text-left md:text-right text-black drop-shadow-2xl font-signika";
const subheadingClasses = `${baseTextClasses} mb-2 text-lg md:text-2xl font-light mb-[.5em]`;
const headingClasses = `text-4xl md:text-5xl ${baseTextClasses} font-medium mb-[.5em]`;
const paragraphClasses = `${baseTextClasses} mb-2 text-lg md:text-xl font-light`;
const linkClasses = "text-slate-500 underline hover:text-slate-900 transition-colors duration-300";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start p-4 md:p-8 min-h-screen">
      {/* Hero Card*/}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full max-w-6xl backdrop-blur-xl backdrop-brightness-103 border-solid border-2 border-t-white border-l-white border-b-white/10 border-r-transparent px-4 m-4 py-8 md:p-16 md:m-8">
        {/* Name - appears below on mobile, left on desktop */}
        <div className="order-2 md:order-1 text-center md:text-left max-w-lg">
          <p className={subheadingClasses}>
            Ciao! :) I'm
          </p>
          <Tooltip>
            <TooltipTrigger asChild>
              <h1 className={headingClasses}>
                Kien Tuong Truong
              </h1>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex flex-col items-center">
                <p className="font-signika text-white font-light text-xl">
                  <b>Kien Tuong</b> is the first name, <b>Truong</b> is the family name
                </p>
                <p className="font-signika text-white font-light text-xl">
                  Feel free to just call me <b>Kien</b>!
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
          <p className={paragraphClasses}>
            I am a PhD student in the <a className={linkClasses} href="https://appliedcrypto.ethz.ch">Applied Cryptography Group</a> at <a className={linkClasses} href="https://ethz.ch">ETH Zurich</a>, supervised by Prof. Kenny Paterson.
          </p>
          <p className={paragraphClasses}>
            I am interested in real-world deployments of cryptography, with a focus on attacks, especially on messaging apps.
          </p>
          <p className={paragraphClasses}>
            Yes, I'm that guy who did <i>that</i> thing at the Rump session.
          </p>
        </div>

        {/* TiltedCard - appears above on mobile, right on desktop */}
        <div className="order-1 md:order-2 flex-shrink-0 md:pl-8 p-0">
          <TiltedCard
            imageSrc="/propic.jpeg"
            altText="Kien Tuong Truong"
            captionText="Photo by: Emma Romei"
            showMobileWarning={false}
            showTooltip={true}
          />
        </div>
      </div>
      {/* End Hero Card*/}

      <div className="flex flex-col items-start justify-center w-full max-w-6xl backdrop-blur-xl backdrop-brightness-103 border-solid border-2 border-t-white border-l-white border-b-white/10 border-r-transparent py-8 md:py-16 px-4 md:px-32 m-8 transition-all gap-4">
        <h1 className="text-4xl md:text-4xl text-left text-black drop-shadow-2xl font-signika font-medium mb-[.5em]">
          (More) About Me
        </h1>
        <p className="text-black font-signika text-lg md:text-xl font-light">
          Before starting my PhD, I completed my Master's degree in Cybersecurity at ETH Zurich and EPFL with a <a className={linkClasses} href="https://breakingthe3ma.app">thesis on the Threema encrypted messenger</a>. I also hold a Bachelor's degree in Computing Engineering from the <a className={linkClasses} href="https://polimi.it">Politechnic University of Milan (Politecnico di Milano)</a>.
        </p>
        <p className="text-black font-signika text-lg md:text-xl font-light">
          I (used to) play CTFs as part of various teams, including <a href="https://towerofhanoi.it/" className={linkClasses}>Tower of Hanoi</a>, <a href="https://mhackeroni.it/" className={linkClasses}>Mhackeroni</a>, <a href="https://flagbot.ch" className={linkClasses}>Flagbot</a>, and <a href="https://org.anize.rs/" className={linkClasses}>Organizers</a> and I was part of the 2023 and 2024 rosters for <a href="https://teamitaly.eu/" className={linkClasses}>Team Italy</a>. I was captain of the Politecnico di Milano team in the national <a href="https://cyberchallenge.it/" className={linkClasses}>CyberChallenge.IT</a> competition in 2020, reaching national 2nd place.
        </p>
        <p className="text-black font-signika text-lg md:text-xl font-light">
          I enjoy running, swimming, cycling, hiking in the beautiful Swiss mountains, trying out new foods, trying out specialty cafes, and I sometimes like to subject myself to the pain of web development.
        </p>
      </div>

      <div className="flex flex-col items-start justify-center w-full max-w-6xl backdrop-blur-xl backdrop-brightness-103 border-solid border-2 border-t-white border-l-white border-b-white/10 border-r-transparent py-8 md:py-16 px-4 md:px-32 m-8 transition-all gap-4">
        <h1 className="text-4xl md:text-4xl text-left text-black drop-shadow-2xl font-signika font-medium mb-[.5em]">
          Fun Facts
        </h1>
        <ul className="list-disc list-inside text-black font-signika text-lg md:text-xl font-light">
          <li>I completed my first (and, so far, only!) triathlon in 2 hours, 55 minutes and 37 seconds</li>
          <li>I've been featured twice on the <a href="https://securitycryptographywhatever.com/" className={linkClasses}>Security, Cryptography, Whatever.</a> podcast.</li>
          <li>I won "Best Rump Session" award at EUROCRYPT 2024</li>
        </ul>
      </div>
    </div>
  );
}
