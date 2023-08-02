class NaiveBayesClassifier {
    constructor() {
      this.classes = {}; // Almacena las probabilidades de cada clase
      this.wordCounts = {}; // Almacena las frecuencias de palabras para cada clase
      this.vocab = new Set(); // Almacena el vocabulario único de todas las palabras
      this.totalDocs = 0; // Contador de documentos en el conjunto de entrenamiento
    }

// Función para agregar un ejemplo con su etiqueta al clasificador
    addExample(example, label) {
        if (!this.classes[label]) {
        this.classes[label] = 1;
        } else {
        this.classes[label]++;
        }

        if (!this.wordCounts[label]) {
        this.wordCounts[label] = {};
        }

        example.split(' ').forEach(word => {
        this.vocab.add(word);
        if (!this.wordCounts[label][word]) {
            this.wordCounts[label][word] = 1;
        } else {
            this.wordCounts[label][word]++;
        }
        });

        this.totalDocs++;
    }

// Función para clasificar un nuevo ejemplo y devolver la clase más probable
    classify(example) {

        const words = example.toLowerCase().split(' ');

        let maxProb = -Infinity;
        let bestClass = null;

        Object.keys(this.classes).forEach(label => {
        const classProb = this.classes[label] / this.totalDocs;

        let logProb = Math.log(classProb);

        words.forEach(word => {
            console.log(this.wordCounts[label][word])
            const wordProb = (this.wordCounts[label][word] || 0.1) / this.totalDocs;
            logProb += Math.log(wordProb);
        });

        if (logProb > maxProb) {
            maxProb = logProb;
            bestClass = label;
        }
        });
        console.log(this.totalDocs);
        return bestClass;
    }
}

// Ejemplo de uso
const classifier = new NaiveBayesClassifier();

