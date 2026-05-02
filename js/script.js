// Efeito de digitação para a palavra animada
const palavras = ["automatizada", "personalizada", "generativa"];
let contPalavra = 0;
let contLetra = 0;
let apagando = false;
const intervalo = 100;
const delayEntrePalavras = 1500;

function typeWriter() {
    const span = document.querySelector(".palavra-animada");
    if (!span) return;
    
    const palavraAtual = palavras[contPalavra];
    
    if (!apagando) {
        span.textContent = palavraAtual.substring(0, contLetra + 1);
        contLetra++;
        
        if (contLetra === palavraAtual.length) {
            apagando = true;
            setTimeout(typeWriter, delayEntrePalavras);
            return;
        }
    } else {
        span.textContent = palavraAtual.substring(0, contLetra - 1);
        contLetra--;
        
        if (contLetra === 0) {
            apagando = false;
            contPalavra = (contPalavra + 1) % palavras.length;
        }
    }
    
    setTimeout(typeWriter, intervalo);
}


// Menu mobile
function toggleMenu() {
    const menuMobile = document.getElementById('menu-toggle');
    const menu = document.querySelector('.menu');
    menuMobile.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}
// Carousel de cases


// FAQ Acordeão
function toggleFaq(item) {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (item.classList.contains('active')) {
        item.classList.remove('active');
    } else {
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        item.classList.add('active');
    }
}

// Chat popup
function toggleChat() {
    const chatPopup = document.getElementById('chat-popup');
    if (chatPopup.style.display === 'flex') {
        chatPopup.style.display = 'none';
    } else {
        chatPopup.style.display = 'flex';
        document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
    }
}

function sendChatMessage() {
    const input = document.querySelector('#chat-input input');
    const message = input.value.trim();
    
    if (message) {
        const chatMessages = document.getElementById('chat-messages');
        
        // Adiciona mensagem do usuário
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message user';
        userMessage.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(userMessage);
        
        // Limpa o input
        input.value = '';
        
        // Simula resposta da IA após um pequeno delay
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'chat-message bot';
            botMessage.innerHTML = `<p>Obrigado por sua mensagem! Um de nossos especialistas entrará em contato em breve.</p>`;
            chatMessages.appendChild(botMessage);
            
            // Rola para a última mensagem
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
        
        // Rola para a última mensagem
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Modal de vídeo
function openVideoModal(videoId) {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('modal-video');

    // Defina o link do vídeo conforme o ID
    let videoUrl = '';
    if (videoId === 'video1') {
        videoUrl = 'https://www.youtube.com/embed/SEU_VIDEO_1_ID?autoplay=1';
    } else if (videoId === 'video2') {
        videoUrl = 'https://www.youtube.com/embed/SEU_VIDEO_2_ID?autoplay=1';
    } else if (videoId === 'video3') {
        videoUrl = 'https://youtu.be/alxWJEMKQok/embed/SEU_VIDEO_3_ID?autoplay=1';
    }

    iframe.src = videoUrl;
    modal.style.display = 'flex';
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('modal-video');
    
    modal.style.display = 'none';
    iframe.src = ''; // Limpa o src para parar o vídeo
}

// Validação de formulário
function validateForm(e) {
    e.preventDefault();
    
    const nome = document.querySelector('input[name="nome"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    
    if (!nome) {
        alert('Por favor, preencha o campo Nome.');
        return;
    }
    
    if (!email || !email.match(/^\S+@\S+\.\S+$/)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }
    
    // Mostra mensagem de sucesso
    alert('Obrigado pela sua mensagem! Entraremos em contato em breve.');
    
    // Limpa o formulário
    document.getElementById('contato-form').reset();
}

// Efeito de fade-in ao scroll
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.section-fade-in');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight * 0.8;
        
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
}

// Criação de confete
function createConfetti() {
    const container = document.getElementById('confetti-container');
    const numConfetti = 100;

    for (let i = 0; i < numConfetti; i++) {
        const confetti = document.createElement('span');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 5}s`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
        container.appendChild(confetti);

        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicia a animação de digitação
    typeWriter();
    
    // Menu mobile
    const menuMobile = document.getElementById('menu-toggle');
    if (menuMobile) {
        menuMobile.addEventListener('click', toggleMenu);
    }
    

    
    // FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const pergunta = item.querySelector('.faq-pergunta');
        if (pergunta) {
            pergunta.addEventListener('click', () => toggleFaq(item));
        }
    });
    
    // Chat
    const chatIcon = document.getElementById('chat-icon');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.querySelector('#chat-input button');
    const chatInputField = document.querySelector('#chat-input input');
    
    if (chatIcon) {
        chatIcon.addEventListener('click', toggleChat);
    }
    
    if (closeChat) {
        closeChat.addEventListener('click', toggleChat);
    }
    
    if (chatInput) {
        chatInput.addEventListener('click', sendChatMessage);
    }
    
    if (chatInputField) {
        chatInputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    
    // Modal de vídeo
    const videoButtons = document.querySelectorAll('.play-video');
    const closeModal = document.querySelector('.close-modal');
    
    videoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const videoId = button.getAttribute('data-video');
            openVideoModal(videoId);
        });
    });
    
    if (closeModal) {
        closeModal.addEventListener('click', closeVideoModal);
    }
    
    // Formulário de contato
    const form = document.getElementById('contato-form');
    if (form) {
        form.addEventListener('submit', validateForm);
    }
    
    // Animação de scroll
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation(); // Verifica elementos visíveis no carregamento inicial
    
    // Adiciona classe section-fade-in a elementos que devem ter animação
    const animatedSections = document.querySelectorAll('section:not(.hero)');
    animatedSections.forEach(section => {
        section.classList.add('section-fade-in');
    });
    
    // Scroll suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const targetId = this.getAttribute('href');
                    if (targetId.length > 1 && document.querySelector(targetId)) {
                        e.preventDefault();
                        const header = document.getElementById('header');
                        const headerHeight = header ? header.offsetHeight : 0;
                        const targetElement = document.querySelector(targetId);
                        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                        window.scrollTo({
                            top: elementPosition - headerHeight,
                            behavior: 'smooth'
                        });
                    }
                });
            });            const targetId = this.getAttribute('href');
            if (targetId.length > 1 && document.querySelector(targetId)) {
                e.preventDefault();
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetElement = document.querySelector(targetId);
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: elementPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            const menuMobile = document.getElementById('menu-toggle');
            const menu = document.querySelector('.menu');
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
                menuMobile.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    const button = document.querySelector('.btn-primary');
    button.addEventListener('click', createConfetti);

    // Custom Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .btn, .faq-pergunta, #chat-icon, .carousel-btn, .menu-mobile, .stacked-card, .btn-play');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
            cursor.style.backgroundColor = 'white';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'white';
        });
    });

    // Scroll Progress for stacked-cards
    const stackedCards = document.querySelector('.stacked-cards');
    const progressBar = document.querySelector('.scroll-progress-bar');

    if (stackedCards && progressBar) {
        stackedCards.addEventListener('scroll', () => {
            const scrollLeft = stackedCards.scrollLeft;
            const scrollWidth = stackedCards.scrollWidth - stackedCards.clientWidth;
            const progress = (scrollLeft / scrollWidth) * 100;
            progressBar.style.width = progress + '%';
        });
    }
});

window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 10) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});
