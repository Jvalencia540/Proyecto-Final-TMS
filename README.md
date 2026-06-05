<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vista Previa de tu README en GitHub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            background-color: #0d1117;
            color: #c9d1d9;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
        }
        .github-box {
            border: 1px solid #30363d;
            background-color: #161b22;
        }
        .readme-body h1 {
            font-size: 2rem;
            font-weight: 600;
            padding-bottom: 0.3em;
            border-bottom: 1px solid #21262d;
            color: #f0f6fc;
            margin-top: 24px;
            margin-bottom: 16px;
        }
        .readme-body h2 {
            font-size: 1.5rem;
            font-weight: 600;
            padding-bottom: 0.3em;
            border-bottom: 1px solid #21262d;
            color: #f0f6fc;
            margin-top: 24px;
            margin-bottom: 16px;
        }
        .readme-body h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #f0f6fc;
            margin-top: 20px;
            margin-bottom: 8px;
        }
        .readme-body p {
            margin-top: 0;
            margin-bottom: 16px;
            line-height: 1.5;
        }
        .readme-body table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 0;
            margin-bottom: 16px;
        }
        .readme-body th {
            font-weight: 600;
            background-color: #161b22;
            border: 1px solid #30363d;
            padding: 6px 13px;
            color: #f0f6fc;
        }
        .readme-body td {
            border: 1px solid #30363d;
            padding: 6px 13px;
        }
        .readme-body tr:nth-child(even) {
            background-color: #0d1117;
        }
        .readme-body ul {
            padding-left: 2em;
            margin-top: 0;
            margin-bottom: 16px;
            list-style-type: disc;
        }
        .readme-body li {
            margin-top: 0.25em;
        }
        .readme-body code {
            padding: 0.2em 0.4em;
            margin: 0;
            font-size: 85%;
            white-space: break-spaces;
            background-color: rgba(110, 118, 129, 0.4);
            border-radius: 6px;
            font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
            color: #f0f6fc;
        }
        .readme-body pre {
            padding: 16px;
            overflow: auto;
            font-size: 85%;
            line-height: 1.45;
            background-color: #0d1117;
            border: 1px solid #30363d;
            border-radius: 6px;
            margin-bottom: 16px;
        }
        .readme-body pre code {
            background-color: transparent;
            padding: 0;
            font-size: 100%;
            color: #c9d1d9;
        }
        .readme-body hr {
            height: 0.25em;
            padding: 0;
            margin: 24px 0;
            background-color: #30363d;
            border: 0;
        }
    </style>
