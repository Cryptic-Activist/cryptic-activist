This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Theming Components

- Create a folder on `/styles/themes/components`
- Create the color schema for both Dark and Light mode
- Import the component theme to `/styles/themes/dark.ts` and `/styles/themes/light.ts` as shown below:

```tsx
// dark.ts
import { dark as componentName } from "/path/component/theme";

export default {
	componentName,
};
```

- Create the corresping interface to each component theme created.
  - Create a new folder as the component name on `/interfaces/styles/themes/components/componentName`
  - Create an `index.ts` file as follows:
  ```ts
  export interface IStyledComponentName {
  	someProperty: string;
  }
  ```
  - Export the new interface on `/interfaces/styles/themes/components/index.ts`:
  ```ts
  export * from "./SomeComponent";
  ```
- Finally, include the new component theme interface on `/styles/styled.d.ts` file

```ts
import "styled-components";

import { IStyledSomeComponent } from "../interfaces/styles/themes";

declare module "styled-components" {
	export interface DefaultTheme {
		someComponent: IStyledSomeComponent;
	}
}
```
