# tic-tac-toe

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Run standalone Express Dev Server

1. npm run build - Create static build files to serve in 'build' folder
2. cd server
3. npm start
   Default port: 8000

### Docker

Build:
docker build -t tic-tac-toe
Run:
docker run -p 8000:8000 -d tic-tac-toe
