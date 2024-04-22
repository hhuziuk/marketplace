import {Response, Request, NextFunction} from "express";
import BookInfrastructureService from "../services/BookInfrastructureService";
import ApiError from "../exceptions/ApiError";

class BookInfrastructureController {
    constructor(readonly bookService: any = BookInfrastructureService) {
    }

    /**
     * @swagger
     * /books/create:
     *   post:
     *     tags:
     *       - Books
     *     summary: Create a new book
     *     description: Endpoint to create a new book
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: body
     *         description: Book object that needs to be created
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             bookName:
     *               type: string
     *             author:
     *               type: string
     *             categoryId:
     *               type: string
     *             publisherId:
     *               type: string
     *             ratingId:
     *               type: string
     *             description:
     *               type: string
     *             ISBN:
     *               type: string
     *             language:
     *               type: string
     *             size:
     *               type: string
     *             price:
     *               type: number
     *     responses:
     *       200:
     *         description: Book created successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                bookName,
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
                ApiError.BadRequest(`Required data is missing`);
            }
            const book = await BookInfrastructureService.create(bookName, author, categoryId, publisherId, ratingId, description, ISBN, language, size, price)
            return res.json(book)
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /books:
     *   get:
     *     tags:
     *       - Books
     *     summary: Get all books
     *     description: Endpoint to retrieve all books
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Returns all books
     *       500:
     *         description: Internal server error
     */
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const books = await BookInfrastructureService.getAll();
            return res.json(books);
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /books/{bookId}:
     *   get:
     *     tags:
     *       - Books
     *     summary: Get book by ID
     *     description: Endpoint to retrieve a book by ID
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: bookId
     *         description: ID of the book to retrieve
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Returns a book
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const {bookId} = req.params;
            if (!bookId) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const book = await BookInfrastructureService.getById(bookId);
            return res.json(book)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @swagger
     * /books/name/{bookName}:
     *   get:
     *     tags:
     *       - Books
     *     summary: Get book by name
     *     description: Endpoint to retrieve a book by name
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: bookName
     *         description: Name of the book to retrieve
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Returns a book
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async getByName(req: Request, res: Response, next: NextFunction) {
        try {
            const {bookName} = req.params;
            if (!bookName) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const book = await BookInfrastructureService.getByName(bookName);
            return res.json(book)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @swagger
     * /books/author/{bookAuthor}:
     *   get:
     *     tags:
     *       - Books
     *     summary: Get books by author
     *     description: Endpoint to retrieve books by author
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: bookAuthor
     *         description: Author of the books to retrieve
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Returns books by author
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async getByAuthor(req: Request, res: Response, next: NextFunction) {
        try {
            const {bookAuthor} = req.params;
            if (!bookAuthor) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const book = await BookInfrastructureService.getByAuthor(bookAuthor);
            return res.json(book)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @swagger
     * /books/delete/{bookId}:
     *   delete:
     *     tags:
     *       - Books
     *     summary: Delete a book
     *     description: Endpoint to delete a book by ID
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: bookId
     *         description: ID of the book to delete
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Book deleted successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const {bookId} = req.params;
            if (!bookId) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const book = await BookInfrastructureService.delete(bookId)
            return res.json(book)
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /books/update/{bookId}:
     *   put:
     *     tags:
     *       - Books
     *     summary: Update a book
     *     description: Endpoint to update a book by ID
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: bookId
     *         description: ID of the book to update
     *         required: true
     *         type: string
     *       - in: body
     *         name: updates
     *         description: Fields to update
     *         required: true
     *         schema:
     *           type: object
     *     responses:
     *       200:
     *         description: Book updated successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const {bookId} = req.params;
            const {updates} = req.body;
            const book = await BookInfrastructureService.update(bookId, updates)
            if (!bookId || !updates) {
                ApiError.BadRequest(`Required data is missing`);
            }
            return res.json(book)
        } catch (e) {
            next(e);
        }
    }
}

export default new BookInfrastructureController();