// Datos de entrenamiento
classifier.addExample('Me encantó este producto', 'positivo');
classifier.addExample('No puedo creer lo malo que es este servicio', 'negativo');
classifier.addExample('El artículo es perfecto para mis necesidades', 'positivo');
classifier.addExample('No lo recomendaría a nadie', 'negativo');
classifier.addExample('¡Excelente atención al cliente!', 'positivo');
classifier.addExample('Pésima calidad del producto', 'negativo');
classifier.addExample('El equipo de soporte fue muy útil', 'positivo');
classifier.addExample('El envío llegó tarde y en mal estado', 'negativo');
classifier.addExample('Me sorprendió lo bien que funciona este producto', 'positivo');
classifier.addExample('La peor experiencia de compra de mi vida', 'negativo');
classifier.addExample('Este libro es increíble', 'positivo');
classifier.addExample('No entiendo por qué a la gente le gusta tanto esta película', 'negativo');
classifier.addExample('El servicio al cliente es excelente', 'positivo');
classifier.addExample('No volveré a comprar aquí', 'negativo');
classifier.addExample('Me siento muy satisfecho con mi compra', 'positivo');
classifier.addExample('El producto llegó dañado y nadie responde por ello', 'negativo');
classifier.addExample('Este restaurante es mi favorito', 'positivo');
classifier.addExample('No recomiendo este producto en absoluto', 'negativo');
classifier.addExample('El servicio de entrega es rápido y confiable', 'positivo');
classifier.addExample('Definitivamente no vale la pena el precio', 'negativo');
classifier.addExample('La calidad del producto superó mis expectativas', 'positivo');
classifier.addExample('No recibí el producto que ordené', 'negativo');
classifier.addExample('Me encanta la nueva actualización del software', 'positivo');
classifier.addExample('La aplicación se bloquea constantemente, es muy frustrante', 'negativo');
classifier.addExample('El equipo de soporte fue muy amable y servicial', 'positivo');
classifier.addExample('La experiencia de usuario es terrible', 'negativo');
classifier.addExample('Estoy muy contento con mi compra', 'positivo');
classifier.addExample('El producto se rompió después de un solo uso', 'negativo');
classifier.addExample('Este lugar es asombroso', 'positivo');
classifier.addExample('No cumplió con mis expectativas', 'negativo');
classifier.addExample('El diseño del sitio web es intuitivo y fácil de usar', 'positivo');
classifier.addExample('No volveré a comprar aquí, el servicio al cliente es inexistente', 'negativo');
classifier.addExample('Me impresionó la calidad de los materiales', 'positivo');
classifier.addExample('No funcionó como se suponía', 'negativo');
classifier.addExample('El servicio de envío fue rápido y confiable', 'positivo');
classifier.addExample('Es una pérdida de dinero', 'negativo');
classifier.addExample('Recomendaría este producto a mis amigos', 'positivo');
classifier.addExample('La atención al cliente fue una pesadilla', 'negativo');
classifier.addExample('Estoy muy satisfecho con mi compra', 'positivo');
classifier.addExample('El producto llegó roto y nadie responde por ello', 'negativo');
classifier.addExample('Este restaurante es excelente', 'positivo');
classifier.addExample('No lo recomiendo en absoluto', 'negativo');
classifier.addExample('El servicio de entrega es rápido y eficiente', 'positivo');
classifier.addExample('No vale la pena el precio que pagué', 'negativo');
classifier.addExample('Estoy muy feliz con mi compra', 'positivo');
classifier.addExample('El producto no cumplió con lo prometido', 'negativo');
classifier.addExample('El personal del hotel fue muy amable y atento', 'positivo');
classifier.addExample('La calidad del producto es mala', 'negativo');
classifier.addExample('Recomiendo encarecidamente este producto', 'positivo');
classifier.addExample('La experiencia del cliente fue decepcionante', 'negativo');
classifier.addExample('Estoy muy contento con mi compra', 'positivo');
classifier.addExample('El producto no duró mucho tiempo', 'negativo');
classifier.addExample('Este comentario es neutral', 'neutro');
classifier.addExample('No tengo una opinión clara sobre este producto', 'neutro');
classifier.addExample('Este comentario es neutral', 'neutro');
classifier.addExample('El clima está agradable hoy', 'neutro');
classifier.addExample('El evento fue regular, ni bueno ni malo', 'neutro');
classifier.addExample('Este libro es promedio, no destaca en nada', 'neutro');
classifier.addExample('La comida del restaurante es aceptable', 'neutro');
classifier.addExample('El rendimiento del equipo es regular', 'neutro');
classifier.addExample('La película no me impresionó, pero tampoco fue mala', 'neutro');
classifier.addExample('El servicio fue normal, nada fuera de lo común', 'neutro');
classifier.addExample('No tengo una opinión clara sobre este producto', 'neutro');
classifier.addExample('El resultado del partido fue empate', 'neutro');
classifier.addExample('La calidad del servicio es estándar', 'neutro');
classifier.addExample('No tengo una preferencia particular', 'neutro');
classifier.addExample('La presentación del producto es común', 'neutro');
classifier.addExample('La experiencia fue regular', 'neutro');
classifier.addExample('El precio es razonable para lo que ofrece', 'neutro');
classifier.addExample('¡Me encanta este lugar!', 'positivo');
classifier.addExample('El servicio al cliente es excelente', 'positivo');
classifier.addExample('El equipo de soporte fue muy amable y servicial', 'positivo');
classifier.addExample('Estoy muy satisfecho con mi compra', 'positivo');
classifier.addExample('Me sorprendió lo bien que funciona este producto', 'positivo');
classifier.addExample('Recomendaría este restaurante a todos', 'positivo');
classifier.addExample('El envío fue rápido y el producto llegó en perfectas condiciones', 'positivo');
classifier.addExample('El personal del hotel fue muy atento durante toda mi estadía', 'positivo');
classifier.addExample('Me gustó mucho la última película que vi', 'positivo');
classifier.addExample('La calidad del producto es excepcional', 'positivo');
classifier.addExample('La comida de este restaurante es deliciosa', 'positivo');
classifier.addExample('El nuevo diseño del sitio web es increíble', 'positivo');
classifier.addExample('El servicio de entrega es confiable y puntual', 'positivo');
classifier.addExample('Estoy muy feliz con los resultados obtenidos', 'positivo');
classifier.addExample('El producto cumple con todas mis expectativas', 'positivo');
classifier.addExample('El personal del evento fue muy atento y profesional', 'positivo');
classifier.addExample('Este libro es fascinante y no puedo dejar de leerlo', 'positivo');
classifier.addExample('El rendimiento del equipo ha sido impresionante', 'positivo');
classifier.addExample('El servicio de atención al cliente fue rápido y efectivo', 'positivo');
classifier.addExample('Me encanta cómo se ve mi nueva habitación', 'positivo');

