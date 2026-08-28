---
title: "End-to-End Encrypted Cloud Storage in the Wild: A Broken Ecosystem"
authors: [Jonas Hofmann, Kien Tuong Truong]
venue: ACM CCS
year: 2024
date: 2024-10-14
links:
  - { label: ePrint, url: "https://eprint.iacr.org/2024/1616" }
  - { label: paper, url: "https://dl.acm.org/doi/10.1145/3658644.3690309" }
  - { label: website, url: "https://brokencloudstorage.info/" }
  - { label: Hacker News, url: "https://news.ycombinator.com/item?id=41798359" }
  - {
      label: SCW Podcast,
      url: "https://securitycryptographywhatever.com/2025/05/19/e2ee-storage/",
    }
---

End-to-end encrypted cloud storage offers a way for individuals and
organisations to delegate their storage needs to a third-party, while keeping
control of their data using cryptographic techniques. We conduct a cryptographic
analysis of various products in the ecosystem, showing that many providers fail
to provide an adequate level of security. In particular, we provide an in-depth
analysis of five end-to-end encrypted cloud storage systems, namely Sync,
pCloud, Icedrive, Seafile, and Tresorit, in the setting of a malicious server.
These companies cumulatively have over 22 million users and are major providers
in the field.

We unveil severe cryptographic vulnerabilities in four of them. Our attacks
invalidate the marketing claims made by the providers of these systems, showing
that a malicious server can, in some cases, inject files in the encrypted
storage of users, tamper with file data, and even gain direct access to the
content of the files. Many of our attacks affect multiple providers in the same
way, revealing common failure patterns in independent cryptographic designs. We
conclude by discussing the significance of these patterns beyond the security of
the specific providers.
