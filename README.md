# Located.API

This repo contains all the endpoints to located

# Http response codes

| Code | Meaning               | Description                                                                           |
| ---- | --------------------- | ------------------------------------------------------------------------------------- |
| 200  | OK                    | The request has been successful.                                                      |
| 201  | Created               | The request has been fulfilled, and a new resource has been created.                  |
| 204  | No Content            | The server has successfully processed the request, but there is no content to return. |
| 301  | Moved Permanently     | The requested resource has been permanently moved to a new location.                  |
| 304  | Not Modified          | The resource has not been modified since the last request.                            |
| 400  | Bad Request           | The server cannot process the request due to a client error.                          |
| 401  | Unauthorized          | The client must authenticate to get the requested response.                           |
| 403  | Forbidden             | The client does not have permission to access the requested resource.                 |
| 404  | Not Found             | The requested resource could not be found.                                            |
| 500  | Internal Server Error | An internal server error has occurred.                                                |
| 503  | Service Unavailable   | The server is temporarily unable to handle the request.                               |
