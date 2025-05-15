package handlers

import "github.com/gin-gonic/gin"

// GetHealthz implements `/healthz` and returns the health of the server.
func (s Server) GetHealthz(c *gin.Context) {
	c.JSON(200, gin.H{"status": "ok"})
}
