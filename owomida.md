This YAML representation provides a structured overview of your project, including the file hierarchy and the content ranges for each file. Empty objects ({}) indicate files that were mentioned but for which no specific content was provided in the input.

project:
  root:
    - .env.local
    - node_modules:
        - "@firebase":
            - firestore:
                dist:
                  lite:
                    - index.d.ts
            - vertexai-preview:
                dist:
                  - index.cjs.js
                  esm:
                    - index.esm2017.js
            - database:
                dist:
                  src:
                    core:
                      util:
                        - validation.d.ts
        - "@grpc":
            proto-loader:
              build:
                bin:
                  - proto-loader-gen-types.js
        - react-icons:
            md:
              - index.d.ts
        - y18n:
            build:
              lib:
                - index.js
        - firebase:
            - firebase-database.js

environment_variables:
  NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyAbUtlkXw4ccDlg3c-gphWlskSaDlOHGX8"
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "owomidada.firebaseapp.com"
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: "owomidada"
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "owomidada.appspot.com"
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "183569616423"
  NEXT_PUBLIC_FIREBASE_APP_ID: "1:183569616423:web:4d5ba4bc199493dfa24802"
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: "G-XJ5P35EJDJ"

dependencies:
  - firebase
  - react-icons

dev_dependencies:
  - "@grpc/proto-loader"
  - y18n

typescript_definitions:
  - "@firebase/firestore"
  - "@firebase/vertexai-preview"
  - "@firebase/database"
  - "react-icons"

firebase_modules:
  - firestore
  - vertexai-preview
  - database

notes:
  - The project appears to be a Next.js application using Firebase.
  - Firebase configuration is stored in .env.local file.
  - The project uses React Icons library, specifically Material Design icons.
  - There are TypeScript definition files for Firebase modules.
  - The project includes some gRPC-related tools, possibly for API communication.
  - Y18n is included, which suggests internationalization might be implemented.

project_root:
  .breakpoints:
    content:
      startLine: 1
      endLine: 20
  .config:
    configstore:
      update-notifier-npm.json:
        content:
          startLine: 1
          endLine: 4
    create-next-app-nodejs:
      config.json:
        content:
          startLine: 1
          endLine: 8
  .eslintrc.json:
    content:
      startLine: 1
      endLine: 4
  .gitignore:
    content:
      startLine: 1
      endLine: 130
  .replit:
    content:
      startLine: 1
      endLine: 20
  .upm:
    store.json:
      content:
        startLine: 1
        endLine: 2
  app:
    _app.tsx:
      content:
        startLine: 1
        endLine: 8
    cart.tsx:
      content:
        startLine: 1
        endLine: 1
    categories:
      '[categoryName]':
        page.tsx:
          content:
            startLine: 1
            endLine: 46
    create-listing.tsx:
      content:
        startLine: 1
        endLine: 135
    layout.tsx:
      content:
        startLine: 1
        endLine: 13
    page.tsx:
      content:
        startLine: 1
        endLine: 35
    types.ts:
      content:
        startLine: 1
        endLine: 8
  cache:
    config.json:
      content:
        startLine: 1
        endLine: 5
  components:
    Header.tsx:
      content:
        startLine: 1
        endLine: 25
    HamburgerMenu.tsx:
      content:
        startLine: 34
        endLine: 34
    ProductList.tsx:
      content:
        startLine: 1
        endLine: 28
    SearchBar.tsx: {}
    ui:
      accordion.tsx:
        content:
          startLine: 1
          endLine: 58
      breadcrumb.tsx:
        content:
          startLine: 1
          endLine: 115
      calendar.tsx:
        content:
          startLine: 12
          endLine: 66
      card.tsx:
        content:
          startLine: 1
          endLine: 56
      chart.tsx:
        content:
          startLine: 68
          endLine: 365
      collapsible.tsx:
        content:
          startLine: 1
          endLine: 11
      command.tsx:
        content:
          startLine: 40
          endLine: 155
      context-menu.tsx:
        content:
          startLine: 1
          endLine: 39
      drawer.tsx:
        content:
          startLine: 1
          endLine: 104
      menubar.tsx:
        content:
          startLine: 1
          endLine: 236
      navigation-menu.tsx:
        content:
          startLine: 1
          endLine: 128
      resizable.tsx:
        content:
          startLine: 45
          endLine: 45
      table.tsx:
        content:
          startLine: 1
          endLine: 117
      tabs.tsx:
        content:
          startLine: 1
          endLine: 37
      toaster.tsx:
        content:
          startLine: 1
          endLine: 35
  components.json:
    content:
      startLine: 1
      endLine: 20
  context:
    CartContext.ts:
      content:
        startLine: 1
        endLine: 1
  firebaseConfig.ts:
    content:
      startLine: 1
      endLine: 10
  hooks:
    use-toast.ts: {}
  lib:
    utils.ts:
      content:
        startLine: 1
        endLine: 6
  next-env.d.ts:
    content:
      startLine: 1
      endLine: 6
  next.config.js:
    content:
      startLine: 1
      endLine: 7
  package.json:
    content:
      startLine: 1
      endLine: 77
  postcss.config.js:
    content:
      startLine: 1
      endLine: 6
  public:
    replit.svg:
      content:
        startLine: 1
        endLine: 1
  README.md:
    content:
      startLine: 1
      endLine: 25
  stores:
    productStore.ts: {}
  styles:
    globals.css:
      content:
        startLine: 1
        endLine: 86
    Home.module.css:
      content:
        startLine: 1
        endLine: 117
  tailwind.config.js:
    content:
      startLine: 1
      endLine: 102
  tsconfig.json:
    content:
      startLine: 1
      endLine: 40