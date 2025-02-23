# Build the image
sudo docker build -t catalyst-domain .

# Run the container
sudo docker run -p 3000:3000 catalyst-domain