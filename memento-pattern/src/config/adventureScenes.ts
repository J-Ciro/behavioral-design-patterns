import type { Scene } from '../types';

/**
 * Configuración de escenas de la aventura
 * Principio SOLID: Separación de datos de la lógica
 * 
 * Los IDs no son secuenciales por diseño intencional
 * para demostrar que el Iterator maneja correctamente la navegación
 */
export const ADVENTURE_SCENES: readonly Scene[] = [
  {
    id: 100,
    title: 'El Despertar en la Ciénaga',
    storyText:
      'Te despiertas sin recordar nada, rodeado por la densa niebla de un pantano. ' +
      'Frente a ti, hay dos caminos: uno que lleva a un antiguo puente de piedra ' +
      'y otro que se adentra en el bosque oscuro.',
    imageUrl: '/src/img/100-El Despertar en la Ciénaga.png',
    choices: [
      { text: 'Cruzar el puente de piedra.', nextStepId: 200 },
      { text: 'Adentrarse en el bosque oscuro.', nextStepId: 300 },
    ],
  },
  {
    id: 200,
    title: 'El Encuentro en el Puente',
    storyText:
      'Cruzas el puente resbaladizo. Al otro lado, un anciano con una túnica desgarrada ' +
      'te espera. Te ofrece una poción que podría restaurar tus recuerdos, pero tiene un coste.',
    imageUrl: '/src/img/200-El Encuentro en el Puente.png',
    choices: [
      { text: 'Beber la poción (Aceptar el riesgo).', nextStepId: 201 },
      { text: 'Rechazar y volver al cruce del bosque.', nextStepId: 300 },
    ],
  },
  {
    id: 201,
    title: 'El Flashback',
    storyText:
      'La poción quema tu garganta. De repente, ves imágenes de un mapa escondido ' +
      'en una ruina cercana... pero el anciano desaparece. El camino sigue hacia unas ruinas.',
    imageUrl: '/src/img/201-El Flashback.png',
    choices: [
      { text: 'Explorar las Ruinas de la Memoria.', nextStepId: 400 },
      { text: 'Regresar al cruce (por seguridad).', nextStepId: 100 },
    ],
  },
  {
    id: 300,
    title: 'El Silencio del Bosque',
    storyText:
      'El bosque es oscuro y silencioso. Escuchas el aullido distante de un lobo. ' +
      'Tras caminar un rato, llegas a un claro donde ves una pequeña cabaña abandonada.',
    imageUrl: '/src/img/300-El Silencio del Bosque.png',
    choices: [
      { text: 'Entrar a la cabaña y buscar refugio.', nextStepId: 301 },
      { text: 'Ignorar la cabaña y seguir el sendero.', nextStepId: 400 },
    ],
  },
  {
    id: 301,
    title: 'La Cabaña Trampa',
    storyText:
      'La cabaña está vacía, excepto por un cofre de madera. ' +
      'Justo cuando te acercas, el techo se derrumba sobre ti.',
    imageUrl: '/src/img/301-La Cabaña Trampa.png',
    choices: [
      {
        text: '¡FIN DE LA AVENTURA! (Te quedas atrapado)',
        nextStepId: 999,
      },
    ],
  },
  {
    id: 400,
    title: 'Las Ruinas del Mapa',
    storyText:
      'Llegas a las ruinas. Siguiendo tu instinto (o el recuerdo de la poción), ' +
      'encuentras el mapa. ¡FELICITACIONES, has encontrado el camino de vuelta a casa!',
    imageUrl: '/src/img/400-Las Ruinas del Mapa.png',
    choices: [
      { text: '¡FIN DE LA AVENTURA! (Victoria)', nextStepId: 999 },
    ],
  },
  {
    id: 999,
    title: 'FIN DEL JUEGO',
    storyText: 'Gracias por jugar. Puedes cargar un punto de control o empezar de nuevo.',
    imageUrl: '/src/img/999-FIN DEL JUEGO.png',
    choices: [
      { text: 'Reiniciar la aventura', nextStepId: 100 },
    ],
  },
];
