// Script principal del portafolio
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portafolio de María González cargado exitosamente! 🎨');
    
    // Inicializar todas las funcionalidades
    initNavigation();
    initFormHandling();
    initScrollEffects();
    initAnimations();
    initDynamicContent();
    initInteractiveEffects();
});

// Navegación suave entre secciones
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Agregar efecto de resaltado temporal
                targetSection.style.animation = 'none';
                setTimeout(() => {
                    targetSection.style.animation = 'fadeInUp 0.6s ease';
                }, 10);
            }
        });
    });
}

// Manejo del formulario de contacto
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(this);
        const nombre = formData.get('nombre').trim();
        const email = formData.get('email').trim();
        const mensaje = formData.get('mensaje').trim();
        
        // Validación básica
        if (!nombre || !email || !mensaje) {
            showNotification('Por favor, completa todos los campos.', 'error');
            return;
        }
        
        // Validación de email CORREGIDA
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Por favor, ingresa un email válido.', 'error');
            return;
        }
        
        // Simular envío exitoso
        showNotification('¡Gracias ' + nombre + '! Tu mensaje ha sido enviado. Te contactaré pronto.', 'success');
        
        // Limpiar formulario con animación
        const inputs = this.querySelectorAll('.form-input, .form-textarea');
        inputs.forEach(input => {
            input.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                input.value = '';
                input.style.animation = 'fadeInUp 0.3s ease';
            }, 300);
        });
    });
    
    // Validación en tiempo real
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Remover clase de error mientras el usuario escribe
            this.classList.remove('error');
        });
    });
}

// Validar campo individual
function validateField(field) {
    const value = field.value.trim();
    
    if (!value) {
        field.classList.add('error');
        return false;
    }
    
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('error');
            return false;
        }
    }
    
    field.classList.remove('error');
    return true;
}

// Mostrar notificaciones CORREGIDA
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    notification.textContent = message;
    
    // Estilos de la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: 'bold',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)'
    });
    
    // Color según tipo CORREGIDO
    if (type === 'success') {
        notification.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
    } else {
        notification.style.background = 'linear-gradient(45deg, #dc3545, #e74c3c)';
    }
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Efectos de scroll
function initScrollEffects() {
    window.addEventListener('scroll', function() {
        updateHeaderOnScroll();
        updateScrollProgress();
    });
    
    // Animación de elementos al aparecer en viewport
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos animables
    const animateElements = document.querySelectorAll('.animate-on-scroll, .project-card, .skill-item');
    animateElements.forEach(el => observer.observe(el));
}

// Actualizar header en scroll
function updateHeaderOnScroll() {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Actualizar barra de progreso de scroll
function updateScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    
    progressBar.style.width = scrolled + '%';
}

// Inicializar animaciones
function initAnimations() {
    // Animación del texto del hero
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        const text = heroText.textContent;
        heroText.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = index * 0.05 + 's';
            span.className = 'char-animate';
            heroText.appendChild(span);
        });
    }
    
    // Animación de las barras de habilidades
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.dataset.progress || '0';
                entry.target.style.width = progress + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
}

// Contenido dinámico
function initDynamicContent() {
    // Contador animado
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    // Actualizar año actual
    const currentYearElements = document.querySelectorAll('.current-year');
    currentYearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });
}

// Animar contador
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Efectos interactivos
function initInteractiveEffects() {
    // Efecto paralaje
    window.addEventListener('scroll', () => {
        const parallaxElements = document.querySelectorAll('.parallax');
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = 'translateY(' + rate + 'px)';
        });
    });
    
    // Efecto hover en tarjetas de proyecto
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}