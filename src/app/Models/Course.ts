export interface Course {
    id: number;
    name: string;
    description: string;
    isFavorited: boolean;
    isRequired: boolean;
    requiredTimeLimit: number;
}