# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

validate={(values: userModel) => {
const errors: userModel = {};

          if(!values.name){
            errors.name = "Name is required"
          }
          if(!values.username){
            errors.username = "Username is required"
          }
          if(!values.email){
            errors.email = " is required"
          }
          if(!values.address.street){
            errors.address.street = "ກະລຸນາປ້ອນລາຄາສີນຄ້າ"
          }
          if(!values.address.suite){
            errors.address.suite = "ກະລຸນາເລືອກສິນຄ້າ"
          }
          if(!values.address.city){
            errors.address.city = "ກະລຸນາປ້ອນຈະນວນສີນຄ້າ"
          }
          if(!values.address.zipcode){
            errors.address.zipcode = "ກະລຸນາປ້ອນລາຍລະອຽດສີນຄ້າ"
          }
          if(!values.address.geo.lat){
            errors.address.geo.lat = "ກະລຸນາປ້ອນລາຍລະອຽດສີນຄ້າ"
          }
          if(!values.address.geo.lng){
            errors.address.geo.lng = "ກະລຸນາປ້ອນລາຍລະອຽດສີນຄ້າ"
          }
          if(!values.phone){
            errors.phone = "ກະລຸນາປ້ອນລາຍລະອຽດສີນຄ້າ"
          }
          if(!values.website){
            errors.website = "ກະລຸນາປ້ອນລາຍລະອຽດສີນຄ້າ"
          }
          if(!values.company.name){
            errors.company.name = "ກະລຸນາປ້ອນຊື່ສີນຄ້າ"
          }
          if(!values.company.catchPhrase){
            errors.company.catchPhrase = "ກະລຸນາປ້ອນລາຍລະອຽດສີນຄ້າ"
          }
          if(!values.company.bs){
            errors.company.bs = "ກະລຸນາປ້ອນຊື່ສີນຄ້າ"
          }
          return errors;
        }}
