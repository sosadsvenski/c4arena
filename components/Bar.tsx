import Image from "next/image";
import type { CSSProperties } from "react";
import { barMenu } from "@/data/config";
import { drinkSvg } from "@/lib/drinkSvg";

export default function Bar() {
  let idx = 0;

  return (
    <section id="bar" className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="section-title">
          {barMenu.title} <span className="text-neon-pink">/</span>
        </h2>

        {barMenu.groups.map((group) => (
          <div key={group.name}>
            <h3 className="grp">{group.name}</h3>
            <ul className={`menu-grid ${group.columns === 4 ? "g4" : "g3"}`}>
              {group.items.map((item) => {
                const i = idx++;
                return (
                  <li
                    key={item.name}
                    className={`drink${item.image ? " has-img" : ""}`}
                    style={{ "--c": item.art.c } as CSSProperties}
                  >
                    <div className="art">
                      <div className="fl" style={{ animationDelay: `${-i * 0.7}s` }}>
                        {item.image ? (
                          <Image src={item.image} alt={item.name} width={item.imageWidth ?? 340} height={740} />
                        ) : (
                          <span
                            className="contents"
                            dangerouslySetInnerHTML={{ __html: drinkSvg(item.art, i) }}
                          />
                        )}
                      </div>
                    </div>
                    <h4>{item.name}</h4>
                    {item.note && <p className="note">{item.note}</p>}
                    <span className="price">
                      {item.price}
                      <small>{barMenu.currency}</small>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
