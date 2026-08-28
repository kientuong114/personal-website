---
title: Message Injection Attacks Against Signal
authors: [Kien Tuong Truong, Noemi Terzo, Kenny Paterson]
venue: USENIX Security
year: 2026
date: 2026-08-12
links:
  - { label: ePrint, url: "https://eprint.iacr.org/2026/484" }
---

Signal is a secure messaging app offering end-to-end security for pairwise and
group communications. It has tens of millions of users, and has heavily
influenced the design of other secure messaging apps (including WhatsApp).
Signal has been heavily analysed and, as a result, is rightly regarded as
setting the "gold standard" for messaging apps by the scientific community.

We present two practical attacks that break the integrity properties of Signal
in its advertised threat model. Each attack arises from different features of
Signal that are poorly documented and have eluded formal security analyses. The
first attack, affecting Android and Desktop, arises from Signal's introduction
of identities based on usernames (instead of phone numbers) in early 2022. We
show that the protocol for resolving identities based on usernames and on phone
numbers introduced a vulnerability that allows a malicious server to inject
arbitrary messages into one-to-one conversations under specific circumstances.
The injection causes a user-visible alert about a change of safety numbers, but
if the users compare their safety numbers, they will be correct. The second
attack is even more severe. It arises from Signal's Sealed Sender (SSS) feature,
designed to allow sender identities to be hidden. We show that a combination of
two errors in the SSS implementation in Android allows a malicious server to
inject arbitrary messages into both one-to-one and group conversations. The
errors relate to missing key checks and the loss of context when cryptographic
processing is distributed across multiple software components. The attack is
undetectable by users and can be mounted at any time, without any
preconditions. As far as we can tell, the vulnerability has been present since
the introduction of SSS in 2018.

We disclosed both attacks to Signal. The vulnerabilities were promptly
acknowledged and patched: the first vulnerability was fixed two days after
disclosure, while the second one was patched after eight days. Beyond
presenting these devastating attacks on Signal's end-to-end security
guarantees, we discuss more broadly what can be learned about the challenges of
deploying new security features in complex software projects.
