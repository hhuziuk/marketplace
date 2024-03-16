import {Publisher} from "../../domain/Publisher";

export interface PublisherRepostiory {
    addPublisher(publisherName: string): Promise<Publisher>;
    getAll(): Promise<Publisher[]>;
    getById(publisherId: string): Promise<Publisher | null>;
    getByName(publisherName: string): Promise<Publisher | null>;
    delete(publisherId: string): Promise<void>;
}