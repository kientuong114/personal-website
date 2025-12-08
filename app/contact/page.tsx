"use client";

import PublicKeyBox from "@/components/PublicKeyBox";

export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-start p-4 md:p-8 min-h-screen">
      {/* Contact Card*/}
      <div className="flex flex-col items-start justify-center gap-4 md:gap-4 w-full max-w-6xl backdrop-blur-md md:backdrop-blur-xl backdrop-brightness-103 border-solid border-2 border-t-white border-l-white border-b-white/10 border-r-transparent p-8 md:p-16 m-8">
        <h1 className="text-4xl md:text-4xl text-left text-black drop-shadow-2xl font-signika font-medium mb-[.5em]">
          Contact
        </h1>
        <div className="w-full">
          <p className="font-light text-lg">
            Feel free to reach me at by sending an email to any address under the domain <b>ktruong.dev</b>.
          </p>
          <p className="font-light text-lg">
            Alternatively, and especially if you want to contact me about work, you can find my work email on my ETH page.
          </p>
        </div>

        <h2 className="text-2xl md:text-2xl text-left text-black drop-shadow-2xl font-signika font-medium mb-[.5em] mt-8">
          Public Keys
        </h2>

        <div className="w-full space-y-6">
          <PublicKeyBox
            title="age"
            fingerprint=""
            keyContent="age145e9f3lw68xc75ffrjz2cgfx0pxfgp3mhak607s8uevygwrd7vdss6wtda"
          />
          <PublicKeyBox
            title="PGP Key (Personal)"
            fingerprint="Fingerprint: 2CBA 9BAB 6863 D42D AB43 9FED 8BB6 15A1 D76A CAAA"
            keyContent={`-----BEGIN PGP PUBLIC KEY BLOCK-----
mDMEaTX+RhYJKwYBBAHaRw8BAQdAnfpcsTHb3zmxv13bl4cFtMNCbrDnnPzxqqrV
d9zNrze0JEtpZW4gVHVvbmcgVHJ1b25nIDxpbmZvQGt0cnVvbmcuZGV2PoiQBBMW
CgA4FiEELLqbq2hj1C2rQ5/ti7YVoddqyqoFAmk1/kYCGwMFCwkIBwIGFQoJCAsC
BBYCAwECHgECF4AACgkQi7YVoddqyqoclAD+OPhqBWJ3ovq/qscMe47hOLfGzGH4
x/aJfVwDHAZ2GyMA/jSfsWVM+gLqDNSdJAGBdfzFekL9+4vUrhbW5hvKFwcKuDgE
aTX+RhIKKwYBBAGXVQEFAQEHQEes4z2S5nk1h9XfKCaYRbcwAiSxcDYLr4PrqLPK
PYBOAwEIB4h4BBgWCgAgFiEELLqbq2hj1C2rQ5/ti7YVoddqyqoFAmk1/kYCGwwA
CgkQi7YVoddqyqrlBAD/a3cmLaFNs4yUCbmyjjoho8kr/zkFw91N9Bzm/luFwMkA
/2giF33zcxGMTWt0TgUvzWdmBOXIWCAvavTvIeECx80C
=CPDk
-----END PGP PUBLIC KEY BLOCK-----`}
          />
          <PublicKeyBox
            title="PGP Key (Work)"
            fingerprint="Fingerprint: 86F7 0C19 CFEE F2D7 C218 F626 9B9E 2683 47CF 11E6"
            keyContent={`-----BEGIN PGP PUBLIC KEY BLOCK-----
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
=Yimo
-----END PGP PUBLIC KEY BLOCK-----`}
          />
        </div>
      </div>
    </div>
  );
}
