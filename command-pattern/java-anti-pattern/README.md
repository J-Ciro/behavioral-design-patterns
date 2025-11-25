# Java — Anti-pattern (Gradle, MVC anti-pattern)

Este proyecto muestra una implementación intencionalmente mala (anti-pattern) donde el controlador está fuertemente acoplado y mezcla responsabilidades.

Cómo ejecutar:

```pwsh
gradle run --args="on"
gradle run --args="state"
gradle run --args="undo"
```

Este ejemplo NO persiste estado entre ejecuciones — el controlador está fuertemente acoplado y maneja el historial en memoria. El `undo` se ejecuta sólo dentro del mismo proceso en tiempo de ejecución, y está implementado en el controlador (por eso sigue siendo un anti-pattern).
