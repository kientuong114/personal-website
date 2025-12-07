"use client";

import TalksEntry from "@/components/TalksEntry";

export default function Talks() {
  return (
    <div className="flex flex-col items-center justify-start p-4 md:p-8 min-h-screen">
      {/* Talks Card*/}
      <div className="flex flex-col items-start justify-center gap-4 md:gap-4 w-full max-w-6xl backdrop-blur-xl backdrop-brightness-103 border-solid border-2 border-t-white border-l-white border-b-white/10 border-r-transparent p-8 md:p-16 m-8">
        <h1 className="text-4xl md:text-4xl text-left text-black drop-shadow-2xl font-signika font-medium mb-[.5em]">
          Talks
        </h1>
        <TalksEntry 
          title="Breaking and Fixing Content-Defined Chunking"
          venue="ACM CCS 2025, Real World Crypto 2025"
          links={[
            { url: "https://www.youtube.com/watch?v=fH4xMJDuV5M", label: "RWC Recording" },
            { url: "https://iacr.org/submit/files/slides/2025/rwc/rwc2025/109/109_slides.pdf", label: "RWC Slides" }
          ]}
          description={""}
        />
        <TalksEntry 
          title="If It Ain't Not Broken, Do Fix It!"
          venue="Chaos Communication Camp 2023"
          links={[
            { url: "https://media.ccc.de/v/camp2023-57170-if_it_ain_t_broken_do_fix_it", label: "CCC" }
          ]}
          description={""}
        />
        <TalksEntry 
          title="Three Lessons from Threema: Analysis of a Secure Messenger"
          venue="USENIX Security 2023, Real World Crypto 2023, ZISC Seminar Series @ ETH Zurich"
          links={[
            { url: "https://www.youtube.com/watch?v=BeECKejKQF0", label: "USENIX" },
            { url: "https://youtu.be/sthXs4zJ5XU?list=PLeeS-3Ml-rpo-pbh8LIhb8VscM_q5OaSE&t=1904", label: "RWC" }
          ]}
          description={""}
        />

        <h1 className="text-4xl md:text-4xl text-left text-black drop-shadow-2xl font-signika font-medium mb-[.5em]">
          Workshops
        </h1>

        <TalksEntry 
          title="Cryptographic Vulnerabilities and How To Find Them"
          venue="Summer School on Real-World Crypto and Privacy (Vodice, Croatia)"
          links={[
            { url: "https://summerschool-croatia.cs.ru.nl/2024/tutorials.html", label: "Website" }
          ]}
          description={""}
        />

      </div>
    </div>
  );
}
