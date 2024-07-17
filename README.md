## Run the App

### Local

**Run the following commands:**

1. Install node dependencies

```
npm i
```

2. Run Dev Server

```
npm run dev
```

3. Run Server

```
npm run build
npm run prod
```

### Container

**Run the following commands:**

1. Pull the docker image from docker hub

```
docker pull dhanraj8897/node-microgreens
```

2. List docker images to ensure image is pulled

```
docker images
```

3. Run the docker container on desired port

```
docker -d -p DESIRED_PORT_NUMBER:8080 IMAGE_NAME

// remove -d option from the above command if you want to see the logs
```

4. Ensure docker image is running

```
docker ps
```

5. Incase of issues in running the container locally

```
docker system prune -a

// deletes all existing docker images and containers
// rerun the above steps to rerun the container
```

### Push Docker Image to Docker Hub

1. Build the docker image

```
docker build -t name-of-image .
```

2. Add tag for the docker image

```
docker tag source_image_name:tag tagname
```

3. Login to docker hub

```
docker login
```

4. Push the docker image

```
docker push tagname
```
