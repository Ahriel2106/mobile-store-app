# mobile-store-app

📱 Mobile Catalog App

Este proyecto es una aplicación web para visualizar un catálogo de teléfonos móviles. Permite buscar dispositivos, ver sus detalles y gestionarlos en un carrito de compras.

🚀 Tecnologías Utilizadas

React (>=17)

React Router para la navegación

React Context API para la gestión de estado

Material UI para la interfaz de usuario

CSS/SASS/StyledComponents para los estilos

API REST con autenticación mediante x-api-key

Jest/React Testing Library para pruebas

ESLint y Prettier para calidad de código

📌 Funcionalidades

1. Listado de Teléfonos

Vista en cuadrícula con los primeros 20 teléfonos obtenidos de la API.

Buscador en tiempo real por nombre o marca (filtro desde la API).

Contador de resultados encontrados.

Barra de navegación con:

Enlace al inicio.

Icono con la cantidad de teléfonos en el carrito (persistente en localStorage).

Redirección a la vista de detalle al hacer clic en un teléfono.

2. Detalle de Teléfono

Muestra imagen, nombre, marca y especificaciones técnicas.

Selectores de almacenamiento y color (actualizando el precio en tiempo real).

Imagen principal cambia según el color seleccionado.

Botón "Añadir al carrito" (habilitado solo si se han seleccionado opciones).

Sección de "Productos similares".

3. Carrito

Lista de productos añadidos con detalles y precio individual.

Botón para eliminar elementos del carrito.

Cálculo del precio total.

Botón "Continuar comprando" que redirige al listado.

⚙️ Instalación y Uso

Clonar el repositorio:

git clone <URL_DEL_REPOSITORIO>
cd mobile-catalog-app

Instalar dependencias:

npm install

Configurar variables de entorno (.env):

REACT_APP_API_URL=<URL_DE_LA_API>
REACT_APP_API_KEY=<TU_API_KEY>

Ejecutar el servidor de desarrollo:

npm start

🧪 Pruebas

Ejecutar las pruebas unitarias con:

npm test

🚀 Despliegue

Para construir la aplicación en modo producción:

npm run build

El contenido generado estará en la carpeta build/, listo para ser desplegado en cualquier servidor estático.