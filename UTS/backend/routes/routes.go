package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/user/warehouse/database"
	"github.com/user/warehouse/modules/product"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")
	v1 := api.Group("/v1")

	// Dependencies Injection for Product
	productRepository := product.NewRepository(database.DB)
	productService := product.NewService(productRepository)
	productHandler := product.NewHandler(productService)

	// Product Routes
	products := v1.Group("/products")
	products.Get("/", productHandler.GetAll)
	products.Get("/:id", productHandler.GetByID)
	products.Post("/", productHandler.Create)
	products.Put("/:id", productHandler.Update)
	products.Delete("/:id", productHandler.Delete)
}
