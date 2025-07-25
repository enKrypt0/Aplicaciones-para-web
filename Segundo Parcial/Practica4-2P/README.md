Pasos para ejecutar el programa: 
    1.- Tener instalado AngularCLI y Node.js.
    2.- Ejecutar cd actividad5_angular (o el nombre de la carpeta)
    3.- Ejecutar npm install 
    4.- Instalar tailwindcss (si es que no está instalado)
        4.1.- npm install tailwindcss @tailwindcss/postcss postcss --force
        4.2.- Crear un archivo ".postcssrc.json" y escribir este código (ya está creado, solo hacer este paso si no está el archivo postcssrc):
                {
                    "plugins": {
                        "@tailwindcss/postcss": {}
                    }
                }
        4.3.- Importar tailwind en ./src/styles.css con: @import "tailwindcss"(solo ejectuar si no está importado en el archiov styles.css);
    5.- Ejecutar "ng serve" para usar el programa en el puerto 4200, si se quiere usar otro puerto usar: "ng serve --port 4201"

David Cevallos-CRUD Usuarios.
Jostin Delgado-CRUD Bares.
Diego Vélez-CRUD Bebidas.

                            
Reflexión: Angular es una herramienta de frontend que tiene una estructura fija en sus componentes, esto brinda la ventaja de ser más robusto y si contamos con su CLI la creación de componentes y otras estructuras serán más rápidas y seguras de crear.