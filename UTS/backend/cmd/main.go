package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"github.com/user/warehouse/internal/product"
	"github.com/user/warehouse/pkg/database"
)

func main() {
	_ = godotenv.Load()

	// Initialize Database
	database.ConnectDB()

	// Auto Migrate
	database.DB.AutoMigrate(&product.Product{})

	app := fiber.New()

	// Middleware
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	// Setup Routes
	productRepository := product.NewRepository(database.DB)
	productService := product.NewService(productRepository)
	productHandler := product.NewHandler(productService)

	api := app.Group("/api")
	v1 := api.Group("/v1")

	// Product routes
	products := v1.Group("/products")
	products.Get("/", productHandler.GetAll)
	products.Get("/:id", productHandler.GetByID)
	products.Post("/", productHandler.Create)
	products.Put("/:id", productHandler.Update)
	products.Delete("/:id", productHandler.Delete)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Fatal(app.Listen(":" + port))
}