</head>
<body class="p-4 md:p-8">

    <div class="max-w-4xl mx-auto">
        <!-- Barra de navegación simulada de GitHub -->
        <div class="flex items-center justify-between mb-4 bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <div class="flex items-center space-x-3">
                <i class="fa-brands fa-github text-3xl text-white"></i>
                <div>
                    <span class="text-blue-400 font-semibold text-sm hover:underline cursor-pointer">TMS-Proyectos</span>
                    <span class="text-[#8b949e] text-sm">/</span>
                    <span class="text-white font-semibold text-sm hover:underline cursor-pointer">gestion-prestamos-equipos</span>
                </div>
            </div>
            <div class="flex items-center space-x-2">
                <span class="bg-[#21262d] text-[#c9d1d9] text-xs font-semibold px-2.5 py-1 border border-[#30363d] rounded-md flex items-center gap-1">
                    <i class="fa-regular fa-star"></i> Star
                </span>
            </div>
        </div>

        <!-- Archivo README en el repositorio -->
        <div class="github-box rounded-lg overflow-hidden">
            <div class="border-b border-[#30363d] bg-[#161b22] px-4 py-3 flex items-center justify-between">
                <div class="flex items-center space-x-2 text-sm font-semibold text-[#f0f6fc]">
                    <i class="fa-regular fa-file-lines text-[#8b949e]"></i>
                    <span>README.md</span>
                </div>
                <div class="text-[#8b949e] text-xs">
                    Renderizado por GitHub de forma automática ✨
                </div>
            </div>

            <!-- Cuerpo del README renderizado con estilo idéntico a GitHub -->
            <div class="p-6 md:p-10 bg-[#0d1117] text-[#c9d1d9] readme-body">
                
                <h1>SISTEMA DE GESTIÓN DE PRÉSTAMOS DE EQUIPOS</h1>
                <h3 class="text-[#8b949e] !mt-0">Técnicas de Modelado de Software</h3>

                <p class="mt-4"><strong class="text-[#f0f6fc]">Autores:</strong></p>
                <ul>
                    <li>Juan Pablo Muñoz Alvarez</li>
                    <li>Juan José Valencia García</li>
                </ul>

                <hr>

                <h2><i class="fa-regular fa-clipboard mr-2 text-blue-400"></i> Descripción General del Proyecto</h2>
                <p>Esta página web fue diseñada pensando exclusivamente en las necesidades de la universidad para organizar y controlar el préstamo de computadores (tanto computadores portátiles como de escritorio) que se le entregan a los alumnos para sus clases, tareas o proyectos de investigación.</p>
                <p>La idea principal es acabar con el desorden de anotar los préstamos en cuadernos o archivos de Excel sueltos que siempre se terminan perdiendo o confundiendo. Con este sistema digital, la universidad puede saber con total seguridad qué estudiante tiene un computador asignado, a qué hora se lo llevó, qué día debe devolverlo y qué equipos están libres en la biblioteca o en las salas de sistemas para que otros alumnos los puedan aprovechar.</p>

                <hr>

                <h2><i class="fa-solid fa-users mr-2 text-green-400"></i> Perfiles de Usuario</h2>
                <p>El sistema cuenta con dos tipos de acceso independientes para garantizar un flujo de trabajo lógico y seguro:</p>
                <ul>
                    <li><strong>Perfil Estudiante:</strong> Una interfaz intuitiva orientada al usuario final, diseñada para explorar el catálogo de dispositivos disponibles, generar peticiones de préstamo en tiempo real y verificar de forma transparente el estado histórico de sus solicitudes anteriores.</li>
                    <li><strong>Perfil Administrador:</strong> Un panel de control de nivel operativo enfocado en la supervisión global de todo el inventario de la universidad, la dictaminación de solicitudes (aprobar o rechazar préstamos) y la auditoría del estado físico y logístico de cada equipo.</li>
                </ul>

                <hr>

                <h2><i class="fa-solid fa-layer-group mr-2 text-purple-400"></i> Arquitectura Tecnológica del Sistema</h2>
                <p>El sistema se divide en cuatro capas fundamentales de desarrollo:</p>
                
                <div class="overflow-x-auto">
                    <table>
                        <thead>
                            <tr>
                                <th class="text-left">Capa del Sistema</th>
                                <th class="text-left">Tecnología Utilizada</th>
                                <th class="text-left">Rol y Función en el Proyecto</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="font-bold text-[#f0f6fc]">Capa de Estructura</td>
                                <td><code>HTML5</code></td>
                                <td>Implementación de maquetación semántica avanzada (<code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;footer&gt;</code>) que garantiza una correcta accesibilidad web y una jerarquía de contenido limpia.</td>
                            </tr>
                            <tr>
                                <td class="font-bold text-[#f0f6fc]">Capa de Presentación</td>
                                <td><code>CSS3</code></td>
                                <td>Arquitectura de estilos basada en diseño adaptativo (<em>Responsive Design</em>), lo que asegura una experiencia de usuario óptima y fluida en smartphones, tabletas y pantallas de escritorio.</td>
                            </tr>
                            <tr>
                                <td class="font-bold text-[#f0f6fc]">Capa de Lógica</td>
                                <td><code>JavaScript / TypeScript</code></td>
                                <td>Motor lógico encargado del enrutamiento dinámico entre pantallas, el procesamiento de las reglas de negocio y la interceptación reactiva de los eventos de la interfaz.</td>
                            </tr>
                            <tr>
                                <td class="font-bold text-[#f0f6fc]">Capa de Datos</td>
                                <td><code>JSON Mocks</code></td>
                                <td>Estructuras estáticas de objetos empleadas para vincular y simular la persistencia, integridad y consistencia de la información del sistema en tiempo real.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <hr>

                <h2><i class="fa-solid fa-folder-open mr-2 text-yellow-500"></i> Organización Estructural del Software</h2>
                <p>El diseño de la aplicación adopta un enfoque modular, distribuyendo y organizando los recursos del sistema de manera lógica y coherente:</p>

                <h3>Componentes de Lógica y Almacenamiento</h3>
                <ul>
                    <li><strong>Repositorio de Datos (<code>store.js</code>):</strong> Actúa como el núcleo de datos local, proveyendo los objetos simulados para el inventario de equipos, los usuarios registrados y el estado actual de los préstamos.</li>
                    <li><strong>Orquestador de Interfaz (<code>ui.js</code>):</strong> Gestiona los cambios visuales reactivos en pantalla y las mutaciones dinámicas de los elementos del navegador de manera limpia.</li>
                    <li><strong>Módulo de Autenticación (<code>login.js</code> / <code>register.js</code>):</strong> Capa encargada de validar las credenciales de acceso de los usuarios y procesar de manera segura el registro de nuevas cuentas de estudiante.</li>
                    <li><strong>Paneles de Trabajo Especializados (<code>admin.js</code> / <code>estudiante.js</code>):</strong> Controladores independientes que ejecutan las reglas, restricciones y opciones específicas de cada rol asignado.</li>
                </ul>

                <h3>Carpetas del Proyecto</h3>
                <ul>
                    <li><strong>Carpeta de diseño (<code>CSS</code>):</strong> Contiene el archivo con las reglas visuales para que la página se vea bonita, elegante y se adapte perfectamente a teléfonos móviles.</li>
                    <li><strong>Carpeta de código (<code>JS</code>):</strong> Contiene los archivos que le dan vida e interactividad a la página web, respondiendo rápidamente a las acciones del usuario.</li>
                </ul>

                <h3>Pantallas de la Página (Archivos HTML)</h3>
                <ul>
                    <li><strong>Pantallas de entrada (<code>index.html</code>, <code>login.html</code>, <code>register.html</code>):</strong> Son las pantallas públicas que cualquiera puede ver: bienvenida general, inicio de sesión (login) o el formulario de registro de estudiantes.</li>
                    <li><strong>Pantallas privadas (<code>admin.html</code>, <code>estudiante.html</code>):</strong> Son los paneles de control específicos a los que el usuario solo puede acceder tras ingresar correctamente su correo y contraseña.</li>
                </ul>

                <hr>

                <h2><i class="fa-solid fa-terminal mr-2 text-teal-400"></i> Estructura Visual del Árbol de Directorios</h2>
                <pre><code>gestion-prestamos-equipos/
