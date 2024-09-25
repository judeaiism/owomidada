# Owomida Project Overview

## Project Structure

yaml
project:
root:
.env.local
node_modules:
"@firebase":
firestore:
dist:
lite:
index.d.ts
vertexai-preview:
dist:
index.cjs.js
esm:
index.esm2017.js
database:
dist:
src:
core:
util:
validation.d.ts
"@grpc":
proto-loader:
build:
bin:
proto-loader-gen-types.js
react-icons:
md:
index.d.ts
y18n:
build:
lib:
index.js
firebase:
firebase-database.js
app:
_app.tsx
cart.tsx
categories:
'[categoryName]':
page.tsx
create-listing.tsx
layout.tsx
page.tsx
types.ts
components:
Header.tsx
HamburgerMenu.tsx
ProductList.tsx
SearchBar.tsx
ui:
accordion.tsx
breadcrumb.tsx
calendar.tsx
card.tsx
chart.tsx
collapsible.tsx
command.tsx
context-menu.tsx
drawer.tsx
menubar.tsx
navigation-menu.tsx
resizable.tsx
table.tsx
tabs.tsx
toaster.tsx
context:
CartContext.ts
hooks:
use-toast.ts
lib:
utils.ts
public:
replit.svg
stores:
productStore.ts
styles:
globals.css
Home.module.css
.breakpoints
.config:
configstore:
update-notifier-npm.json
create-next-app-nodejs:
config.json
.eslintrc.json
.gitignore
.replit
.upm:
store.json
components.json
firebaseConfig.ts
next-env.d.ts
next.config.js
package.json
postcss.config.js
README.md
tailwind.config.js
tsconfig.json

NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyAbUtlkXw4ccDlg3c-gphWlskSaDlOHGX8"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "owomidada.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID: "owomidada"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "owomidada.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "183569616423"
NEXT_PUBLIC_FIREBASE_APP_ID: "1:183569616423:web:4d5ba4bc199493dfa24802"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: "G-XJ5P35EJDJ"


## Dependencies

Main dependencies:
- Next.js
- React
- Firebase
- React Icons
- Tailwind CSS
- Radix UI components
- Zustand (for state management)

Dev dependencies include TypeScript, ESLint, and various Radix UI packages.

## Key Components

1. Header (`components/Header.tsx`)
2. SearchBar (`components/SearchBar.tsx`)
3. ProductList (`components/ProductList.tsx`)
4. HamburgerMenu (`components/HamburgerMenu.tsx`)
5. CategoryList (`components/CategoryList.tsx`)
6. Various UI components in `components/ui/`

## Pages

1. Home Page (`app/page.tsx`)
2. Category Page (`app/categories/[categoryName]/page.tsx`)
3. Cart Page (`app/cart.tsx`)
4. Create Listing Page (`app/create-listing.tsx`)

## State Management

The project uses Zustand for state management, with a product store defined in `stores/productStore.ts`.

## Styling

- Tailwind CSS is used for styling (`styles/globals.css`)
- Some custom CSS modules are used (`styles/Home.module.css`)

## Firebase Integration

Firebase is integrated into the project for backend services. The configuration is stored in `firebaseConfig.ts`.

## Custom Hooks

Custom hooks are located in the `hooks/` directory, including `use-toast.ts`.

## TypeScript Configuration

TypeScript is configured in `tsconfig.json` with strict mode enabled and paths aliases set up.

## Build and Development Scripts
json
{
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "next lint"
}



## Notes

- The project is a Next.js application using the App Router.
- It implements a marketplace-like structure with product listings and categories.
- Firebase is used for backend services.
- The UI is built with a combination of custom components and Radix UI primitives.
- Tailwind CSS is used for styling, with some custom configurations.
- The project includes internationalization support (y18n).
- There's a custom implementation for a shopping cart (CartContext).

## TODO

- Implement authentication flow
- Complete the cart functionality
- Add more robust error handling
- Implement server-side rendering for product listings
- Optimize images and implement lazy loading
- Add unit and integration tests