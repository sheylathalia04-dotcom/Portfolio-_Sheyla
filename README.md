# Portfolio de Sheyla Thalía

Portfolio desarrollado con React, TypeScript, Vite y Tailwind CSS.

## Desarrollo y compilación

Se necesita Node.js 20.19 o posterior y npm. Ejecuta:

```bash
npm install
npm run dev
```

Para comprobar la versión de producción:

```bash
npm run lint
npm run build
npm run preview
```

Vercel utiliza `npm run build` y publica el directorio `dist` mediante `vercel.json`. La navegación entre secciones usa fragmentos de URL (`#sobre-mi`, `#experiencia`, etc.), por lo que no requiere un servidor adicional.

## Imágenes

Las imágenes públicas se sirven desde `public/` y sus rutas empiezan por `/assets/`. La foto de perfil se encuentra en `public/assets/img/sheyla.jfif` y se comparte entre el portfolio, la navegación, el icono y el CV; si no carga, se muestra la imagen de respaldo.

## Chatbot

El chatbot responde localmente a partir de la información incluida en el portfolio. No necesita una clave de Gemini, funciones de servidor ni variables de entorno, y sigue disponible en la versión publicada.

## Formulario de contacto

El formulario envía el mensaje directamente a través de FormSubmit (`formsubmit.co`), sin base de datos propia, servidor ni cuenta para el visitante. La primera vez, FormSubmit enviará un mensaje de confirmación a `sheylathalia04@gmail.com`; hay que abrirlo y confirmar la dirección para activar la recepción. El formulario informa al visitante de que sus datos se tramitan por ese servicio. También se puede usar el enlace `mailto:` como alternativa.
