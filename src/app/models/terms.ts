export interface TermsSection { 
    title: string;
    content: string;
}

export interface Terms {
    id?: string;
    sections: TermsSection[];
}
