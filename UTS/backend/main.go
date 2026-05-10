package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/user/warehouse/config"
	"github.com/user/warehouse/database"
	"github.com/user/warehouse/middleware"
	"github.com/user/warehouse/modules/product"
	"github.com/user/warehouse/routes"
)

func main() {
	// 1. Load Configurations
	config.LoadConfig()

	// 2. Initialize Database
	database.ConnectDB()

	// 3. Auto Migrate Models
	database.DB.AutoMigrate(&product.Product{})

	// 4. Initialize Fiber App
	app := fiber.New(fiber.Config{
		AppName: "Warehouse API v1.0",
	})

	// 5. Setup Middlewares
	middleware.SetupLogger(app)
	middleware.SetupCORS(app)

	// 6. Setup Routes
	routes.SetupRoutes(app)

	// 7. Start Server
	port := config.GetEnv("PORT", "8080")
	log.Printf("Server running on port %s", port)
	log.Fatal(app.Listen(":" + port))
}
