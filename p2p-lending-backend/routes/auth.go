package routes

import (
	"github.com/gin-gonic/gin"
	"p2p-lending-backend/controllers"
)

func AuthRoutes(r *gin.Engine) {
	r.POST("/signup", controllers.Signup)
	r.POST("/login", controllers.Login)
}
