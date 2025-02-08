export interface Project {
    id: string;
    name: string;
    description: string;
    image: string;
    link: string;
    tags: string[];
}

export interface ApiResponse<T> {
    data: T;
    error?: string;
}  
export type Lang = "fr" | "en";


export interface FAQType {
    id: string;
    question: string;
    answer: string;
}

export interface Service {
    title: string;
    description: string;
    icon: string;
}