# Java — Command Pattern example (Gradle, MVC, CLI)

Este proyecto es una versión simplificada que muestra el patrón Command en Java.

Estructura clave:
- Model/Receiver: `Light`
- Commands: `TurnOnCommand`, `TurnOffCommand`
- Invoker: `RemoteControl` (ejecuta comandos en memoria)
- Controller: `LightController` (cliente)
- Entrypoint: `App` (CLI)

Cómo ejecutar (desde esta carpeta):

```pwsh
gradle run --args="on"    # turn on (in the running process)
gradle run --args="state" # print current state (in new process -> initial OFF)
```

Notas:
- Para que el ejemplo sea didáctico y claro, el estado se mantiene solo en memoria por ejecución (no hay persistencia ni undo entre ejecuciones).
- Este ejemplo se centra en demostrar la separación de responsabilidades y la abstracción Command (client -> invoker -> command -> receiver).
# Java — Command Pattern example (Gradle, MVC, CLI)

This is a Java port of the TypeScript command-example using Gradle. It demonstrates the Command pattern with:

- Model/Receiver: `Light`
- Commands: `TurnOnCommand`, `TurnOffCommand`
-- Invoker: `RemoteControl` (keeps a history stack in-memory; undo works while the process is running)
- Controller: `LightController` (client)
- CLI: `App` (entrypoint)

How to run (from this folder):

```pwsh
gradle run --args="on"     # turn on
gradle run --args="state"  # show state
gradle run --args="undo"   # undo last command
```

Note: state and undo are in-memory only — they work while the process is running. This keeps the example simple and easy to understand.
