"use client";

import { useState } from "react";

const directions = [
  { id: "editorial", number: "01", name: "The Edit", note: "Quiet luxury" },
  { id: "bold", number: "02", name: "Pop Studio", note: "Bright & social" },
  { id: "warm", number: "03", name: "Slow Beauty", note: "Warm & organic" },
] as const;

type Direction = (typeof directions)[number]["id"];

const copy = {
  editorial: { brand: "Atelier Nail", eyebrow: "Modern nail care · Phoenix, Arizona", headline: <>The art of<br/><em>the perfect</em> set.</>, intro: "A modern nail atelier for meticulous manicures, structured gel, and subtle art—finished with the kind of care you can feel.", quote: "Every appointment feels considered, calm, and completely personal." },
  bold: { brand: "Pop Polish", eyebrow: "Good nails. Great energy. Zero rules.", headline: <>Color looks<br/><em>good on you.</em></>, intro: "Playful nail art, juicy color, and long-wearing sets made for compliments. Bring an idea—or let our artists surprise you.", quote: "The nail art is unreal, and I leave in a better mood every single time." },
  warm: { brand: "Sola Studio", eyebrow: "A slower kind of beauty ritual", headline: <>Rest your hands.<br/><em>Stay awhile.</em></>, intro: "Thoughtful nail care in a warm, unhurried studio. Clean products, gentle technique, and naturally beautiful results.", quote: "The most relaxing hour of my month—and my nails have never been healthier." },
};

const services = [
  { n: "01", title: "The Signature", detail: "Detailed cuticle care, shaping, polish, and a restorative hand treatment.", time: "50 min", price: "$48" },
  { n: "02", title: "Structured Gel", detail: "A strengthening overlay with a flawless, glossy finish that lasts.", time: "75 min", price: "$72" },
  { n: "03", title: "Art, Your Way", detail: "Custom hand-painted details, chrome, aura, or a perfectly minimal accent.", time: "Add on", price: "from $12" },
];

export default function Showcase() {
  const [direction, setDirection] = useState<Direction>("editorial");
  const active = copy[direction];

  return (
    <main className={`site theme-${direction}`}>
      <section className="direction-bar" aria-label="Select a website direction">
        <div className="direction-intro"><span>Website concepts</span><strong>Choose a direction</strong></div>
        <div className="direction-options">
          {directions.map((item) => (
            <button key={item.id} className={direction === item.id ? "active" : ""} onClick={() => setDirection(item.id)} aria-pressed={direction === item.id}>
              <span>{item.number}</span><strong>{item.name}</strong><small>{item.note}</small>
            </button>
          ))}
        </div>
      </section>

      <div className="concept-shell" key={direction}>
        <header>
          <a className="brand" href="#top" aria-label={`${active.brand} home`}>{active.brand}</a>
          <nav aria-label="Main navigation"><a href="#services">Services</a><a href="#studio">Studio</a><a href="#visit">Visit</a></nav>
          <a className="header-cta" href="#book">Book an appointment</a>
        </header>

        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">{active.eyebrow}</p><h1>{active.headline}</h1><p className="intro">{active.intro}</p>
            <div className="hero-actions"><a className="primary" href="#book">Book your visit</a><a className="text-link" href="#services">Explore services <span>↘</span></a></div>
          </div>
          <div className="art-card" aria-label="Abstract nail polish artwork">
            <span className="art-word">{direction === "bold" ? "POP" : direction === "warm" ? "SOLA" : "A"}</span>
            <i className="polish polish-one"/><i className="polish polish-two"/><i className="polish polish-three"/>
            <div className="art-caption"><span>01</span><span>Color study<br/>for every mood</span></div>
          </div>
          <p className="scroll-note">Scroll to discover <span>↓</span></p>
        </section>

        <section className="trust-strip" aria-label="Salon highlights">
          <span>5.0 <i>★★★★★</i><small>120+ local reviews</small></span><span>10-free<small>thoughtful products</small></span><span>7 days<small>open every week</small></span>
        </section>

        <section className="services" id="services">
          <div className="section-heading"><p className="eyebrow">The menu</p><h2>Small details.<br/><em>Major impact.</em></h2><p>Intentional services, beautiful results, and no rushed appointments.</p></div>
          <div className="service-list">{services.map((service) => <article key={service.n}><span>{service.n}</span><div><h3>{service.title}</h3><p>{service.detail}</p></div><small>{service.time}</small><strong>{service.price}</strong></article>)}</div>
        </section>

        <section className="studio" id="studio">
          <div className="studio-art"><span>made<br/>with<br/><em>care</em></span></div>
          <div className="studio-copy"><p className="eyebrow">Our philosophy</p><h2>Come for the nails.<br/><em>Stay for the feeling.</em></h2><p>We designed our studio around the belief that beauty appointments should feel like a reset. That means skilled artists, respectful care, considered products, and enough time to do things beautifully.</p><a className="text-link" href="#visit">Meet the studio <span>→</span></a></div>
        </section>

        <section className="testimonial"><span className="quote-mark">“</span><blockquote>{active.quote}</blockquote><p>— Maya R. · regular since 2022</p></section>
        <section className="booking" id="book"><p className="eyebrow">Your seat is waiting</p><h2>Ready for your<br/><em>next favorite set?</em></h2><a className="primary light" href="mailto:hello@ateliernail.com">Find an appointment <span>↗</span></a></section>

        <footer id="visit"><div><a className="brand" href="#top">{active.brand}</a><p>Beautiful nails. Thoughtfully done.</p></div><div><strong>Visit</strong><span>4120 N 36th Street<br/>Phoenix, AZ 85018</span></div><div><strong>Hours</strong><span>Mon–Sat · 9–7<br/>Sunday · 10–5</span></div><div><strong>Follow</strong><span>Instagram · TikTok<br/>Pinterest</span></div></footer>
      </div>
    </main>
  );
}
