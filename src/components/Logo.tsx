import Image from "next/image";
import logo from "../../public/brand/sowaanerp-logo.png";

export const BRAND = {
  name: "SowaanERP",
  email: "info@sowaanerp.co.uk",
  phone: "+44 7822 023291",
  phoneHref: "tel:+447822023291",
  whatsapp: "https://wa.me/447822023291",
  social: {
    facebook: "https://www.facebook.com/sowaanerp",
    instagram: "https://www.instagram.com/sowaanerp_official/",
    linkedin: "https://www.linkedin.com/company/sowaan/",
    youtube: "https://www.youtube.com/@sowaanerp",
  },
};

/** Official logo image, for light backgrounds. */
export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return <Image src={logo} alt="SowaanERP" className={className} priority />;
}

/** Text wordmark, for dark backgrounds where the purple logo would not show. */
export function LogoLight() {
  return (
    <span className="text-xl font-black tracking-tight text-white">
      sowaan
      <span className="ml-0.5 rounded-full bg-accent-500 px-1.5 py-0.5 text-sm font-bold">ERP</span>
    </span>
  );
}
