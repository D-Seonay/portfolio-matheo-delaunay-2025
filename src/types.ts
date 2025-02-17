
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
    message?: string;
}  
export type Lang = "fr" | "en";


export interface FAQType {
    id: string;
    question: string;
    answer: string;
}

export interface Status {
    id: string;
    status: string;
    text: string;
    label: string;
}

export type HomeTextType = {
    title: string;
    titleHighlight: string;
    titleSecondaryPart: string;
    description: string;
    button: string;
};


export type ServiceType = {
    id: string;
    title: string;
};