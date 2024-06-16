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