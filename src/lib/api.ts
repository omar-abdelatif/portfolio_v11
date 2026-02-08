import { Project } from '@/components/types/project';

// Client-side API functions that call Next.js API routes

export async function fetchProjects(): Promise<Project[]> {
    try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
            return data;
        }
        return [];
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

export async function fetchSimilarProjects(subcategory: string, currentSlug: string): Promise<Project[]> {
    try {
        const allProjects = await fetchProjects();
        return allProjects.filter(project =>
            project.subcategory.toLowerCase() === subcategory.toLowerCase() &&
            project.slug !== currentSlug
        ).slice(0, 6);
    } catch (error) {
        console.error('Error fetching similar projects:', error);
        return [];
    }
}

export async function fetchAbout() {
    try {
        const response = await fetch('/api/about');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error fetching about:', error);
        return [];
    }
}

export async function fetchSkills() {
    try {
        const response = await fetch('/api/skills');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
            return data;
        }
        return [];
    } catch (error) {
        console.error('Error fetching skills:', error);
        return [];
    }
}

export async function fetchSocialLinks() {
    try {
        const response = await fetch('/api/social_links');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
            return data;
        }
        return [];
    } catch (error) {
        console.error('Error fetching social links:', error);
        return [];
    }
}

export async function getProjectDetails(slug: string) {
    try {
        const response = await fetch(`/api/project_details/${slug}`);
        if (!response.ok) {
            throw new Error('Failed to fetch project details');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching project details:', error);
        return null;
    }
}

const api = {
    fetchProjects,
    fetchSimilarProjects,
    fetchAbout,
    fetchSkills,
    fetchSocialLinks,
    getProjectDetails
};

export default api;