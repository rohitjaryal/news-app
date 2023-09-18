# News App

This project was bootstrapped with
https://vitejs.dev/guide/
```
npm create vite@latest
```

## Quick Start

If you are using Linux and macOS it works out of the box following these steps:

1. Clone the repo
2. Default option should work fine. In case it doesn't then configure .env file for these two values in case of issue. 
      ```
         VITE_NEWS_API_BASE_URL=https://newsapi.org
         VITE_NEWS_API_KEY={xyz}
      ```

2. Make sure you are using the right Node.js version. This can optionally be done using a version manager like `nvm`:

    ```sh
    nvm use
    ```

3. Install Dependencies:

    ```sh
    npm install
    ```
4. Run:

   ```sh
    npm run dev
   ```

5. Build :

    ```sh
    npm run build
    ```


7. Test
      ```
   npm run test:unit
      ```


## Running on Docker Container
      docker build -t vuejs-cookbook/dockerize-vuejs-app . -f DockerFile
      docker run -it -p 8080:8080 --rm --name dockerize-vuejs-app-1 vuejs-cookbook/dockerize-vuejs-app

      Expected URL : http://127.0.0.1:8080/list 

## Project structure
   ```
src/
  apis/
  assets/
  components/
  includes/
  router/
  stores/
  types/
  views/
```
More description about main components
1. apis- All apis call will be kept here.
2. components - This folder contains all the components that are being used on views with the intention of having a shared component library for easier extension and updates. 
2. includes- This folder contains the helper libraries.
3. router- All routing information goes here.
4. stores - Stores related to different features are stored here.
5. types- TS interfaces/type.
6. views- Views combining several components and state logic. These are used to hook on routing.


## State management
   Used [Pinia](https://vuetifyjs.com/en/getting-started/installation/) along with reactive object (I've decided to stick with ref and used throughout the code instead of reactive.)


## Styling
   For styling, mainly [Vuetify library](https://vuetifyjs.com/en/getting-started/installation/) is used along with Font awesome icon-sets.



## Things that can be improved
1. Add more comprehensive unit tests to work with Vuetify/ ViTest. Currently facing some issue with setting value on vuetify elements. Need to investigate on it more.
2. Currently, the notification alert doesn't support multiple fired events.
3. Library to hold state and mutate results coming from API. 
4. PWA experience where we can cache pages and provide the offline version.


# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).


         

