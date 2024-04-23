import UserInfrastructureController from "../controllers/UserInfrastructureController";
import express from "express";
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
import authMiddleware from "../middleware/AuthenticateMiddleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

// Routes for Admin
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Internal server error
 */
router.get('/users', authMiddleware, checkRole(Role.Admin), UserInfrastructureController.getAll);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve user details by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/users/:id', authMiddleware, checkRole(Role.Admin), UserInfrastructureController.getById);

/**
 * @swagger
 * /users/verifySeller/{id}:
 *   put:
 *     summary: Verify seller
 *     description: Verify a seller account (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Seller ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seller account verified successfully
 *       404:
 *         description: Seller not found
 *       500:
 *         description: Internal server error
 */
router.put('/users/verifySeller/:id', authMiddleware, checkRole(Role.Admin), UserInfrastructureController.verifySeller);

/**
 * @swagger
 * /users/update/{id}:
 *   put:
 *     summary: Update user
 *     description: Update user details (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: userData
 *         description: User data to update
 *         required: true
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/users/update/:id', authMiddleware, checkRole(Role.Admin), UserInfrastructureController.update);

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Delete user
 *     description: Delete a user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/users/delete/:id', authMiddleware, checkRole(Role.Admin), UserInfrastructureController.delete);

// Routes for Seller
/**
 * @swagger
 * /seller/{id}:
 *   get:
 *     summary: Get seller by ID
 *     description: Retrieve seller details by ID (Admin or Seller)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Seller ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seller details
 *       404:
 *         description: Seller not found
 *       500:
 *         description: Internal server error
 */
router.get('/seller/:id', authMiddleware, checkRole(Role.Admin, Role.Seller), UserInfrastructureController.getById);

/**
 * @swagger
 * /seller/update/{id}:
 *   put:
 *     summary: Update seller
 *     description: Update seller details (Admin or Seller)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Seller ID
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: userData
 *         description: Seller data to update
 *         required: true
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         description: Seller updated successfully
 *       404:
 *         description: Seller not found
 *       500:
 *         description: Internal server error
 */
router.put('/seller/update/:id', authMiddleware, checkRole(Role.Admin, Role.Seller), UserInfrastructureController.update);

/**
 * @swagger
 * /seller/delete/{id}:
 *   delete:
 *     summary: Delete seller
 *     description: Delete a seller (Admin or Seller)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Seller ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Seller deleted successfully
 *       404:
 *         description: Seller not found
 *       500:
 *         description: Internal server error
 */
router.delete('/seller/delete/:id', authMiddleware, checkRole(Role.Admin, Role.Seller), UserInfrastructureController.delete);

// Routes for Customer
/**
 * @swagger
 * /customer/{id}:
 *   get:
 *     summary: Get customer by ID
 *     description: Retrieve customer details by ID (Admin or Seller)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Customer ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer details
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */
router.get('/customer/:id', authMiddleware, checkRole(Role.Admin, Role.Seller), UserInfrastructureController.getById);

/**
 * @swagger
 * /customer/update/{id}:
 *   put:
 *     summary: Update customer
 *     description: Update customer details (Admin or Customer)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Customer ID
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: userData
 *         description: Customer data to update
 *         required: true
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */
router.put('/customer/update/:id', authMiddleware, checkRole(Role.Customer, Role.Admin), UserInfrastructureController.update);

/**
 * @swagger
 * /customer/delete/{id}:
 *   delete:
 *     summary: Delete customer
 *     description: Delete a customer (Admin or Customer)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Customer ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */
router.delete('/customer/delete/:id', authMiddleware, checkRole(Role.Customer, Role.Admin), UserInfrastructureController.delete);

export default router;