// Ejemplos neutros
classifier.addExample('No tengo una opinión clara sobre este producto', 'neutro');
classifier.addExample('El clima está agradable hoy', 'neutro');
classifier.addExample('El evento fue regular, ni bueno ni malo', 'neutro');
classifier.addExample('El precio es razonable para lo que ofrece', 'neutro');
classifier.addExample('La presentación del producto es común', 'neutro');
classifier.addExample('La experiencia fue regular', 'neutro');
classifier.addExample('No tengo una preferencia particular', 'neutro');
classifier.addExample('El resultado del partido fue empate', 'neutro');
classifier.addExample('La calidad del servicio es estándar', 'neutro');
classifier.addExample('No tengo una opinión clara sobre este restaurante', 'neutro');
classifier.addExample('El diseño del producto es normal', 'neutro');
classifier.addExample('No me siento ni satisfecho ni insatisfecho', 'neutro');
classifier.addExample('El desempeño del equipo es promedio', 'neutro');
classifier.addExample('La atención del personal fue regular', 'neutro');
classifier.addExample('No tengo una preferencia entre estas opciones', 'neutro');
classifier.addExample('El servicio de entrega fue normal', 'neutro');
classifier.addExample('La película no me impactó mucho', 'neutro');
classifier.addExample('El sabor del platillo es decente', 'neutro');
classifier.addExample('El nivel de ruido en el lugar es regular', 'neutro');

// Ejemplos negativos
classifier.addExample('No me gustó la comida de este restaurante', 'negativo');
classifier.addExample('El servicio al cliente fue pésimo', 'negativo');
classifier.addExample('El equipo de soporte no respondió a mis problemas', 'negativo');
classifier.addExample('Estoy muy insatisfecho con la compra que hice', 'negativo');
classifier.addExample('El producto no funcionó como se esperaba', 'negativo');
classifier.addExample('No recomendaría este lugar a nadie', 'negativo');
classifier.addExample('El envío llegó tarde y dañado', 'negativo');
classifier.addExample('El personal del hotel fue grosero y poco atento', 'negativo');
classifier.addExample('Odié la última película que vi', 'negativo');
classifier.addExample('La calidad del producto es mala y se rompió rápidamente', 'negativo');
classifier.addExample('El servicio de entrega fue terrible, nunca llegó mi pedido', 'negativo');
classifier.addExample('Me siento frustrado con los resultados obtenidos', 'negativo');
classifier.addExample('El producto no cumplió con lo prometido', 'negativo');
classifier.addExample('El personal del evento fue incompetente', 'negativo');
classifier.addExample('Este libro es aburrido y no me gusta', 'negativo');
classifier.addExample('El rendimiento del equipo ha sido decepcionante', 'negativo');
classifier.addExample('El servicio de atención al cliente fue lento y poco útil', 'negativo');
classifier.addExample('Detesto cómo se ve mi nueva habitación', 'negativo');
classifier.addExample('El platillo que pedí en este restaurante estaba mal preparado', 'negativo');
classifier.addExample('El lugar es muy ruidoso y no se puede disfrutar', 'negativo');

classifier.addExample('El pedido fue facil, nos dieron una hora de entrega pero llego antes y ademas habia un jovencito niño ENTANTADOR Y BIEN EDUCADO PARA ENTREGARLO', 'positivo');
classifier.addExample('El nuevo diseño del sitio web es increíble', 'negativo');

classifier.addExample('Excelente restaurante, la comida es deliciosa y el servicio es inmejorable', 'positivo');
classifier.addExample('La atención en esta farmacia siempre es amable y rápida', 'positivo');
classifier.addExample('Me encanta comprar en esta tienda, siempre tienen productos de alta calidad', 'positivo');
classifier.addExample('El gimnasio cuenta con excelentes instalaciones y personal capacitado', 'positivo');
classifier.addExample('Este hotel es simplemente increíble, la habitación es espaciosa y cómoda', 'positivo');
classifier.addExample('La tienda de electrónicos tiene una gran variedad de productos y precios competitivos', 'positivo');
classifier.addExample('El personal de la peluquería es muy profesional y siempre hacen un gran trabajo', 'positivo');
classifier.addExample('El parque es perfecto para disfrutar de un día al aire libre en familia', 'positivo');
classifier.addExample('El cine cuenta con pantallas de alta calidad y un sonido impresionante', 'positivo');
classifier.addExample('La librería tiene un ambiente acogedor y una gran selección de libros', 'positivo');
classifier.addExample('Esta tienda de ropa siempre tiene las últimas tendencias de moda', 'positivo');
classifier.addExample('El centro comercial ofrece muchas opciones de entretenimiento para todas las edades', 'positivo');
classifier.addExample('El museo tiene una colección fascinante y exhibiciones interesantes', 'positivo');
classifier.addExample('El personal de la clínica es muy atento y brinda un excelente cuidado', 'positivo');
classifier.addExample('Este café es mi lugar favorito para relajarme y tomar un buen café', 'positivo');
classifier.addExample('El supermercado tiene productos frescos y una gran variedad de alimentos', 'positivo');
classifier.addExample('La ferretería tiene todo lo que necesito para mis proyectos de bricolaje', 'positivo');
classifier.addExample('El teatro ofrece espectáculos de alta calidad que siempre son impresionantes', 'positivo');
classifier.addExample('La gasolinera tiene precios competitivos y un buen servicio', 'positivo');
classifier.addExample('Este spa es el lugar perfecto para consentirse y relajarse', 'positivo');

