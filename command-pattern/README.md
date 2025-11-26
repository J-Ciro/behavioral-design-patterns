# Patrón Command — Ejemplos (TypeScript + MVC + Terminal)

Este directorio contiene tres ejemplos separados para aprender el patrón de comportamiento "Command" usando TypeScript y un estilo MVC simple, desde la consola/terminal:

1. command-example — Implementación correcta del patrón Command (Receiver, Command, Invoker, Client) con MVC y entradas por CLI.
2. anti-pattern — Implementación intencionalmente mala: controlador fuertemente acoplado que mezcla responsabilidades y no usa el patrón Command.
3. without-pattern — Una implementación limpia bajo MVC que NO usa Command, pero sí mantiene responsabilidades separadas.

¿Por qué 3 ejemplos?
- Para comparar el patrón correcto con una versión limpia sin el patrón y con una versión anti-patrón. Esto ayuda a visualizar ventajas como desacoplamiento, extensibilidad y testabilidad.

Cómo ejecutar cada ejemplo (desde cada subcarpeta):

```pwsh
cd command-pattern/command-example
npm install
npm run build
npm run start -- on     # enciende
npm run start -- off    # apaga
npm run start -- undo   # deshace última acción (solo en command-example)
npm run start -- state  # muestra estado

cd ../anti-pattern
npm install
npm run build
npm run start -- on
npm run start -- off
npm run start -- state

cd ../without-pattern
npm install
npm run build
npm run start -- on
npm run start -- off
npm run start -- state
```

Lectura recomendada (rápida):
- Command pattern: separa una petición como objeto (Command) para que el que pide y quien ejecuta queden desacoplados. Esto permite logging, queueing, undo, macro-commands y pruebas más sencillas.

Si quieres, puedo ahora:
- Ejecutar los comandos localmente y verificar la compilación en cada carpeta (si quieres que lo haga aquí). 
- Añadir ejemplos de tests unitarios para cada carpeta.

## Proyectos Java (Gradle)

También añadí tres ejemplos en Java usando Gradle (misma idea: `command-example`, `anti-pattern`, `without-pattern`).

Cómo ejecutar los ejemplos Java (desde la carpeta correspondiente):

```pwsh
cd command-pattern/java-command-example
gradle run --args="on"
gradle run --args="state"
gradle run --args="undo"

cd ../java-anti-pattern
gradle run --args="on"
gradle run --args="state"
gradle run --args="undo"

cd ../java-without-pattern
gradle run --args="on"
gradle run --args="state"
gradle run --args="undo"
```

En los proyectos Java el estado y el historial se mantienen ahora solo en memoria durante la ejecución (sin persistencia entre ejecuciones). Esto mantiene los ejemplos más simples y fáciles de entender.
