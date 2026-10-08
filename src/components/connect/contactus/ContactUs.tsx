"use client";

import { useState, type ReactNode } from "react";
import axios from "axios";
import { useForm, type RegisterOptions } from "react-hook-form";
import {
  ArrowRight,
  ArrowUpRight,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import AboutPageLayout, { AboutIntro } from "@/components/about/AboutPageLayout";
import Reveal from "@/components/common/Reveal";

type FormValues = {
  name: string;
  company: string;
  task: string;
  phone: string;
  email: string;
};

const ADDRESS = "Block No.-907 & 908, Sevni, Surat, Gujarat - 394320";

const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Natraj Aluform, ${ADDRESS}`,
)}`;

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/company/natraj-aluform-pvt-ltd/",
  },
  {
    label: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/natrajaluform?igsh=ampsZjV3M3J2dTRw&utm_source=qr",
  },
];

interface TextField {
  name: Exclude<keyof FormValues, "task">;
  label: string;
  type: string;
  placeholder: string;
  autoComplete: string;
  rules: RegisterOptions<FormValues>;
}

const TEXT_FIELDS: TextField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "What should we call you?",
    autoComplete: "name",
    rules: { required: "Please enter your name" },
  },
  {
    name: "company",
    label: "Company",
    type: "text",
    placeholder: "Your company name",
    autoComplete: "organization",
    rules: { required: "Please enter your company name" },
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    placeholder: "Your contact number",
    autoComplete: "tel",
    rules: {
      required: "Please enter your phone number",
      pattern: {
        value: /^\+?[\d\s-]{7,}$/,
        message: "Please enter a valid phone number",
      },
    },
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Your email address",
    autoComplete: "email",
    rules: {
      required: "Please enter your email address",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email address",
      },
    },
  },
];

const INPUT_CLASS =
  "w-full rounded-xl border border-[#212121]/15 bg-white/80 px-4 py-3 text-base text-[#212121] outline-none transition placeholder:text-[#9a9a9a] focus:border-[#FFB600] focus:ring-4 focus:ring-[#FFB600]/20 aria-[invalid=true]:border-[#B42318]";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const [status, setStatus] = useState<"idle" | "sent" | "failed">("idle");

  const onSubmit = async (values: FormValues) => {
    setStatus("idle");
    try {
      await axios.post("/api/enquiry", values);
      reset();
      setStatus("sent");
    } catch (err) {
      console.error("Enquiry failed", err);
      setStatus("failed");
    }
  };

  return (
    <AboutPageLayout title="Contact Us" section="Connect">
      <section className="mt-14 md:mt-20">
        <AboutIntro
          lead={
            <>
              Have a project in mind? Whether you need aluminium extrusions, a
              new alloy or a custom die, our team is here to help.
            </>
          }
        >
          <p>
            Call or email us directly, or share your requirements through the
            enquiry form and we will get back to you.
          </p>
        </AboutIntro>
      </section>

      <div className="mt-20 grid items-start gap-16 md:mt-28 lg:grid-cols-12 lg:gap-16">
        {/* Top padding matches the form card's, so the two headings line up. */}
        <Reveal className="lg:col-span-5 lg:pt-10">
          <SectionTitle eyebrow="Contact Info" title="Reach us directly" />

          <ul>
            <ContactRow icon={Mail} label="Email">
              <a
                href="mailto:info@natrajaluform.com"
                className="break-all text-xl font-bold tracking-tight transition hover:text-[#9C6200] sm:text-2xl"
              >
                info@natrajaluform.com
              </a>
            </ContactRow>

            <ContactRow icon={Phone} label="Phone">
              <a
                href="tel:+919638811159"
                className="text-xl font-bold tracking-tight tabular-nums transition hover:text-[#9C6200] sm:text-2xl"
              >
                +91 96388 11159
              </a>
            </ContactRow>

            <ContactRow icon={MapPin} label="Visit Us">
              <p className="text-lg font-semibold leading-snug">{ADDRESS}</p>
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#9C6200] underline-offset-4 hover:underline"
              >
                Get directions
                <ArrowUpRight aria-hidden className="size-4" />
              </a>
            </ContactRow>
          </ul>

          <div className="flex items-center gap-4 border-t border-[#212121]/10 pt-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6b6b6b]">
              Follow Us
            </p>
            {SOCIAL_LINKS.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-11 items-center justify-center rounded-full border border-[#FFB600]/60 bg-white/60 text-[#212121] transition hover:border-[#FFB600] hover:bg-[#FFB600]"
              >
                <Icon aria-hidden className="size-5" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7">
          <div className="rounded-3xl bg-white/70 p-6 shadow-[0_40px_80px_-40px_rgba(156,98,0,0.35)] ring-1 ring-[#212121]/10 sm:p-10">
            <SectionTitle
              eyebrow="Your Contact Info"
              title="Send us an enquiry"
            />

            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-x-6 gap-y-7 sm:grid-cols-2"
            >
              {TEXT_FIELDS.map((field) => (
                <FormField
                  key={field.name}
                  id={field.name}
                  label={field.label}
                  error={errors[field.name]?.message}
                >
                  <input
                    id={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                    aria-invalid={!!errors[field.name]}
                    aria-describedby={
                      errors[field.name] ? `${field.name}-error` : undefined
                    }
                    className={INPUT_CLASS}
                    {...register(field.name, field.rules)}
                  />
                </FormField>
              ))}

              <FormField
                id="task"
                label="Describe Your Task"
                error={errors.task?.message}
                className="sm:col-span-2"
              >
                <textarea
                  id="task"
                  rows={5}
                  placeholder="How can we help you?"
                  aria-invalid={!!errors.task}
                  aria-describedby={errors.task ? "task-error" : undefined}
                  className={cn(INPUT_CLASS, "resize-none")}
                  {...register("task", {
                    required: "Please tell us a little about your task",
                  })}
                />
              </FormField>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#212121] px-8 py-4 text-base font-semibold text-white transition hover:cursor-pointer hover:bg-[#FFB600] hover:text-[#212121] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
                >
                  {isSubmitting ? "Sending..." : "Submit request"}
                  <ArrowRight aria-hidden className="size-5" />
                </button>

                <p role="status" className="text-sm font-semibold">
                  {status === "sent" && (
                    <span className="mt-4 block text-[#067647]">
                      Thank you! Your enquiry has been sent and we will get
                      back to you soon.
                    </span>
                  )}
                  {status === "failed" && (
                    <span className="mt-4 block text-[#B42318]">
                      Sorry, we couldn&apos;t send your enquiry. Please try
                      again, or email us at info@natrajaluform.com.
                    </span>
                  )}
                </p>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </AboutPageLayout>
  );
};
export default ContactUs;

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <>
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9C6200]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-4xl font-extrabold italic tracking-tight lg:text-5xl">
        {title}
      </h2>
      <div className="my-7 h-1 w-16 rounded-full bg-[#FFB600]" />
    </>
  );
}

interface ContactRowProps {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}

function ContactRow({ icon: Icon, label, children }: ContactRowProps) {
  return (
    <li className="flex gap-5 border-t border-[#212121]/10 py-6">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#FFDB8A] to-[#FFF7E6] text-[#9C6200]">
        <Icon aria-hidden className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="mb-1 text-sm font-semibold uppercase tracking-[0.2em] text-[#6b6b6b]">
          {label}
        </p>
        {children}
      </div>
    </li>
  );
}

interface FormFieldProps {
  id: keyof FormValues;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

function FormField({ id, label, error, className, children }: FormFieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-[#212121]"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#B42318]">
          {error}
        </p>
      )}
    </div>
  );
}
