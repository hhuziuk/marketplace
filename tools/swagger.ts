import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {Express} from "express";

const options = {
    swaggerDefinition: {
        info: {
            title: "Book marketplace",
            version: "1.0.0",
        },
        basePath: "/api",
    },
    apis: [
        "./infrastructure/controllers/BookInfrastructureController.ts",
        "./infrastructure/controllers/PublisherInfrastructureController.ts",
        "./infrastructure/controllers/CategoryInfrastructureController.ts",
        "./infrastructure/controllers/UserInfrastructureController.ts",
        "./infrastructure/controllers/AuthInfrastructureController.ts",
        "./infrastructure/controllers/AuthInfrastructureService.ts",
        "./infrastructure/controllers/FavoriteInfrastructureController.ts",
        "./infrastructure/controllers/OrderInfrastructureController.ts",
        "./infrastructure/controllers/PaymentInfrastructureController.ts",
        "./infrastructure/controllers/RatingInfrastructureController.ts",
        "./infrastructure/controllers/ShipmentInfrastructureController.ts",
        "./infrastructure/controllers/WishlistInfrastructureController.ts",
    ],
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}