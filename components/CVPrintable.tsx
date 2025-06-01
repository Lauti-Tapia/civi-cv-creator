import React from "react";

interface Experience {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Link {
  label: string;
  url: string;
}

interface CVData {
  presentation: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  links: Link[];
  objective?: string;
  experiences: Experience[];
  educations: { degree: string; institution: string; graduationYear: string }[];
  certifications: { name: string; institution: string; date: string; id?: string }[];
  languages: { language: string; level: string }[];
  technicalSkills: string;
  showCertifications: boolean;
  professionalTitle?: string;
}

const t = {
  es: {
    presentacion: "Presentación Profesional",
    habilidades: "Habilidades Técnicas",
    experiencia: "Experiencia Laboral",
    educacion: "Educación",
    certificaciones: "Certificaciones",
    idiomas: "Idiomas",
    datosPersonales: "Información Personal",
    tituloProfesional: "Título Profesional",
  },
  en: {
    presentacion: "Professional Summary",
    habilidades: "Technical Skills",
    experiencia: "Work Experience",
    educacion: "Education",
    certificaciones: "Certifications",
    idiomas: "Languages",
    datosPersonales: "Personal Information",
    tituloProfesional: "Professional Title",
  },
};

export function CVPrintable({ data, language }: { data: CVData, language?: 'es' | 'en' }) {
  const lang = language || 'es';
  return (
    <div className="bg-white text-black w-full p-0 m-0 text-[12px] font-serif" style={{ lineHeight: 1.6 }}>
      {/* Nombre grande y en negrita */}
      <div className="text-[28px] font-bold mb-2 text-center tracking-tight">{data.fullName}</div>
      {/* Título profesional */}
      {data.professionalTitle && (
        <div className="text-[16px] font-bold text-black text-center mb-1">{data.professionalTitle}</div>
      )}
      {/* Información Personal */}
      <section className="mb-4 text-center">
        <div className="text-[13px] mb-1">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span> {data.email ? ' | ' : ''}{data.phone}</span>}
          {data.city && <span> {(data.email || data.phone) ? ' | ' : ''}{data.city}</span>}
          {data.country && <span> {(data.email || data.phone || data.city) ? ' | ' : ''}{data.country}</span>}
        </div>
        {data.links && data.links.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center">
            {data.links.map((link, i) => (
              <span key={i} className="text-blue-700 underline break-all">{link.label}</span>
            ))}
          </div>
        )}
      </section>
      <hr className="border-t border-gray-400 my-4" />
      {/* Presentación Profesional */}
      <section className="mb-4">
        <h2 className="font-bold text-[16px] mb-0">{t[lang].presentacion}</h2>
        <div>{data.presentation}</div>
      </section>
      <hr className="border-t border-gray-400 my-4" />
      {/* Habilidades Técnicas */}
      <section className="mb-4">
        <h2 className="font-bold text-[16px] mb-0">{t[lang].habilidades}</h2>
        <div>{data.technicalSkills}</div>
      </section>
      <hr className="border-t border-gray-400 my-4" />
      {/* Experiencia Laboral */}
      <section className="mb-4">
        <h2 className="font-bold text-[16px] mb-0">{t[lang].experiencia}</h2>
        {data.experiences.map((exp, idx) => (
          <div key={idx}>
            <div>
              <strong>{exp.role}</strong> | <strong>{exp.company}</strong>
            </div>
            <div className="text-[11px] text-gray-700">
              {exp.startDate} - {exp.endDate}
            </div>
            <div className="my-1">{exp.description}</div>
          </div>
        ))}
      </section>
      <hr className="border-t border-gray-400 my-4" />
      {/* Educación */}
      {data.educations && data.educations.length > 0 && (
        <section className="mb-4">
          <h2 className="font-bold text-[16px] mb-0">{t[lang].educacion}</h2>
          <ul className="m-0 p-0 list-none">
            {data.educations.map((edu, idx) => (
              <li key={idx} className="mb-1 font-normal">
                <span className="font-semibold">{edu.degree}</span> - {edu.institution} ({edu.graduationYear})
              </li>
            ))}
          </ul>
        </section>
      )}
      {/* Certificaciones */}
      {data.showCertifications &&
        data.certifications &&
        data.certifications.length > 0 &&
        data.certifications.some(c => c.name) && (
        <section className="mb-4">
          <h2 className="font-bold text-[16px] mb-0">{t[lang].certificaciones}</h2>
          <ul className="m-0 p-0 list-none">
            {data.certifications.filter(c => c.name).map((cert, idx) => (
              <li key={idx} className="mb-1 font-normal">
                <span className="font-semibold">{cert.name}</span> - {cert.institution} ({cert.date}){cert.id && <span className="text-[11px] text-gray-700 ml-2">ID: {cert.id}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}
      <hr className="border-t border-gray-400 my-4" />
      {/* Idiomas */}
      <section>
        <h2 className="font-bold text-[16px] mb-0">{t[lang].idiomas}</h2>
        {Array.isArray(data.languages) && data.languages.map((l: { language: string; level: string }, idx: number) => (
          <div key={idx}>
            {l.language}
            {l.level && <> — {l.level}</>}
          </div>
        ))}
      </section>
      <style>{`
        @media print {
          html, body, #__next, #root {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
          .shadow, .rounded, .rounded-lg, .rounded-xl, .rounded-2xl, .border, .border-gray-200, .border-gray-800, .bg-gradient-to-br, .bg-violet-50, .bg-indigo-50, .bg-white\/50, .dark\:bg-gray-900\/50, .dark\:bg-indigo-950\/50, .dark\:bg-violet-950\/90, .dark\:bg-gradient-to-br, .dark\:from-violet-950, .dark\:to-emerald-950, .dark\:from-indigo-950\/50, .dark\:to-gray-900 {
            box-shadow: none !important;
            border-radius: 0 !important;
            border: none !important;
            background: white !important;
          }
          .p-4, .p-6, .p-8, .px-4, .px-6, .px-8, .py-4, .py-6, .py-8, .sm\:p-6, .md\:p-8, .sm\:px-6, .md\:px-8, .sm\:py-6, .md\:py-8, .md\:py-10 {
            padding: 0 !important;
          }
          .mx-auto, .max-w-7xl, .max-w-full, .w-full, .h-full, .min-h-\[400px\], .flex, .items-center, .justify-center, .space-y-6, .space-y-8 {
            margin: 0 !important;
            width: 100% !important;
            min-height: 0 !important;
            height: auto !important;
          }
        }
      `}</style>
    </div>
  );
} 