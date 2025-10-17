// src/types/project.ts
export interface Project {
    id: number;
    created_at: string;
    title: string;
    description: string;
    full_description: string | null;
    tags: string[];
    image_url: string | null;
    github_url: string | null;
    demo_url: string | null;
    features: string[];
}

export interface ProjectInsert {
    title: string;
    description: string;
    full_description?: string;
    tags: string[];
    image_url?: string;
    github_url?: string;
    demo_url?: string;
    features: string[];
}