import {Publisher} from "../../domain/Publisher";

export interface PublisherRepostiory {
    addPublisher(
        category: string,
        bookId: string,
        categoryId: string,
    ): Promise<Publisher>;
    getPublisher(id: string): Promise<Publisher | null>;
    getAllPublishers(): Promise<Publisher[] | null>;
    deletePublisher(id: string): Promise<void>;
}