# Java — MVC without Command Pattern (Gradle)

Este proyecto muestra una implementación limpia MVC en Java que NO usa el patrón Command pero mantiene responsabilidades separadas entre controlador, vista y modelo.

Cómo ejecutar:

```pwsh
gradle run --args="on"
gradle run --args="state"
```

El estado se mantiene en memoria durante la ejecución del proceso (no hay persistencia entre ejecuciones), lo que mantiene el ejemplo simple y fácil de entender.
