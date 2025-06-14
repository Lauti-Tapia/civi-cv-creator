# 🎯 Civi - Creador de CV Inteligente

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Groq AI](https://img.shields.io/badge/Groq_AI-Llama3--70B-00FF00?style=for-the-badge)](https://groq.com/)

## 🌐 Demo en Vivo

**¡Prueba Civi ahora mismo!** → [https://civi-cv-creator.vercel.app/](https://civi-cv-creator.vercel.app/)

## 📋 Descripción

**Civi** es una aplicación web moderna y gratuita que te permite crear CVs profesionales y personalizados en minutos. Utiliza inteligencia artificial avanzada para adaptar tu currículum a descripciones de trabajo específicas, ayudándote a destacar en el mercado laboral y superar los sistemas ATS (Applicant Tracking Systems).

### ✨ Características Principales

- 🤖 **IA Inteligente**: Utiliza Groq AI con el modelo Llama3-70B para mejorar y personalizar contenido
- 🎯 **Personalización por Puesto**: Adapta automáticamente tu CV a descripciones de trabajo específicas
- 🌍 **Multilingüe**: Soporte completo para español e inglés
- 🌙 **Modo Oscuro**: Interfaz adaptable con tema claro y oscuro
- 📱 **Responsive**: Diseño optimizado para dispositivos móviles y desktop
- 🖨️ **Exportación PDF**: Genera CVs listos para imprimir
- 🔒 **Privacidad Total**: No almacena datos personales, todo se procesa localmente
- ⚡ **Gratuito**: Sin costos ocultos ni suscripciones

## 🚀 Cómo Funciona

### 1. **Paso 1: Datos del CV**
- Completa tu información personal y profesional
- Agrega experiencia laboral, educación, certificaciones e idiomas
- Incluye enlaces profesionales (LinkedIn, portfolio, etc.)
- Define tus habilidades técnicas y presentación profesional

### 2. **Paso 2: Trabajo Objetivo**
- Pega la descripción del trabajo al que quieres aplicar
- La IA extrae información relevante del puesto
- Genera un preview personalizado de tu CV
- Optimiza presentación y experiencias según el contexto

### 3. **Generación Inteligente**
- **Extracción de Contexto**: La IA analiza la descripción del trabajo y extrae requisitos clave
- **Mejora de Contenido**: Optimiza presentación profesional y descripciones de experiencia
- **Personalización**: Adapta el lenguaje y enfoque al puesto específico
- **Preview en Tiempo Real**: Visualiza los cambios antes de exportar

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 15.2.4** - Framework de React con App Router
- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para mayor robustez
- **Tailwind CSS** - Framework de CSS utilitario
- **Radix UI** - Componentes de interfaz accesibles
- **Lucide React** - Iconografía moderna

### Backend & IA
- **Groq AI** - API de inteligencia artificial de alta velocidad
- **Llama3-70B** - Modelo de lenguaje avanzado
- **Next.js API Routes** - Endpoints para procesamiento de IA

### Utilidades
- **React Hook Form** - Manejo de formularios
- **React To Print** - Exportación a PDF
- **Next Themes** - Gestión de temas claro/oscuro
- **Sonner** - Notificaciones elegantes

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Clave API de Groq

### Pasos de Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/Lauti-Tapia/civi-cv-creator.git
cd civi-cv-creator
```

2. **Instala las dependencias**
```bash
npm install --legacy-peer-deps
```

3. **Configura las variables de entorno**
Crea un archivo `.env.local` en la raíz del proyecto:
```env
GROQ_API_KEY=tu_clave_api_de_groq_aqui
```

4. **Ejecuta el servidor de desarrollo**
```bash
npm run dev
```

5. **Abre tu navegador**
Visita [http://localhost:3000](http://localhost:3000)

## 🔧 Configuración

### Variables de Entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `GROQ_API_KEY` | Clave API de Groq para IA | ✅ Sí |

### Obtener Clave API de Groq

1. Visita [groq.com](https://groq.com)
2. Crea una cuenta gratuita
3. Ve a la sección de API Keys
4. Genera una nueva clave
5. Copia la clave a tu archivo `.env.local`

## 📁 Estructura del Proyecto

```
civi-cv-creator/
├── app/                    # Next.js App Router
│   ├── api/               # Endpoints de API
│   │   ├── improve-cv/    # Mejora de texto del CV
│   │   ├── extract-job-info/ # Extracción de info del trabajo
│   │   └── groq/          # Integración con Groq AI
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── steps/            # Pasos del formulario
│   │   ├── personal-data-step.tsx
│   │   └── job-description-step.tsx
│   ├── ui/               # Componentes de UI reutilizables
│   ├── cv-form.tsx       # Formulario principal
│   ├── cv-preview.tsx    # Preview del CV
│   ├── CVPrintable.tsx   # Versión para impresión
│   └── fixed-header.tsx  # Header fijo
├── lib/                  # Utilidades y configuraciones
│   ├── groq.ts          # Integración con Groq AI
│   └── utils.ts         # Funciones utilitarias
├── public/              # Archivos estáticos
└── styles/              # Estilos adicionales
```

## 🎨 Características de la Interfaz

### Diseño Responsive
- **Desktop**: Interfaz completa con navegación lateral
- **Tablet**: Adaptación automática de layout
- **Mobile**: Navegación optimizada para touch

### Temas
- **Claro**: Colores suaves y profesionales
- **Oscuro**: Modo nocturno para reducir fatiga visual
- **Sistema**: Se adapta automáticamente a las preferencias del usuario

### Accesibilidad
- Navegación por teclado
- Etiquetas ARIA apropiadas
- Contraste de colores optimizado
- Componentes Radix UI accesibles

## 🔒 Privacidad y Seguridad

### Protección de Datos
- ✅ **Sin almacenamiento**: No guardamos datos personales
- ✅ **Procesamiento local**: Los datos se procesan en tu navegador
- ✅ **Conexión segura**: Comunicación encriptada con APIs
- ✅ **Sin tracking**: No utilizamos cookies de seguimiento

### Información Procesada
- Datos del CV (nombre, experiencia, educación, etc.)
- Descripción del trabajo objetivo
- Textos para mejora por IA

### Información NO Procesada
- Datos de contacto personales
- Información financiera
- Archivos adjuntos

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Configura la variable de entorno `GROQ_API_KEY`
3. Despliega automáticamente

### Netlify
1. Conecta tu repositorio a Netlify
2. Configura las variables de entorno
3. Establece el comando de build: `npm run build`

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución
- Mantén el código limpio y bien documentado
- Sigue las convenciones de TypeScript
- Añade tests para nuevas funcionalidades
- Actualiza la documentación según sea necesario

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Groq AI** por proporcionar acceso a modelos de IA de alta velocidad
- **Next.js** por el excelente framework de React
- **Tailwind CSS** por el sistema de diseño utilitario
- **Radix UI** por los componentes accesibles
- **Comunidad de desarrolladores** por el apoyo y feedback

## 📞 Contacto

- **LinkedIn**: [Lautaro Tapia](https://www.linkedin.com/in/lautaro-tapia-9012091b8/)
- **GitHub**: [@Lauti-Tapia](https://github.com/Lauti-Tapia)
- **Portfolio**: [Portfolio Personal](https://portfolio-nu-henna-38.vercel.app/)
- **Proyecto**: [civi-cv-creator](https://github.com/Lauti-Tapia/civi-cv-creator)

## ☕ Apoyar el Proyecto

Si este proyecto te ayudó, considera invitarme un cafecito para seguir mejorándolo:

[![Cafecito](https://img.shields.io/badge/Cafecito-Apoyar%20el%20proyecto-yellow?style=for-the-badge&logo=coffee)](https://cafecito.app/lautarotapia)

---

# 🎯 Civi - Intelligent CV Creator

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Groq AI](https://img.shields.io/badge/Groq_AI-Llama3--70B-00FF00?style=for-the-badge)](https://groq.com/)

## 🌐 Live Demo

**Try Civi right now!** → [https://civi-cv-creator.vercel.app/](https://civi-cv-creator.vercel.app/)

## 📋 Description

**Civi** is a modern, free web application that allows you to create professional and personalized CVs in minutes. It uses advanced artificial intelligence to adapt your resume to specific job descriptions, helping you stand out in the job market and pass ATS (Applicant Tracking Systems).

### ✨ Key Features

- 🤖 **Intelligent AI**: Uses Groq AI with Llama3-70B model to improve and personalize content
- 🎯 **Job-Specific Personalization**: Automatically adapts your CV to specific job descriptions
- 🌍 **Multilingual**: Full support for Spanish and English
- 🌙 **Dark Mode**: Adaptable interface with light and dark themes
- 📱 **Responsive**: Design optimized for mobile and desktop devices
- 🖨️ **PDF Export**: Generates print-ready CVs
- 🔒 **Total Privacy**: No personal data storage, everything is processed locally
- ⚡ **Free**: No hidden costs or subscriptions

## 🚀 How It Works

### 1. **Step 1: CV Data**
- Complete your personal and professional information
- Add work experience, education, certifications, and languages
- Include professional links (LinkedIn, portfolio, etc.)
- Define your technical skills and professional presentation

### 2. **Step 2: Target Job**
- Paste the job description you want to apply for
- AI extracts relevant information from the position
- Generates a personalized CV preview
- Optimizes presentation and experiences based on context

### 3. **Intelligent Generation**
- **Context Extraction**: AI analyzes the job description and extracts key requirements
- **Content Enhancement**: Optimizes professional presentation and experience descriptions
- **Personalization**: Adapts language and focus to the specific position
- **Real-Time Preview**: Visualize changes before exporting

## 🛠️ Technologies Used

### Frontend
- **Next.js 15.2.4** - React framework with App Router
- **React 19** - User interface library
- **TypeScript** - Static typing for greater robustness
- **Tailwind CSS** - Utility CSS framework
- **Radix UI** - Accessible interface components
- **Lucide React** - Modern iconography

### Backend & AI
- **Groq AI** - High-speed artificial intelligence API
- **Llama3-70B** - Advanced language model
- **Next.js API Routes** - AI processing endpoints

### Utilities
- **React Hook Form** - Form handling
- **React To Print** - PDF export
- **Next Themes** - Light/dark theme management
- **Sonner** - Elegant notifications

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Groq API key

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/Lauti-Tapia/civi-cv-creator.git
cd civi-cv-creator
```

2. **Install dependencies**
```bash
npm install --legacy-peer-deps
```

3. **Configure environment variables**
Create a `.env.local` file in the project root:
```env
GROQ_API_KEY=your_groq_api_key_here
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Visit [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GROQ_API_KEY` | Groq API key for AI | ✅ Yes |

### Get Groq API Key

1. Visit [groq.com](https://groq.com)
2. Create a free account
3. Go to API Keys section
4. Generate a new key
5. Copy the key to your `.env.local` file

## 📁 Project Structure

```
civi-cv-creator/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   │   ├── improve-cv/    # CV text improvement
│   │   ├── extract-job-info/ # Job info extraction
│   │   └── groq/          # Groq AI integration
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Main layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── steps/            # Form steps
│   │   ├── personal-data-step.tsx
│   │   └── job-description-step.tsx
│   ├── ui/               # Reusable UI components
│   ├── cv-form.tsx       # Main form
│   ├── cv-preview.tsx    # CV preview
│   ├── CVPrintable.tsx   # Print version
│   └── fixed-header.tsx  # Fixed header
├── lib/                  # Utilities and configurations
│   ├── groq.ts          # Groq AI integration
│   └── utils.ts         # Utility functions
├── public/              # Static files
└── styles/              # Additional styles
```

## 🎨 Interface Features

### Responsive Design
- **Desktop**: Complete interface with lateral navigation
- **Tablet**: Automatic layout adaptation
- **Mobile**: Touch-optimized navigation

### Themes
- **Light**: Soft and professional colors
- **Dark**: Night mode to reduce eye strain
- **System**: Automatically adapts to user preferences

### Accessibility
- Keyboard navigation
- Appropriate ARIA labels
- Optimized color contrast
- Accessible Radix UI components

## 🔒 Privacy and Security

### Data Protection
- ✅ **No storage**: We don't store personal data
- ✅ **Local processing**: Data is processed in your browser
- ✅ **Secure connection**: Encrypted communication with APIs
- ✅ **No tracking**: We don't use tracking cookies

### Processed Information
- CV data (name, experience, education, etc.)
- Target job description
- Texts for AI improvement

### Information NOT Processed
- Personal contact data
- Financial information
- Attached files

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Configure the `GROQ_API_KEY` environment variable
3. Deploy automatically

### Netlify
1. Connect your repository to Netlify
2. Configure environment variables
3. Set build command: `npm run build`

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Keep code clean and well-documented
- Follow TypeScript conventions
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is under the MIT License. See the `LICENSE` file for details.

## 🙏 Acknowledgments

- **Groq AI** for providing access to high-speed AI models
- **Next.js** for the excellent React framework
- **Tailwind CSS** for the utility design system
- **Radix UI** for accessible components
- **Developer community** for support and feedback

## 📞 Contact

- **LinkedIn**: [Lautaro Tapia](https://www.linkedin.com/in/lautaro-tapia-9012091b8/)
- **GitHub**: [@Lauti-Tapia](https://github.com/Lauti-Tapia)
- **Portfolio**: [Personal Portfolio](https://portfolio-nu-henna-38.vercel.app/)
- **Project**: [civi-cv-creator](https://github.com/Lauti-Tapia/civi-cv-creator)

## ☕ Support the Project

If this project helped you, consider buying me a coffee to keep improving it:

[![Cafecito](https://img.shields.io/badge/Cafecito-Support%20the%20project-yellow?style=for-the-badge&logo=coffee)](https://cafecito.app/lautarotapia)

---

**Civi** - Creating professional CVs with AI 🤖✨
