from livereload import Server
from app import app # app initialization from "<root-module>"

# if script is running directly or being imported as a module? 
if __name__ == "__main__":
    Server = Server(app.wsgi_app)
    Server.serve()
    # app.run() 
