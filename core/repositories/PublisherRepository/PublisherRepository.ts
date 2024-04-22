import {Publisher} from "../../domain/Publisher";

export interface PublisherRepostiory {
    addPublisher(publisherName: string): Promise<Publisher>;

    getAll(): Promise<Publisher[]>;

    save(category: Publisher): Promise<Publisher>;

    getById(publisherId: string): Promise<Publisher | null>;

    getByName(publisherName: string): Promise<Publisher | null>;

    update(publisherId: string): Promise<void>,

    delete(publisherId: string): Promise<void>;
}