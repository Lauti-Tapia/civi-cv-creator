import React from "react";
import { GraduationCap, Award } from "lucide-react";

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

// Traducciones para los títulos de sección
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

function getLanguage() {
  if (typeof window !== 'undefined') {
    const lang = window.navigator.language;
    if (lang.startsWith('en')) return 'en';
    if (lang.startsWith('es')) return 'es';
  }
  return 'es';
}

const lang = getLanguage();

export function CVPreview({ data, language }: { data: CVData, language?: 'es' | 'en' }) {
  const lang = language || 'es';

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        background: "#fff",
        padding: "40px 48px",
        borderRadius: "16px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        fontFamily: "'Times New Roman', Times, serif",
        fontSize: "12px",
        color: "#222",
        lineHeight: 1.6,
      }}
    >
      {/* Nombre grande y en negrita */}
      <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center', letterSpacing: 0.5, fontFamily: "'Times New Roman', Times, serif" }}>
        {data.fullName}
      </div>
      {/* Título profesional */}
      {data.professionalTitle && (
        <div style={{
          fontSize: 16,
          fontWeight: 700,
          color: '#444',
          textAlign: 'center',
          fontFamily: "'Times New Roman', Times, serif",
          marginBottom: 4,
        }}>
          {data.professionalTitle}
        </div>
      )}
      {/* Información Personal */}
      <section style={{ marginBottom: 18, textAlign: 'center', fontFamily: "'Times New Roman', Times, serif" }}>
        <div style={{ fontSize: 13, marginBottom: 4 }}>
          {data.email && <span>{data.email}</span>}
          {data.phone && <span> {data.email ? ' | ' : ''}{data.phone}</span>}
          {data.city && <span> {(data.email || data.phone) ? ' | ' : ''}{data.city}</span>}
          {data.country && <span> {(data.email || data.phone || data.city) ? ' | ' : ''}{data.country}</span>}
        </div>
        {data.links && data.links.length > 0 && (
          <div style={{ margin: "4px 0 0 0", display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', fontFamily: "'Times New Roman', Times, serif" }}>
            {data.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                style={{ color: "#6c47ff", textDecoration: 'none', wordBreak: 'break-all', fontFamily: "'Times New Roman', Times, serif" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </section>
      <hr style={{ border: 'none', borderTop: '1.5px solid #bbb', margin: '18px 0' }} />

      {/* Presentación Profesional */}
      <section style={{ marginBottom: 18, fontFamily: "'Times New Roman', Times, serif" }}>
        <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 0, fontFamily: "'Times New Roman', Times, serif" }}>
          {t[lang].presentacion}
        </h2>
        <div style={{ fontFamily: "'Times New Roman', Times, serif" }}>{data.presentation}</div>
      </section>
      <hr style={{ border: 'none', borderTop: '1.5px solid #bbb', margin: '18px 0' }} />

      {/* Habilidades Técnicas */}
      <section style={{ marginBottom: 18, fontFamily: "'Times New Roman', Times, serif" }}>
        <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 0, fontFamily: "'Times New Roman', Times, serif" }}>
          {t[lang].habilidades}
        </h2>
        <div>{data.technicalSkills}</div>
      </section>
      <hr style={{ border: 'none', borderTop: '1.5px solid #bbb', margin: '18px 0' }} />

      {/* Experiencia Laboral */}
      <section style={{ marginBottom: 18, fontFamily: "'Times New Roman', Times, serif" }}>
        <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 0, fontFamily: "'Times New Roman', Times, serif" }}>
          {t[lang].experiencia}
        </h2>
        {data.experiences.map((exp, idx) => (
          <div key={idx} style={{ fontFamily: "'Times New Roman', Times, serif" }}>
            <div>
              <strong>{exp.role}</strong> | <strong>{exp.company}</strong>
            </div>
            <div style={{ fontSize: 11, color: "#555" }}>
              {exp.startDate} - {exp.endDate}
            </div>
            <div style={{ margin: "6px 0 8px 0" }}>{exp.description}</div>
          </div>
        ))}
      </section>
      <hr style={{ border: 'none', borderTop: '1.5px solid #bbb', margin: '18px 0' }} />

      {/* Educación */}
      {data.educations && data.educations.length > 0 && (
        <section style={{ marginBottom: 18, fontFamily: "'Times New Roman', Times, serif" }}>
          <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 0, fontFamily: "'Times New Roman', Times, serif" }}>
            {t[lang].educacion}
          </h2>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontFamily: "'Times New Roman', Times, serif" }}>
            {data.educations.map((edu, idx) => (
              <li key={idx} style={{ marginBottom: 4, fontWeight: 400, fontFamily: "'Times New Roman', Times, serif" }}>
                <span style={{ fontWeight: 600 }}>{edu.degree}</span> - {edu.institution} ({edu.graduationYear})
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
        <section style={{ marginBottom: 18, fontFamily: "'Times New Roman', Times, serif" }}>
          <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 0, fontFamily: "'Times New Roman', Times, serif" }}>
            {t[lang].certificaciones}
          </h2>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontFamily: "'Times New Roman', Times, serif" }}>
            {data.certifications.filter(c => c.name).map((cert, idx) => (
              <li key={idx} style={{ marginBottom: 4, fontWeight: 400, fontFamily: "'Times New Roman', Times, serif" }}>
                <span style={{ fontWeight: 600 }}>{cert.name}</span> - {cert.institution} ({cert.date}){cert.id && <span style={{ fontSize: 11, color: '#555', marginLeft: 8 }}>ID: {cert.id}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}
      <hr style={{ border: 'none', borderTop: '1.5px solid #bbb', margin: '18px 0' }} />

      {/* Idiomas */}
      <section style={{ fontFamily: "'Times New Roman', Times, serif" }}>
        <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 0, fontFamily: "'Times New Roman', Times, serif" }}>
          {t[lang].idiomas}
        </h2>
        {Array.isArray(data.languages) && data.languages.map((l: { language: string; level: string }, idx: number) => (
          <div key={idx} style={{ fontFamily: "'Times New Roman', Times, serif" }}>
            {l.language}
            {l.level && <> — {l.level}</>}
          </div>
        ))}
      </section>
    </div>
  );
}
