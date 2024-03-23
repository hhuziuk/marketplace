import {UserInfrastructureService} from "../services/UserInfrastructureService";
import {AuthInfrastructureService} from "../services/AuthInfrastructureService";

class UserInfrastructureController {
    constructor(readonly userService: any = UserInfrastructureService) {}

    // Methods for Admin
    async createAdmin(req: Request, res: Response) {
        // Implement logic to create admin user
    }

    async getByIdAdmin(req: Request, res: Response) {
        // Implement logic to get admin user by ID
    }

    async updateAdmin(req: Request, res: Response) {
        // Implement logic to update admin user
    }

    async deleteAdmin(req: Request, res: Response) {
        // Implement logic to delete admin user
    }

    // Methods for Seller
    async createSeller(req: Request, res: Response) {
        // Implement logic to create seller user
    }

    async getByIdSeller(req: Request, res: Response) {
        // Implement logic to get seller user by ID
    }

    async updateSeller(req: Request, res: Response) {
        // Implement logic to update seller user
    }

    async deleteSeller(req: Request, res: Response) {
        // Implement logic to delete seller user
    }

    // Methods for Customer
    async createCustomer(req: Request, res: Response) {
        // Implement logic to create customer user
    }

    async getByIdCustomer(req: Request, res: Response) {
        // Implement logic to get customer user by ID
    }

    async updateCustomer(req: Request, res: Response) {
        // Implement logic to update customer user
    }

    async deleteCustomer(req: Request, res: Response) {
        // Implement logic to delete customer user
    }
}

export default new UserInfrastructureController();