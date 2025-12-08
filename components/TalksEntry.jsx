"use client";

export default function TalksEntry({ title, venue, links, description}) {
  return (
    <div className="w-full mb-8">
    <p className="text-xl md:text-2xl font-medium m-0 mb-2 md:mb-0">
        {title}
      </p>
      <p className="text-sm md:text-md font-light mb-2 md:mb-0">
        {venue}
      </p>
      <p className="font-light text-sm md:text-md">
        {links.map((link, index) => (
          <span key={index}>
            <a href={link.url} className="text-slate-500 contrast-more:text-blue-700 underline contrast-more:underline-offset-2 contrast-more:decoration-2 hover:text-slate-900 contrast-more:hover:text-blue-900 transition-colors duration-300" aria-label={`${link.label} (external link)`}>[{link.label}]</a>{" "}
          </span>
        ))}
      </p>
      <p className="font-light">
        {description}
      </p>

    </div>
  );
}
