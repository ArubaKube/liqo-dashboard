package handlers

import (
	"sigs.k8s.io/controller-runtime/pkg/client"
)

// Server is the implementation of the REST api interfaces.
type Server struct {
	oClient client.Client
}

// NewServer returns a new REST api server implementation.
func NewServer(oClient client.Client) Server {
	return Server{
		oClient: oClient,
	}
}
