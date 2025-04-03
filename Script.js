const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const voiceButton = document.getElementById('voice-button');

// Base de respuestas aleatorias
const respuestas = {
    "hola": ["¡Hola! 😊", "¿Qué tal?", "¡Buenos días! ¿En qué puedo ayudarte?"],
    "qué es la ia": [
        "La IA es la simulación de inteligencia humana en máquinas.",
        "Son algoritmos que aprenden de datos, como ChatGPT.",
        "Tecnología que permite resolver problemas complejos."
    ],
    "cómo funciona": [
        "Este chatbot usa reglas programadas. ¡Como un árbol de decisiones!",
        "Compara tu pregunta con mis respuestas guardadas."
    ],
    "tecnologías usadas": [
        "HTML, CSS y JavaScript puro. ¡Sin APIs!",
        "Solo código frontend básico para simular IA."
    ],
    "gracias": ["¡De nada! 😊", "¡A ti por preguntar! ❤️"],
    "default": ["No entendí. Prueba con las sugerencias.", "Interesante, pero no tengo respuesta para eso."]
};

// Función para añadir mensajes al chat
function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Procesar input del usuario
function processInput() {
    const userMessage = userInput.value.trim().toLowerCase();
    if (userMessage) {
        addMessage("Tú", userInput.value);
        userInput.value = '';

        // Indicador de "escribiendo"
        const typingIndicator = document.createElement('div');
        typingIndicator.id = 'typing';
        typingIndicator.textContent = "Chatbot está pensando...";
        chatBox.appendChild(typingIndicator);

        setTimeout(() => {
            chatBox.removeChild(typingIndicator);
            let respuesta = respuestas.default[Math.floor(Math.random() * respuestas.default.length)];
            
            // Buscar coincidencia
            for (const [pregunta, respuestasPosibles] of Object.entries(respuestas)) {
                if (userMessage.includes(pregunta)) {
                    respuesta = respuestasPosibles[Math.floor(Math.random() * respuestasPosibles.length)];
                    break;
                }
            }
            addMessage("Chatbot", respuesta);
        }, 1500);
    }
}

// Eventos
sendButton.addEventListener('click', processInput);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') processInput();
});

// Botones de sugerencias
document.querySelectorAll('.suggestion-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        userInput.value = e.target.textContent;
        processInput();
    });
});

// Reconocimiento de voz (opcional)
voiceButton.addEventListener('click', () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'es-ES';
    
    recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript.toLowerCase();
        userInput.value = transcript;
        processInput();
    };
    
    recognition.start();
});