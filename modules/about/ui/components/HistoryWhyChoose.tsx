"use client";

import { useRef } from "react";
import { Eye, Send, Heart } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HistoryWhyChoose = () => {
  const historySectionRef = useRef<HTMLDivElement>(null);
  const whyChooseSectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // History Section Animations
    if (historySectionRef.current) {
      const historyTitle =
        historySectionRef.current.querySelector(".history-title");
      const historyText =
        historySectionRef.current.querySelectorAll(".history-text");
      const historyQuote =
        historySectionRef.current.querySelector(".history-quote");

      gsap.from(historyTitle, {
        scrollTrigger: {
          trigger: historySectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(historyText, {
        scrollTrigger: {
          trigger: historySectionRef.current,
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(historyQuote, {
        scrollTrigger: {
          trigger: historySectionRef.current,
          start: "top 70%",
        },
        scale: 0.95,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: "back.out(1.2)",
      });
    }

    // Why Choose Section Animations
    if (whyChooseSectionRef.current) {
      const whyTitle = whyChooseSectionRef.current.querySelector(".why-title");
      const cards = whyChooseSectionRef.current.querySelectorAll(".why-card");

      gsap.from(whyTitle, {
        scrollTrigger: {
          trigger: whyChooseSectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(cards, {
        scrollTrigger: {
          trigger: whyChooseSectionRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.3,
        ease: "power3.out",
      });
    }
  });

  return (
    <>
      {/* History Section */}
      <div ref={historySectionRef} className="bg-ivory py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="history-title text-teal-green text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            History of Gyan Group
          </h2>

          <div className="space-y-6">
            <p className="history-text text-pewter text-base md:text-lg leading-relaxed">
              <span className="font-semibold text-ebony">Founded in 2008</span>,
              Gyan started its journey as a{" "}
              <span className="font-semibold text-ebony">
                pioneer in Chemical Technology
              </span>{" "}
              in{" "}
              <span className="font-semibold text-ebony">
                Vapi, Gujarat, India
              </span>
              . With continuous growth and innovation, we expanded in{" "}
              <span className="font-semibold text-ebony">2013</span> with Gyan
              Healthcare and later strengthened our presence in{" "}
              <span className="font-semibold text-ebony">2017</span> with
              Reliable Life Science in{" "}
              <span className="font-semibold text-ebony">Sarigam, Gujarat</span>
              .
            </p>

            <div className="history-quote bg-teal-green/5 border-l-4 border-teal-green rounded-r-xl p-6 md:p-8 mt-8">
              <p className="text-ebony text-lg md:text-xl lg:text-2xl italic leading-relaxed">
                &quot;We strive to become acknowledged Global Leaders and
                preferred Partners in helping our Clients succeed in the rapidly
                evolving Specialty Chemical markets.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div
        ref={whyChooseSectionRef}
        className="relative bg-cover bg-no-repeat bg-center bg-fixed py-20 md:py-28 lg:py-36"
        style={{
          backgroundImage: "url('/banner/banner-1.jpg')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-ebony/85" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="why-title text-ivory text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Vision Card */}
            <div className="why-card group">
              <div className="bg-ebony/60 backdrop-blur-sm border border-teal-green/20 rounded-2xl p-8 hover:bg-ebony/80 hover:border-teal-green/40 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-coral-red flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <Eye className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-ivory text-2xl md:text-3xl font-bold">
                    Vision
                  </h3>
                </div>
                <p className="text-pewter text-base md:text-lg leading-relaxed">
                  To constantly endeavour to create a sustainable position as
                  one of the leading but diversified chemical companies with a
                  strong manufacturing base in specialty chemicals, aiming for
                  global presence with worldwide product acceptability.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="why-card group">
              <div className="bg-ebony/60 backdrop-blur-sm border border-teal-green/20 rounded-2xl p-8 hover:bg-ebony/80 hover:border-teal-green/40 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-coral-red flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <Send className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-ivory text-2xl md:text-3xl font-bold">
                    Mission
                  </h3>
                </div>
                <p className="text-pewter text-base md:text-lg leading-relaxed">
                  Empowered work environment, Innovation & efficiency, Ethical
                  way of functioning, Honouring commitments, Exceptional quality
                  and service, which add value to the end product.
                </p>
              </div>
            </div>
          </div>

          {/* Values Card - Full Width */}
          <div className="why-card group">
            <div className="bg-ebony/60 backdrop-blur-sm border border-teal-green/20 rounded-2xl p-8 hover:bg-ebony/80 hover:border-teal-green/40 transition-all duration-500 hover:shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-coral-red flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-ivory text-2xl md:text-3xl font-bold">
                  Values
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-teal-green mt-2 shrink-0" />
                    <p className="text-pewter text-base md:text-lg leading-relaxed">
                      <span className="font-semibold text-ivory">CARE:</span>{" "}
                      Our commitment to care includes care of all our employees,
                      our customers, our suppliers, our community and our
                      environment.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-teal-green mt-2 shrink-0" />
                    <p className="text-pewter text-base md:text-lg leading-relaxed">
                      <span className="font-semibold text-ivory">
                        Integrity:
                      </span>{" "}
                      We always practice the quality of being honest and having
                      strong moral principles.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-teal-green mt-2 shrink-0" />
                    <p className="text-pewter text-base md:text-lg leading-relaxed">
                      <span className="font-semibold text-ivory">Quality:</span>{" "}
                      We always care to achieve quality with consistent supply.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-teal-green mt-2 shrink-0" />
                    <p className="text-pewter text-base md:text-lg leading-relaxed">
                      <span className="font-semibold text-ivory">Trust:</span>{" "}
                      &quot;Trust is built with consistency&quot; We believe in
                      building trust.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryWhyChoose;
