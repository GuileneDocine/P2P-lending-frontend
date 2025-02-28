package main

import (
	"github.com/gin-gonic/gin"
	"p2p-lending-backend/config"
	"p2p-lending-backend/routes"
	 "p2p-lending-backend/models"
)

func main() {
	r := gin.Default()

	config.ConnectDatabase()

	routes.AuthRoutes(r)

	r.Run(":8080")

	config.ConnectDatabase() // Ensure this function is properly setting up the database
    config.DB.AutoMigrate(&models.User{}) // Run migration for the User model
}
