export interface TermsSection {
    id?: string;
    title: string;
    content: string;
    termsId?: string;
  }
  
  export interface TermsOfService {
    id: string;
    version: string;
    sections: TermsSection[];
    createdAt: Date;
}