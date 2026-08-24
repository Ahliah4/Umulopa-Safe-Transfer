import { FaTint, FaShieldAlt, FaHeartbeat } from "react-icons/fa";
import "./auth.css";

export default function AuthLayout({ children, title, subtitle, eyebrow, footer }) {
  return <main className="min-h-screen overflow-hidden bg-[#fffafb] px-4 py-6 text-slate-800 sm:p-8 lg:p-12">
    <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-[#7e1420]/10 bg-white shadow-[0_28px_90px_rgba(94,15,28,0.18)] lg:grid-cols-[1.05fr_.95fr]">
      <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#5e0c16] via-[#8f1220] to-[#bd2633] p-10 text-white lg:flex lg:flex-col">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#ffb7b7]/20 blur-3xl" />
        <div className="relative flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 text-xl shadow-lg backdrop-blur"><FaTint /></span><div><p className="text-lg font-bold tracking-[.18em]">UMULOPA</p><p className="text-xs tracking-wide text-white/70">SAFE BLOOD TRANSFER</p></div></div>
        <div className="relative my-auto max-w-md pt-12"><p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur"><FaShieldAlt /> Secure healthcare access</p><h1 className="text-4xl font-semibold leading-tight">Connecting care, one safe transfer at a time.</h1><p className="mt-5 text-base leading-7 text-white/80">A trusted workspace for blood centres, hospital teams, donors, and system administrators.</p>
          <div className="relative mt-8 rounded-[1.75rem] border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-xl"><img className="h-60 w-full rounded-[1.35rem] object-cover mix-blend-screen opacity-95" src="/images/blood-illustration.jpg" alt="Blood donation bag connected to a heart" /><span className="absolute bottom-6 left-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#7e1420] shadow-lg"><FaHeartbeat /> Saving lives together</span></div>
        </div>
        <p className="relative text-xs text-white/60">Protected clinical information • Secure role-based access</p>
      </section>
      <section className="flex items-center justify-center bg-white p-6 sm:p-10 lg:p-12">
        <div className="w-full max-w-md">
          {(title || subtitle || eyebrow || footer) && (
            <div className="sr-only" aria-live="polite">
              {eyebrow && <p>{eyebrow}</p>}
              {title && <h2>{title}</h2>}
              {subtitle && <p>{subtitle}</p>}
              {footer && <p>{footer}</p>}
            </div>
          )}
          {children}
        </div>
      </section>
    </div>
  </main>;
}
