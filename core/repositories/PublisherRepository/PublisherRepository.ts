import {Publisher} from "../../domain/Publisher";

export interface PublisherRepostiory {
    addPublisher(
        category: string,
        bookId: string,
        categoryId: string,
    ): Promise<Publisher>;
    getAll(): Promise<Publisher[]>;
    getById(id: string): Promise<Publisher | null>;
    delete(id: string): Promise<void>;
}