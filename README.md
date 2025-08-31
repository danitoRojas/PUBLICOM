# Guía de Instalación: Node.js + Next.js + TypeScript

Sigue estos pasos para configurar y ejecutar el proyecto:

## Requisitos previos

Asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## Pasos de instalación

1. **Instala Node.js**:

   Descarga e instala Node.js desde [su página oficial](https://nodejs.org/). Esto también instalará `npm`.

2. **Crea un nuevo proyecto Next.js**:

   Si estás configurando un proyecto desde cero, ejecuta:

   ```bash
   npx create-next-app@latest <NOMBRE_DEL_PROYECTO> --typescript
   cd <NOMBRE_DEL_PROYECTO>
   ```

   Si ya tienes un repositorio, clónalo y accede al directorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_DIRECTORIO>
   ```

3. **Instala las dependencias**:

   Si usas `npm`:

   ```bash
   npm install
   ```

   Si usas `yarn`:

   ```bash
   yarn install
   ```

4. **Ejecuta el servidor de desarrollo**:

   Si usas `npm`:

   ```bash
   npm run dev
   ```

   Si usas `yarn`:

   ```bash
   yarn dev
   ```

5. **Abre el proyecto en tu navegador**:

   Por defecto, el proyecto estará disponible en [http://localhost:3000](http://localhost:3000).

## Configuración adicional

### Configuración de ESLint

Si necesitas personalizar la configuración de ESLint para producción, sigue estos pasos:

1. Configura la propiedad `parserOptions` en el archivo de configuración de ESLint:

   ```js
   export default {
     // otras reglas...
     parserOptions: {
       ecmaVersion: 'latest',
       sourceType: 'module',
       project: ['./tsconfig.json', './tsconfig.node.json'],
       tsconfigRootDir: __dirname,
     },
   }
   ```

2. Reemplaza `plugin:@typescript-eslint/recommended` por `plugin:@typescript-eslint/recommended-type-checked` o `plugin:@typescript-eslint/strict-type-checked`.

3. Opcionalmente, agrega `plugin:@typescript-eslint/stylistic-type-checked`.

4. Instala el complemento `eslint-plugin-react` y agrega las siguientes extensiones:

   ```json
   "extends": [
     "plugin:react/recommended",
     "plugin:react/jsx-runtime"
   ]
   ```

### Configuración de TypeScript

Asegúrate de que el archivo `tsconfig.json` esté configurado correctamente. Un ejemplo básico sería:

```json
{
  "compilerOptions": {
    "target": "esnext",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve"
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

¡Listo! Ahora puedes comenzar a desarrollar tu proyecto con Next.js.