// Ejemplos neutros
classifier.addExample('La comida en este restaurante es decente, ni buena ni mala', 'neutro');
classifier.addExample('La farmacia tiene los productos básicos que necesito', 'neutro');
classifier.addExample('La tienda de electrónicos es bastante grande, pero los precios son normales', 'neutro');
classifier.addExample('El gimnasio tiene buenas instalaciones, pero el horario es un poco limitado', 'neutro');
classifier.addExample('El hotel es cómodo, pero nada especial', 'neutro');
classifier.addExample('La tienda de ropa tiene una selección promedio de productos', 'neutro');
classifier.addExample('El parque es un lugar agradable para pasar el tiempo', 'neutro');
classifier.addExample('El cine es una opción común para el entretenimiento', 'neutro');
classifier.addExample('La librería tiene libros interesantes, pero no siempre encuentro lo que busco', 'neutro');
classifier.addExample('La tienda de deportes tiene variedad, pero los precios son un poco altos', 'neutro');
classifier.addExample('El centro comercial es grande y tiene muchas tiendas', 'neutro');
classifier.addExample('El museo tiene algunas exhibiciones interesantes, pero no es muy grande', 'neutro');
classifier.addExample('La clínica tiene un buen equipo médico, pero a veces hay que esperar mucho', 'neutro');
classifier.addExample('Este café tiene un ambiente agradable, pero el café es regular', 'neutro');
classifier.addExample('El supermercado tiene precios normales y una selección típica de productos', 'neutro');
classifier.addExample('La ferretería tiene todo lo básico para proyectos de bricolaje', 'neutro');
classifier.addExample('El teatro tiene una programación variada, pero no siempre hay espectáculos interesantes', 'neutro');
classifier.addExample('La gasolinera tiene precios regulares', 'neutro');
classifier.addExample('Este spa ofrece servicios estándar', 'neutro');

// Ejemplos negativos
classifier.addExample('No volvería a este restaurante, la comida fue decepcionante y el servicio fue malo', 'negativo');
classifier.addExample('La atención en esta farmacia es lenta y poco amable', 'negativo');
classifier.addExample('La tienda siempre tiene problemas de stock y nunca encuentro lo que busco', 'negativo');
classifier.addExample('El gimnasio siempre está abarrotado y las instalaciones están descuidadas', 'negativo');
classifier.addExample('El hotel tiene habitaciones pequeñas y el personal no es muy servicial', 'negativo');
classifier.addExample('La tienda de electrónicos tiene precios excesivamente altos', 'negativo');
classifier.addExample('El personal de la peluquería cometió muchos errores en mi corte de cabello', 'negativo');
classifier.addExample('El parque está descuidado y no es seguro', 'negativo');
classifier.addExample('El cine es caro y las salas no son cómodas', 'negativo');
classifier.addExample('La librería tiene un catálogo muy limitado y no tienen los libros que quiero', 'negativo');
classifier.addExample('Esta tienda de ropa tiene productos de baja calidad', 'negativo');
classifier.addExample('El centro comercial siempre está lleno de gente y es difícil encontrar estacionamiento', 'negativo');
classifier.addExample('El museo tiene una mala organización y no es interesante', 'negativo');
classifier.addExample('El personal de la clínica fue incompetente y poco atento', 'negativo');
classifier.addExample('El café tiene precios excesivos y el servicio es lento', 'negativo');
classifier.addExample('El supermercado tiene productos vencidos y en mal estado', 'negativo');
classifier.addExample('La ferretería tiene una selección limitada de herramientas', 'negativo');
classifier.addExample('El teatro tiene un sonido deficiente y las butacas son incómodas', 'negativo');
classifier.addExample('La gasolinera tiene precios muy altos', 'negativo');
classifier.addExample('Este spa es muy caro para la calidad del servicio que ofrece', 'negativo');

// Clasificar nuevos ejemplos
const newComment = 'La tienda de deportes tiene variedad, pero los precios son un poco altos';
const result = classifier.classify(newComment);
console.log(newComment);
console.log('Sentimiento:', result); 