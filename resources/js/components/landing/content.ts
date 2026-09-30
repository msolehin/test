import type { LucideIcon } from "lucide-react";
import {
    BarChart3,
    BrainCircuit,
    Code,
    Handshake,
    Layers,
    ShieldCheck,
    TestTubeDiagonal,
    Users,
    Scale,
} from "lucide-react";

export type NavLink = { label: string; href: string };
export type Stat = { value: string; label: string };
export type IconItem = { title: string; description: string; icon: LucideIcon };
export type Client = { name: string; sector: string };
export type Project = { title: string; client: string; summary: string };

export const company = {
    name: "Unijaya Resources Sdn Bhd",
    tagline: "We build the systems that build Malaysia.",
    intro: "Established in July 2002 and based in Kuala Lumpur, Unijaya Resources designs, builds and supports national-scale digital systems for Malaysian ministries and agencies, delivered by an in-house team of local and international specialists.",
    website: "https://www.unijaya.com/",
};

export const navLinks: NavLink[] = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Clients", href: "#clients" },
    { label: "Contact", href: "#contact" },
];

export const stats: Stat[] = [
    { value: "24 years", label: "Serving government since July 2002" },
    { value: "RM8B", label: "Annual customs revenue processed via MySToDS" },
    { value: "4.9M", label: "Students monitored through SPPIP" },
    { value: "1.3M", label: "Job applications handled yearly by IRIS" },
];

export const about = {
    heading: "Digital infrastructure built to last",
    paragraphs: [
        "For more than two decades Unijaya Resources has delivered mission-critical systems across Malaysian ministries and agencies, from revenue collection and public-sector recruitment to education monitoring and consular services.",
        "Every project is handled end to end by our in-house team, with about 85% local and 15% international specialists, and every deliverable follows the standards set by the Malaysian government for public-sector ICT.",
    ],
    values: [
        {
            title: "No core sub-contracting",
            description:
                "Every milestone and line of code is produced by our own team, with no intermediaries.",
            icon: Users,
        },
        {
            title: "Government-grade compliance",
            description:
                "Documentation and delivery follow PPrISA, ISO 27001 and MyMRA requirements.",
            icon: ShieldCheck,
        },
        {
            title: "Financial stability",
            description:
                "RM5 million paid-up capital lets projects start as soon as a Letter of Offer is received.",
            icon: Scale,
        },
        {
            title: "Built for scale",
            description:
                "Architectures designed for millions of transactions, proven on national systems.",
            icon: Layers,
        },
    ] satisfies IconItem[],
};

export const services: IconItem[] = [
    {
        title: "Software Development",
        description:
            "Full-stack application development from requirements to go-live, using Laravel, .NET, Node.js, React, Vue and Java.",
        icon: Code,
    },
    {
        title: "AI & Machine Learning",
        description:
            "Intelligent systems that learn and adapt, built on large language models, retrieval-augmented generation and open-source models.",
        icon: BrainCircuit,
    },
    {
        title: "IT Security",
        description:
            "End-to-end security operations aligned with national ISMS standards, including monitoring and endpoint protection.",
        icon: ShieldCheck,
    },
    {
        title: "QA & Testing",
        description:
            "Rigorous SIT, UAT and performance testing so every system is ready for national rollout.",
        icon: TestTubeDiagonal,
    },
    {
        title: "Business Applications",
        description:
            "Workflow, CRM and ERP systems that streamline operations and reduce manual processes.",
        icon: Handshake,
    },
    {
        title: "Data Analytics & BI",
        description:
            "Dashboards and reporting that support evidence-based decisions for ministries and agencies.",
        icon: BarChart3,
    },
];

export const clients: Client[] = [
    { name: "Royal Malaysian Customs Department", sector: "Revenue & finance" },
    { name: "Ministry of Home Affairs", sector: "Home affairs" },
    { name: "Ministry of Health", sector: "Health & forensics" },
    { name: "Ministry of Foreign Affairs", sector: "Diplomatic & consular" },
    { name: "Ministry of Education", sector: "Education" },
    { name: "Ministry of Higher Education", sector: "Research" },
    { name: "Public Service Commission", sector: "Recruitment" },
    { name: "Islamic Development Department", sector: "Halal governance" },
];

export const projects: Project[] = [
    {
        title: "MySToDS",
        client: "Royal Malaysian Customs Department",
        summary:
            "Digital sales tax declaration system with real-time validation, supporting about RM8 billion in annual customs revenue.",
    },
    {
        title: "IRIS",
        client: "Public Service Commission",
        summary:
            "Digitised, merit-based public service recruitment handling around 1.3 million applications every year.",
    },
    {
        title: "SPPIP",
        client: "Ministry of Education",
        summary:
            "Education institution monitoring covering about 10,200 schools and 400,000 teachers to support evidence-based policy.",
    },
];

export const contact = {
    address: [
        "D-6-8, Megan Avenue 1",
        "189, Jalan Tun Razak, Hampshire Park",
        "50450 Kuala Lumpur, Malaysia",
    ],
    phone: "03-2166 6558",
    fax: "03-2166 6557",
    email: "info@unijaya.com",
    hours: "We respond within 1 working day",
};
