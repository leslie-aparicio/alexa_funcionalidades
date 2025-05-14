const Alexa = require('ask-sdk-core');

const PreguntaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
               Alexa.getIntentName(handlerInput.requestEnvelope) === 'PreguntaIntent';
    },
    handle(handlerInput) {
        const slot = Alexa.getSlot(handlerInput.requestEnvelope, 'pregunta');
        const spokenWords = slot && slot.value ? slot.value.toLowerCase() : '';

        let respuesta = '';

        // Lógica simple y flexible con includes()
        if (spokenWords.includes('quien') && spokenWords.includes('creó')) {
            respuesta = 'Esta skill fue creada por Leslie Aparicio.';
        } else if (spokenWords.includes('carrera')) {
            respuesta = 'Estudia Ingeniería en Desarrollo y Gestión de Software.';
        } else if (spokenWords.includes('color')) {
            respuesta = 'Su color favorito es el rosa.';
        } else if (spokenWords.includes('grupo') || spokenWords.includes('cantante')) {
            respuesta = 'Ella no tiene un favorito, pero ama a Spiderman.';
        } else {
            respuesta = 'No entendí bien tu pregunta. Puedes decir: ¿Quién creó esta skill?, ¿Qué carrera estudia?, ¿Cuál es su color favorito?, o ¿Cuál es su grupo favorito?';
        }

        return handlerInput.responseBuilder
            .speak(respuesta)
            .reprompt('¿Quieres saber otra cosa?')
            .getResponse();
    }
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Hola, puedes preguntarme quién creó esta skill, qué carrera estudia, su color o grupo favorito.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
               Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'Puedes preguntarme quién creó esta skill, qué carrera estudia, su color o grupo favorito.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
              (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent' ||
               Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('Adiós')
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
               Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speechText = 'Lo siento, no entendí eso. Pregunta por el creador, carrera, color o grupo favorito.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.error(`Error manejado: ${error.message}`);
        return handlerInput.responseBuilder
            .speak('Lo siento, hubo un problema. Intenta de nuevo.')
            .reprompt('Intenta de nuevo.')
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        PreguntaIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
