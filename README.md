SISTEMA DE GESTIÓN DE PRÉSTAMOS DE EQUIPOS

Técnicas de Modelado de Software

Autores:

-Juan Pablo Muñoz Alvarez

-Juan José Valencia García

📝 Descripción General del Proyecto

Esta página web fue diseñada pensando exclusivamente en las necesidades de la universidad para organizar y controlar el préstamo de computadores, como computadores portátiles y de escritorio, que se le entregan a los alumnos para sus clases, tareas o proyectos de investigación.

La idea principal es acabar con el desorden de anotar los préstamos en cuadernos o archivos de Excel sueltos que siempre se terminan perdiendo o confundiendo. Con este sistema digital, la universidad puede saber con total seguridad qué estudiante tiene un computador asignado, a qué hora se lo llevó, qué día debe devolverlo y qué equipos están libres en la biblioteca o en las salas de sistemas para que otros alumnos los puedan aprovechar.

👥 Perfiles de Usuario

-Perfil Estudiante: Una interfaz intuitiva orientada al usuario final, diseñada para explorar el catálogo de dispositivos disponibles, generar peticiones en tiempo real y verificar de forma transparente el estado histórico de sus solicitudes.

-Perfil Administrador: Un panel de control de nivel operativo enfocado en la supervisión global del inventario, la dictaminación de solicitudes (aprobación o rechazo) y la auditoría del estado físico y logístico de cada equipo.

🛠️ Arquitectura Tecnológica del Sistema:

1. Capa de Estructura (HTML5)

Tecnología: 

-Función: Implementación de maquetación semántica avanzada utilizando etiquetas modernas (< header >, < nav >, < main >, < section >).

-Impacto: Garantiza una estructura lógica limpia, accesibilidad web óptima para todo tipo de usuarios y fácil indexación.

🎨 2. Capa de Presentación (CSS3)

Tecnología: 

Función: Arquitectura de estilos basada en diseño adaptativo (Responsive Design).

Impacto: Asegura una experiencia de usuario cómoda y visualmente atractiva en smartphones, tabletas y computadoras de escritorio.

⚙️ 3. Capa de Lógica (JavaScript / TypeScript)

Tecnología:  

Función: Motor lógico encargado de orquestar el flujo completo de la aplicación.

Impacto: Gestiona el enrutamiento dinámico entre pantallas, procesa las reglas de negocio de reservas y captura reactivamente cada acción del usuario.

💾 4. Capa de Datos (JSON Mocks)

Tecnología: 

Función: Estructuras de objetos estructurados que simulan el almacenamiento de información.

Impacto: Permite validar e interactuar con la persistencia, integridad y consistencia del inventario y usuarios sin dependencias externas.

📂 Organización Estructural del Software

El diseño de la aplicación adopta un enfoque modular, distribuyendo y organizando los recursos del sistema de manera lógica y coherente a través de los siguientes componentes analíticos:

-Componentes de Lógica y Almacenamiento:

-Repositorio de Datos (store.js): Actúa como el núcleo de datos local, proveyendo los objetos simulados para el inventario, los usuarios y los estados de los préstamos.

-Orquestador de Interfaz (ui.js): Gestiona los cambios visuales reactivos en pantalla y las mutaciones dinámicas de los elementos del navegador.

-Módulo de Autenticación (login.js / register.js): Capa encargada de validar las credenciales de acceso y procesar de manera segura el registro de nuevas cuentas de usuario.

-Paneles de Trabajo Especializados (admin.js / estudiante.js): Controladores independientes que ejecutan las reglas y restricciones específicas de cada rol dentro del sistema.

Carpetas y Recursos:

El proyecto está dividido en carpetas para mantener el orden de los recursos:

-Carpeta de diseño (CSS): Contiene el archivo con las reglas de estilo para que la página se vea bonita y se adapte automáticamente a los celulares.

-Carpeta de código (JS): Contiene los archivos de script que le dan interactividad a la página web y responden al usuario.

-Pantallas de la Página (Archivos HTML)

-Pantallas de entrada (index.html, login.html, register.html): Son las pantallas públicas para ver la bienvenida, poner tu clave o registrarte.

-Pantallas privadas (admin.html, estudiante.html): Son las pantallas a las que entras solo después de poner tu usuario y contraseña correcto.

🚀 Pasos para Descargar y Ejecutar el Proyecto

Sigue esta guía de pasos para probar y ejecutar el sistema localmente en tu computadora:

-Entrar al repositorio: Ingrese al enlace de GitHub que le compartimos.

-Descargar el proyecto: Busque el botón verde en la parte superior derecha que dice "Code".

-Bajar el archivo: Dé clic en la opción "Download ZIP" para descargar todo el proyecto comprimido en tu PC.

-Descomprimir: Busque el archivo en su carpeta de descargas y extráigalo en una carpeta normal.

-Abrir el programa: Abra el editor de código Visual Studio Code.

-Cargar el proyecto: Vaya al menú superior del programa, elija File -> Open Folder (Archivo -> Abrir carpeta) y seleccione la carpeta que acaba de descomprimir.

-Buscar el inicio: En la lista de archivos de la izquierda de la pantalla, busque el archivo principal llamado index.html y dele un solo clic para abrirlo.

-Encender el servidor: Dé clic derecho en cualquier parte en blanco del código de ese archivo index.html y elija la opción "Open with Live Server". La página se ejecutará en tu navegador web.

🔑 Cuentas de Acceso (Credenciales de Prueba)

Como el sistema funciona con datos simulados integrados directamente en el código de JavaScript, no necesita instalar bases de datos pesadas ni configurar conexiones a internet. La página ya viene con cuentas de prueba pre-creadas para que pueda iniciar sesión de inmediato:

-Perfil Estudiante:

Usuario: juanpablo.munoz@utp.edu.co

Contraseña: Estudiante2026

-Perfil Administrador:

Usuario: juanjose.valencia@utp.edu.co

Contraseña: Admin2026