│
├── index.html                  # Pantalla de acceso / Bienvenida general
├── login.html                  # Formulario de inicio de sesión de usuarios
├── register.html               # Formulario de registro para nuevos estudiantes
├── admin.html                  # Panel de control y reportería del Administrador
├── estudiante.html             # Panel de solicitudes y estado para Estudiantes
│
├── css/
│   └── styles.css              # Hojas de estilo globales, variables y Media Queries
│
└── js/
    ├── login.js                # Control de accesos y validaciones de login
    ├── register.js             # Lógica para la creación de cuentas de usuario
    ├── admin.js                # Lógica del panel de administración
    ├── estudiante.js           # Manejo de reservas y solicitudes de equipos
    ├── ui.js                   # Renderizado dinámico de componentes y manipulación del DOM
    └── store.js                # Core de lógica de negocio y mocks de datos</code></pre>

                <hr>

                <h2><i class="fa-key fa-terminal mr-2 text-orange-400"></i> Cuentas de Acceso (Credenciales de Prueba)</h2>
                <p>El sistema cuenta con cuentas pre-creadas dentro del repositorio de datos local para que puedas acceder inmediatamente a los paneles privados:</p>
                <ul>
                    <li><strong>Perfil Estudiante:</strong><br>
                        <code>Usuario: juanpablo.munoz@utp.edu.co</code><br>
                        <code>Contraseña: Estudiante2026</code>
                    </li>
                    <li class="mt-2"><strong>Perfil Administrador:</strong><br>
                        <code>Usuario: juanjose.valencia@utp.edu.co</code><br>
                        <code>Contraseña: Admin2026</code>
                    </li>
                </ul>

            </div>
        </div>
    </div>

</body>
</html>
