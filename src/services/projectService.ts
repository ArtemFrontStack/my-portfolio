// src/services/projectService.ts
import {supabase} from '@/supabaseClient';
import {Project} from '@/types/project';

export class ProjectService {
    static async getAllProjects(limit: number = 12): Promise<Project[]> {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) {
            throw new Error(`Error fetching projects: ${error.message}`);
        }

        return data as Project[];
    }

    static async getProjectById(id: number): Promise<Project | null> {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            throw new Error(`Error fetching project: ${error.message}`);
        }

        return data as Project;
    }

    static async getProjectsByTag(tag: string): Promise<Project[]> {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .contains('tags', [tag])
            .order('created_at', { ascending: false });

        if (error) {
            throw new Error(`Error fetching projects by tag: ${error.message}`);
        }

        return data as Project[];
    }
}