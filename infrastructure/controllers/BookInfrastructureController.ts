import logger from "../../tools/logger";
import {Response, Request, NextFunction} from "express";
import BookInfrastructureService from "../services/BookInfrastructureService";
import ApiError from "../exceptions/ApiError";

class BookInfrastructureController {
    constructor(readonly bookService: any = BookInfrastructureService) {}
    async create(req: Request, res: Response, next: NextFunction){
        try{

            const {bookName,
                author,
                categoryId,
                publisherId,
                ratingId,
                description,
                ISBN,
                language,
                size,
                price,
            } = req.body
            if (!bookName || !author || !categoryId || !publisherId || !ratingId || !description || !ISBN || !language || !size || !price) {
                throw ApiError.BadRequest(`Required data is missing`);
            }
            const book = await BookInfrastructureService.create(bookName, author, categoryId, publisherId, ratingId, description, ISBN, language, size, price)
            return res.json(book)
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction){
        try{
            const books = await BookInfrastructureService.getAll();
            return res.json(books);
        } catch(e) {
            next(e);
            logger.error(e)
        }
    }
    async getById(req: Request, res: Response, next: NextFunction){
        try{
            const {bookId} = req.params;
            if (!bookId) {
                throw ApiError.BadRequest(`Required data is missing`);
            }
            const book = await BookInfrastructureService.getById(bookId);
            return res.json(book)
        } catch(e){
            next(e)
            logger.error(e)
        }
    }
    async getByName(req: Request, res: Response, next: NextFunction){
        try{
            const {bookName} = req.params;
            if (!bookName) {
                throw ApiError.BadRequest(`Required data is missing`);
            }
            const book = await BookInfrastructureService.getByName(bookName);
            return res.json(book)
        } catch(e){
            next(e)
            logger.error(e)
        }
    }
    async getByAuthor(req: Request, res: Response, next: NextFunction){
        try{
            const {bookAuthor} = req.params;
            if (!bookAuthor) {
                throw ApiError.BadRequest(`Required data is missing`);
            }
            const book = await BookInfrastructureService.getByAuthor(bookAuthor);
            return res.json(book)
        } catch(e){
            next(e)
            logger.error(e)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction){
        try{
            const {bookId} = req.params;
            if (!bookId) {
                throw ApiError.BadRequest(`Required data is missing`);
            }
            const book = await BookInfrastructureService.delete(bookId)
            return res.json(book)
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
    async update(req: Request, res: Response, next: NextFunction){
        try{
            const {bookId} = req.params;
            const {updates} = req.body;
            const book = await BookInfrastructureService.update(bookId, updates)
            if (!bookId || !updates) {
                throw ApiError.BadRequest(`Required data is missing`);
            }
            return res.json(book)
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
}
export default new BookInfrastructureController();