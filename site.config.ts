/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIG — edit this file to change your personal details.
 *  Everything on the homepage (services, about, testimonials,
 *  contact links) is driven from here. Projects live in
 *  /content/projects/*.mdx (see README).
 * ─────────────────────────────────────────────────────────────
 */

import type { IconName } from "@/components/icons";

export const site = {
  brand: "FactsWrangler",
  owner: "Guilherme Oliveira",
  firstName: "Guilherme",
  role: "Data Engineer & Architect",
  location: "Vienna, Austria",
  /** Headshot in /public, or "" to hide. */
  photo: "/guilherme.jpg",
  /** Large portrait shown in the hero on desktop, or "" to hide. */
  heroPhoto: "/guilherme-portrait.jpg",
  /** Shown in the footer; set to "" to hide. */
  photoCredit: "Portrait photos: Zsolt Marton",
  tagline: "I turn messy data into facts you can act on.",
  intro:
    "I build data pipelines, Lakehouse architectures and Digital Twins, from PLCs and sensors on the shop floor to dashboards and ML models in the cloud. I'm a Control & Automation Engineer by training, so I treat operational problems as software problems.",
  /** Shows the green "available" badge in the hero. */
  available: true,

  // TODO: replace the booking link and domain with your real values
  url: "https://factswrangler.com",
  email: "guilherme.oliveira@factswrangler.com",
  bookingUrl: "https://calendly.com/guilherme-oliveira-mec/30min",
  /** PDF in /public, or set to "" to hide the button. */
  cvUrl: "/cv-guilherme-monteiro-oliveira.pdf",
  socials: {
    github: "https://github.com/GuiOli91",
    linkedin: "https://www.linkedin.com/in/goliveira91",
  },

  services: [
    {
      icon: "layers",
      title: "Data pipelines & Lakehouse",
      description:
        "Batch and streaming pipelines that unify scattered sources into one reliable Lakehouse, from hourly files to real-time events.",
      bullets: ["ETL / ELT in Python, SQL & Spark", "Streaming with Apache Kafka", "Orchestration with Prefect"],
    },
    {
      icon: "cpu",
      title: "Industrial data & Digital Twins",
      description:
        "Get data out of PLCs, MES and edge devices and turn it into a live view of your process: monitoring, OEE and Digital Twins.",
      bullets: ["PLC / MES / IIoT integration", "Edge gateways → cloud", "Digital Twins of machining processes"],
    },
    {
      icon: "fileText",
      title: "Document AI & LLM pipelines",
      description:
        "Extract structured data from PDFs, scans and technical drawings with OCR and LLMs, self-hosted if your data can't leave the building.",
      bullets: ["Vision-LLM OCR & structured extraction", "Self-hosted models with vLLM", "Hugging Face & OpenAI-compatible APIs"],
    },
    {
      icon: "database",
      title: "MLOps & data infrastructure",
      description:
        "The plumbing that keeps data and models running: containers, CI/CD, experiment tracking and object storage.",
      bullets: ["Docker & GitLab CI/CD", "MLflow experiment tracking", "OpenStack & S3-compatible storage (MinIO)"],
    },
  ] satisfies { icon: IconName; title: string; description: string; bullets: string[] }[],

  /** Leave empty and the section stays hidden. */
  testimonials: [
    // {
    //   quote: "Guilherme automated our weekly report — it went from 4 hours to 0.",
    //   name: "Jane Doe",
    //   title: "Ops Manager, Acme Inc.",
    // },
  ] as { quote: string; name: string; title: string }[],

  about: {
    paragraphs: [
      "I'm Guilherme, a data engineer and architect based in Vienna. I studied Control & Automation Engineering in Brazil, spent years on factory floors at Ford and Bosch, and moved into data when I saw how much value sat unused in machines and spreadsheets.",
      "Since then I've built Lakehouse pipelines and Digital Twins for industrial clients, real-time computer-vision tracking, and LLM pipelines that read architectural plans. I'm currently doing an MSc in Data Science at TU Wien.",
      "I prefer talking to writing. Most project pages here have a short video where I walk through what I built and why.",
    ],
    skills: [
      { group: "Data engineering", items: ["Python", "SQL", "Spark", "Apache Kafka", "Prefect", "Lakehouse", "Parquet", "PostgreSQL", "MSSQL", "Oracle"] },
      { group: "MLOps & cloud", items: ["Docker", "GitLab CI/CD", "MLflow", "OpenStack", "MinIO / S3", "AWS Lambda"] },
      { group: "AI & vision", items: ["vLLM", "Hugging Face", "LLM extraction", "OCR", "OpenCV", "YOLO"] },
      { group: "Industrial / OT", items: ["PLC integration", "MES", "IIoT & edge", "Digital Twins", "Siemens S7 / TIA Portal"] },
      { group: "Tools", items: ["Git", "Bash", "Tableau", "Alteryx", "Jupyter", "R"] },
    ],
    languages: [
      { name: "Portuguese", code: "PT", level: "Native" },
      { name: "English", code: "EN", level: "C1" },
      { name: "German", code: "DE", level: "B2" },
    ],
    experience: [
      {
        period: "Nov 2025 — now",
        title: "Data Engineer",
        org: "Self-employed (FactsWrangler)",
        location: "Vienna",
        highlights: ["Streaming pipeline: sensor data via an edge gateway → Apache Kafka → Spark processing."],
      },
      {
        period: "Jun 2025 — now",
        title: "Data Engineer & ML · Graduate Research",
        org: "TU Wien",
        location: "Vienna",
        highlights: [
          "End-to-end OCR application extracting data from architectural plans with a two-stage LLM pipeline (vision LLM → structured tags).",
          "Self-hosted Hugging Face models on vLLM; Prefect ingestion pipelines; MLflow, CI/CD, OpenStack and MinIO.",
        ],
      },
      {
        period: "Mar 2024 — Dec 2024",
        title: "Software Engineer",
        org: "Christian Doppler Lab for Recommender Systems, TU Wien",
        location: "Vienna",
        highlights: ["Containerized data pipelines with Docker; monitored system health and met defined SLOs."],
      },
      {
        period: "Aug 2022 — Feb 2023",
        title: "Researcher, Computer Vision",
        org: "UNICAMP",
        location: "Campinas",
        highlights: ["Led a real-time computer-vision tracking system for a manufacturing process on an IoT / edge network."],
      },
      {
        period: "Jul 2019 — May 2021",
        title: "Data Architect",
        org: "Braincube",
        location: "Campinas",
        highlights: [
          "Batch and near-real-time pipelines from PLCs, MES, Excel and databases into a cloud Lakehouse.",
          "Cut ingestion latency from up to 30 minutes to near-real-time; deployed Digital Twins of machining operations.",
        ],
      },
      {
        period: "Oct 2016 — May 2019",
        title: "Manufacturing Analyst",
        org: "MSX International at Ford Motor Company",
        location: "Taubaté",
        highlights: [
          "40% lower tool-change costs through a tooling analysis combining machining-tool and MES data with Spark.",
          "Shared dashboards driving productivity improvements across Ford plants worldwide.",
        ],
      },
      {
        period: "Apr 2016 — Aug 2016",
        title: "Manufacturing Intern",
        org: "Bosch",
        location: "Campinas",
        highlights: ["VBA apps for paperless ISO 9001 audits and hourly OEE reporting; vibration monitoring for predictive maintenance."],
      },
    ],
    education: [
      { period: "2023 — 2027 (expected)", title: "MSc Data Science", org: "TU Wien, Vienna" },
      { period: "2014 — 2015", title: "Mechatronics (exchange, B.Eng.)", org: "TH Deggendorf, Germany" },
      { period: "2010 — 2018", title: "B.Eng. Control & Automation Engineering", org: "UNICAMP, Brazil" },
    ],
    certifications: ["Siemens SIMATIC STEP 7 TIA 1 & TIA 2", "Tableau Desktop I & II"],
  },
};

export type Site = typeof site;
