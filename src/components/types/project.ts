export interface Project {
    id: number;
    name: string;
    image: string;
    tags: string;
    slug: string;
    subcategory: string;
    category: string;
    description: string;
    officiality_status: string;
    link: string;
    github_url: string;
    testmonials: {
        name: string;
        position: string;
        image: string;
        content: string;
    };
    galleries: GalleryItem[];
}

export interface GalleryItem {
    image: string;
}