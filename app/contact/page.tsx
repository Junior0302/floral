"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { gsap } from "gsap";
import { MapPin, Phone, Mail, Instagram, Facebook, Clock, Send } from "lucide-react";
import AnimatedTitle from "@/components/AnimatedTitle";
import Footer from "@/components/Footer";
import { useStore } from "@/lib/store/cart";

const schema = z.object({
  name: z.string().min(2, "Veuillez entrer votre nom"),
  email: z.string().email("Adresse email invalide"),
  subject: z.string().min(3, "Sujet requis"),
  message: z.string().min(10, "Message trop court (10 caractères minimum)"),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    text: "12 Rue de la Paix, 75002 Paris",
  },
  {
    icon: Phone,
    title: "Téléphone",
    text: "+33 1 42 00 00 00",
  },
  {
    icon: Mail,
    title: "Email",
    text: "bonjour@flora.paris",
  },
  {
    icon: Clock,
    title: "Horaires",
    text: "Lun – Sam · 9h – 19h",
  },
];

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);
  const addToast = useStore((s) => s.addToast);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out", delay: 0.1 }
    );
  }, []);

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    setSent(true);
    addToast({
      type: "success",
      title: "Message envoyé",
      message: `Merci ${data.name}, nous vous répondrons sous 24h.`,
    });
    reset();
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="page-content pt-28">
      <section className="section-spacious px-6 md:px-12 lg:px-16">
        <AnimatedTitle
          text="Contact"
          as="h1"
          className="flora-title text-6xl font-light md:text-7xl lg:text-[5.5rem]"
        />
        <p className="flora-body mt-6 max-w-xl font-poppins text-base leading-relaxed md:text-lg">
          Une question, une commande sur mesure ou un événement à célébrer ?
          Notre équipe vous répond avec attention.
        </p>
      </section>

      <section className="px-6 pb-8 md:px-12 lg:px-16">
        <div ref={contentRef} className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
            {/* Image + infos */}
            <div className="lg:col-span-2">
              <div className="float-image relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/flowers/4.png"
                  alt="Composition florale FLORA"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {contactInfo.map(({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className="glass-card flex items-start gap-4 rounded-2xl p-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-flora-coral/15">
                      <Icon size={18} className="text-flora-coral" />
                    </div>
                    <div>
                      <p className="flora-muted font-poppins text-[10px] tracking-[0.15em] uppercase">
                        {title}
                      </p>
                      <p className="flora-body mt-1 font-poppins text-sm">{text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                {[
                  { label: "Instagram", Icon: Instagram },
                  { label: "Facebook", Icon: Facebook },
                ].map(({ label, Icon }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    data-cursor="hover"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all hover:border-white/30 hover:text-white"
                  >
                    <Icon size={18} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>

            {/* Formulaire */}
            <div className="lg:col-span-3">
              <div className="glass-card rounded-[24px] p-8 md:p-10">
                <h2 className="flora-title font-playfair text-2xl md:text-3xl">
                  Écrivez-nous
                </h2>
                <p className="flora-muted mt-3 font-poppins text-sm">
                  Remplissez le formulaire ci-dessous, nous vous répondrons rapidement.
                </p>

                <form
                  ref={formRef}
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-8 space-y-7"
                >
                  <div className="grid gap-7 sm:grid-cols-2">
                    <Field label="Nom complet" error={errors.name?.message}>
                      <input
                        {...register("name")}
                        placeholder="Jean Dupont"
                        className="input-on-video w-full py-3 font-poppins text-sm"
                      />
                    </Field>
                    <Field label="Email" error={errors.email?.message}>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="vous@email.com"
                        className="input-on-video w-full py-3 font-poppins text-sm"
                      />
                    </Field>
                  </div>

                  <Field label="Sujet" error={errors.subject?.message}>
                    <input
                      {...register("subject")}
                      placeholder="Commande sur mesure, événement..."
                      className="input-on-video w-full py-3 font-poppins text-sm"
                    />
                  </Field>

                  <Field label="Message" error={errors.message?.message}>
                    <textarea
                      {...register("message")}
                      rows={6}
                      placeholder="Décrivez votre projet floral..."
                      className="input-on-video w-full resize-none py-3 font-poppins text-sm leading-relaxed"
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={isSubmitting || sent}
                    data-cursor="hover"
                    className="flora-btn-primary flex w-full items-center justify-center gap-2 py-4 font-poppins text-xs tracking-[0.15em] uppercase disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      "Envoi en cours..."
                    ) : sent ? (
                      "Message envoyé ✓"
                    ) : (
                      <>
                        <Send size={15} />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="float-image mx-auto mt-16 overflow-hidden rounded-[24px]">
            <iframe
              title="Localisation FLORA Paris"
              src="https://www.openstreetmap.org/export/embed.html?bbox=2.328%2C48.868%2C2.338%2C48.873&layer=mapnik&marker=48.8705%2C2.3330"
              className="h-64 w-full border-0 grayscale opacity-90 md:h-80"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flora-muted mb-2.5 block font-poppins text-[10px] tracking-[0.18em] uppercase">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-2 font-poppins text-xs text-flora-coral">{error}</p>
      )}
    </div>
  );
}
