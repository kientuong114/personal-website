"use client";

import PublicationEntry from "@/components/PublicationEntry";

export default function Publications() {
  return (
    <div className="flex flex-col items-center justify-start p-4 md:p-8 min-h-screen">

      {/* Publications Card*/}
      <div className="flex flex-col items-start justify-center gap-8 md:gap-12 w-full max-w-6xl backdrop-blur-md md:backdrop-blur-xl backdrop-brightness-103 border-solid border-2 border-t-white border-l-white border-b-white/10 border-r-transparent p-8 md:p-16 m-8 transition-all">
        <h1 className="text-4xl md:text-4xl text-left text-black drop-shadow-2xl font-signika font-medium mb-[.5em]">
          Publications
        </h1>
        <PublicationEntry
          authors={
            <>
              <b>Kien Tuong Truong</b>, Noemi Terzo, Kenny Paterson
            </>
          }
          title="Message Injection Attacks Against Signal"
          venue="USENIX Security 2026"
          links={[
            { url: "https://eprint.iacr.org/2025/558", label: "ePrint" }
          ]}
        >
        <p>Signal is a secure messaging app offering end-to-end security for pairwise and group communications. It has tens of millions of users, and has heavily influenced the design of other secure messaging apps (including WhatsApp). Signal has been heavily analysed and, as a result, is rightly regarded as setting the &quot;gold standard&quot; for messaging apps by the scientific community.</p>
          <p>We present two practical attacks that break the integrity properties of Signal in its advertised threat model. Each attack arises from different features of Signal that are poorly documented and have eluded formal security analyses. The first attack, affecting Android and Desktop, arises from Signal&apos;s introduction of identities based on usernames (instead of phone numbers) in early 2022. We show that the protocol for resolving identities based on usernames and on phone numbers introduced a vulnerability that allows a malicious server to inject arbitrary messages into one-to-one conversations under specific circumstances. The injection causes a user-visible alert about a change of safety numbers, but if the users compare their safety numbers, they will be correct. The second attack is even more severe.
It arises from Signal&apos;s Sealed Sender (SSS) feature, designed to allow sender identities to be hidden. We show that a combination of two errors in the SSS implementation in Android allows a malicious server to inject arbitrary messages into both one-to-one and group conversations. The errors relate to missing key checks and the loss of context when cryptographic processing is distributed across multiple software components. The attack is undetectable by users and can be mounted at any time, without any preconditions. As far as we can tell, the vulnerability has been present since the introduction of SSS in 2018.</p>
  <p>We disclosed both attacks to Signal. The vulnerabilities were promptly acknowledged and patched: the first vulnerability was fixed two days after disclosure, while the second one was patched after eight days. Beyond presenting these devastating attacks on Signal&apos;s end-to-end security guarantees, we discuss more broadly what can be learned about the challenges of deploying new security features in complex software projects.</p>
        </PublicationEntry>

        <PublicationEntry
          authors={
            <>
              <b>Kien Tuong Truong</b>, Simon-Philipp Merz, Matteo Scarlata, Felix Günther, Kenny Paterson
            </>
          }
          title="Breaking and Fixing Content-Defined Chunking"
          venue="ACM CCS 2025"
          links={[
            { url: "https://eprint.iacr.org/2025/558", label: "ePrint" },
            { url: "https://dl.acm.org/doi/10.1145/3719027.3744870", label: "paper" },
            { url: "https://blog.ktruong.dev/breaking-cdc/", label: "blog" },
            { url: "https://news.ycombinator.com/item?id=43474055", label: "Hacker News" }
          ]}
        >
          <p>Content-defined chunking (CDC) algorithms split streams of data into smaller blocks, called chunks, in a way that preserves chunk boundaries when the data is partially changed. CDC is ubiquitous in applications that deduplicate data such as backup solutions, software patching systems, and file hosting platforms. Much like compression, CDC can introduce leakage when combined with encryption: fingerprinting attacks can exploit chunk length patterns to infer information about the data.</p>
          <p>To address these risks, many systems---mainly in the cloud backup setting---have developed bespoke mitigations by mixing a cryptographic key into the chunking process. We study these keyed CDC (KCDC) schemes ''in the wild'', presenting efficient key recovery attacks against five different KCDC schemes, deployed in the backup solutions Borg, Bupstash, Duplicacy, Restic, and Tarsnap. Our attacks are in a realistic threat model that relies only on weak known- or chosen-plaintext capabilities. This shows, in particular, that they fail to protect against fingerprinting attacks. To demonstrate practical exploitability, we also present ''end-to-end'' attacks on three complete encrypted backup applications, namely Borg, Restic and Tarsnap. These build on our attacks on the underlying KCDC schemes.</p>
          <p>In an effort to tackle these problems, we introduce the first formal treatment for KCDC schemes and propose a provably secure construction that fulfills a strong notion of security. We benchmark our construction against existing (broken) approaches, showing that it has competitive performance. In doing so, we take a step towards making real-world systems that rely on KCDC more resilient to attacks.</p>
        </PublicationEntry>

        {/* End-to-End Encrypted Cloud Storage in the Wild: A Broken Ecosystem */}
        <PublicationEntry
          authors={
            <>
              Jonas Hofmann, <b>Kien Tuong Truong</b>
            </>
          }
          title="End-to-End Encrypted Cloud Storage in the Wild: A Broken Ecosystem"
          venue="ACM CCS 2024"
          links={[
            { url: "https://eprint.iacr.org/2024/1616", label: "ePrint" },
            { url: "https://dl.acm.org/doi/10.1145/3658644.3690309", label: "paper" },
            { url: "https://brokencloudstorage.info/", label: "website" },
            { url: "https://news.ycombinator.com/item?id=41798359", label: "Hacker News" },
            { url: "https://securitycryptographywhatever.com/2025/05/19/e2ee-storage/", label: "SCW Podcast" }
          ]}
        >
          <p>
            End-to-end encrypted cloud storage offers a way for individuals and organisations to delegate their storage needs to a third-party, while keeping control of their data using cryptographic techniques. We conduct a cryptographic analysis of various products in the ecosystem, showing that many providers fail to provide an adequate level of security. In particular, we provide an in-depth analysis of five end-to-end encrypted cloud storage systems, namely Sync, pCloud, Icedrive, Seafile, and Tresorit, in the setting of a malicious server. These companies cumulatively have over 22 million users and are major providers in the field.</p>
          <p>We unveil severe cryptographic vulnerabilities in four of them. Our attacks invalidate the marketing claims made by the providers of these systems, showing that a malicious server can, in some cases, inject files in the encrypted storage of users, tamper with file data, and even gain direct access to the content of the files. Many of our attacks affect multiple providers in the same way, revealing common failure patterns in independent cryptographic designs. We conclude by discussing the significance of these patterns beyond the security of the specific providers
        .</p>
        </PublicationEntry>

        {/* Three Lessons from Threema: Analysis of a Secure Messenger */}
        <PublicationEntry
          authors={
            <>
              <b>Kien Tuong Truong</b>, Matteo Scarlata, Kenny Paterson
            </>
          }
          title="Three Lessons from Threema: Analysis of a Secure Messenger"
          venue="USENIX Security 2023"
          links={[
            { url: "https://www.usenix.org/conference/usenixsecurity23/presentation/paterson", label: "paper" },
            { url: "https://breakingthe3ma.app/", label: "website" },
            { url: "https://news.ycombinator.com/item?id=34314504", label: "Hacker News" },
            { url: "https://securitycryptographywhatever.com/2023/01/27/threema/", label: "SCW Podcast"}
          ]}
        >
          <p>We provide an extensive cryptographic analysis of Threema, a Swiss-based encrypted messaging application with more than 10 million users and 7000 corporate customers. We present seven different attacks against the protocol in three different threat models. We discuss impact and remediations for our attacks, which have all been responsibly disclosed to Threema and patched. Finally, we draw wider lessons for developers of secure protocols.</p>
        </PublicationEntry>
      </div>
    </div>
  );
}
