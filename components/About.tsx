import Image from "next/image";
import { aboutConfig, gallery } from "@/data/config";

export default function About() {
  return (
    <section id="about" className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="section-title">
          {aboutConfig.title} <span className="text-neon-cyan">/</span>
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            {aboutConfig.text.map((p) => (
              <p key={p} className="mb-4 text-base leading-relaxed text-white/75">
                {p}
              </p>
            ))}

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {aboutConfig.features.map((f) => (
                <li key={f.title} className="glass p-4">
                  <p className="font-display text-sm font-bold uppercase text-neon-cyan">
                    {f.title}
                  </p>
                  <p className="mt-1 text-sm text-white/65">{f.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {gallery.map((src, i) => (
              <div
                key={src}
                className={`relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 ${
                  i === 0 ? "col-span-2 aspect-[16/9]" : ""
                }`}
              >
                <Image
                  src={src}
                  alt={`Интерьер клуба C4 КИБЕР АРЕНА, фото ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
