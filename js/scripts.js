// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    setupSmoothScrolling();
    setupNavigationHighlight();
    setupScrollAnimations();
    setupFormHandling();
    setupTypingAnimation();
    setupImageOptimization();
    setupMobileMenu();
    setupProjectFilters();
    setupThemeToggle();
}

// ===== NAVEGACIÓN SUAVE =====
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                closeMobileMenu();
            }
        });
    });
}

// ===== RESALTADO DE NAVEGACIÓN ACTIVA =====
function setupNavigationHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', function() {
        let currentSection = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
        
        // Efecto de header al hacer scroll
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 25px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// ===== ANIMACIONES DE SCROLL =====
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animaciones específicas para diferentes elementos
                if (entry.target.classList.contains('skill-item')) {
                    animateSkillBars();
                }
                
                if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    const elementsToAnimate = document.querySelectorAll(
        '.about-text, .skill-item, .project-card, .contact-info, .contact-form'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// ===== ANIMACIÓN DE BARRAS DE HABILIDADES =====
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateX(0)';
            item.style.opacity = '1';
        }, index * 200);
    });
}

// ===== ANIMACIÓN DE TARJETAS DE PROYECTO =====
function animateProjectCard(card) {
    card.style.transform = 'translateY(0)';
    card.style.opacity = '1';
    
    // Efecto de hover mejorado
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

// ===== ANIMACIÓN DE ESCRITURA =====
function setupTypingAnimation() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const texts = [
        'Diseñador Gráfico Apasionado',
        'Creativo Visual',
        'Especialista en Identidad',
        'Amante del Diseño'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';
    
    function typeWriter() {
        const fullText = texts[textIndex];
        
        if (isDeleting) {
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = fullText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        subtitle.textContent = currentText;
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === fullText.length) {
            typeSpeed = 2000; // Pausa al completar
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pausa antes de escribir nuevo texto
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // Iniciar animación después de un pequeño retraso
    setTimeout(typeWriter, 1000);
}

// ===== MANEJO DEL FORMULARIO =====
function setupFormHandling() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const button = form.querySelector('.form-button');
        const originalText = button.textContent;
        
        // Simulación de envío
        button.textContent = 'Enviando...';
        button.disabled = true;
        button.style.background = '#6c757d';
        
        // Validación simple
        const nombre = form.querySelector('#nombre').value.trim();
        const email = form.querySelector('#email').value.trim();
        const mensaje = form.querySelector('#mensaje').value.trim();
        
        if (!nombre || !email || !mensaje) {
            showNotification('Por favor, completa todos los campos', 'error');
            resetButton();
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Por favor, ingresa un email válido', 'error');
            resetButton();
            return;
        }
        
        // Simular envío exitoso
        setTimeout(() => {
            showNotification('¡Mensaje enviado exitosamente! Te contactaré pronto.', 'success');
            form.reset();
            resetButton();
        }, 2000);
        
        function resetButton() {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = '';
        }
    });
    
    // Validación en tiempo real
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    
    if (!value) {
        field.classList.add('error');
        return false;
    }
    
    if (field.type === 'email' && !isValidEmail(value)) {
        field.classList.add('error');
        return false;
    }
    
    field.classList.remove('error');
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== SISTEMA DE NOTIFICACIONES =====
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Estilos CSS dinámicos
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease',
        maxWidth: '400px',
        boxShadow: '0 5px 20px rgba(0,0,0,0.2)'
    });
    
    // Colores según tipo
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#17a2b8',
        warning: '#ffc107'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Configurar cierre
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        margin-left: 10px;
        cursor: pointer;
        padding: 0;
    `;
    
    function closeNotification() {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeNotification);
    
    // Auto-cerrar después de 5 segundos
    setTimeout(closeNotification, 5000);
}

// ===== OPTIMIZACIÓN DE IMÁGENES =====
function setupImageOptimization() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Lazy loading manual para navegadores que no lo soporten
        if ('loading' in HTMLImageElement.prototype) {
            img.loading = 'lazy';
        } else {
            // Implementación manual de lazy loading
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            img.classList.add('lazy');
            imageObserver.observe(img);
        }
        
        // Efecto de carga
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.filter = 'blur(0)';
        });
        
        // Error handling
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
        });
    });
}

// ===== MENÚ MÓVIL =====
function setupMobileMenu() {
    // Crear botón de menú hamburguesa
    const nav = document.querySelector('.nav');
    const navMenu = document.querySelector('.nav-menu');
    
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #333;
    `;
    
    nav.appendChild(menuToggle);
    
    // Funcionalidad del menú
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
    });
    
    // Cerrar menú al hacer click en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Estilos responsivos dinámicos
    function updateMobileStyles() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
            navMenu.style.cssText = `
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: rgba(255, 255, 255, 0.98);
                flex-direction: column;
                padding: 1rem;
                box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                transform: translateY(-20px);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            `;
        } else {
            menuToggle.style.display = 'none';
            navMenu.style.cssText = '';
            navMenu.classList.remove('active');
        }
    }
    
    window.addEventListener('resize', updateMobileStyles);
    updateMobileStyles();
}

function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (menuToggle) {
            menuToggle.innerHTML = '☰';
        }
    }
}

// ===== FILTROS DE PROYECTOS =====
function setupProjectFilters() {
    const projectsSection = document.querySelector('.projects');
    if (!projectsSection) return;
    
    // Crear filtros
    const filterContainer = document.createElement('div');
    filterContainer.className = 'project-filters';
    filterContainer.style.cssText = `
        text-align: center;
        margin-bottom: 2rem;
    `;
    
    const filters = ['Todos', 'Logos', 'Redes Sociales', 'Editorial'];
    
    filters.forEach(filter => {
        const button = document.createElement('button');
        button.textContent = filter;
        button.className = 'filter-btn';
        button.dataset.filter = filter.toLowerCase().replace(' ', '-');
        
        button.style.cssText = `
            background: transparent;
            border: 2px solid #667eea;
            color: #667eea;
            padding: 8px 16px;
            margin: 0 5px;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
        `;
        
        if (filter === 'Todos') {
            button.classList.add('active');
            button.style.background = '#667eea';
            button.style.color = 'white';
        }
        
        button.addEventListener('click', function() {
            // Actualizar botones activos
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                btn.style.background = 'transparent';
                btn.style.color = '#667eea';
            });
            
            this.classList.add('active');
            this.style.background = '#667eea';
            this.style.color = 'white';
            
            // Filtrar proyectos
            filterProjects(this.dataset.filter);
        });
        
        filterContainer.appendChild(button);
    });
    
    const projectsGrid = document.querySelector('.projects-grid');
    projectsSection.insertBefore(filterContainer, projectsGrid);
}

function filterProjects(filter) {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        project.style.transition = 'all 0.3s ease';
        
        if (filter === 'todos') {
            project.style.display = 'block';
            project.style.opacity = '1';
            project.style.transform = 'scale(1)';
        } else {
            // Lógica simple de filtrado basada en título o contenido
            const title = project.querySelector('.project-title').textContent.toLowerCase();
            const shouldShow = title.includes(filter) || 
                              title.includes('logo') && filter === 'logos' ||
                              title.includes('redes') && filter === 'redes-sociales' ||
                              title.includes('flyer') && filter === 'editorial';
            
            if (shouldShow) {
                project.style.display = 'block';
                project.style.opacity = '1';
                project.style.transform = 'scale(1)';
            } else {
                project.style.opacity = '0';
                project.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            }
        }
    });
}

// ===== MODO OSCURO (OPCIONAL) =====
function setupThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: #667eea;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        this.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    });
    
    document.body.appendChild(themeToggle);
}

// ===== UTILIDADES ADICIONALES =====

// Función para scroll suave hacia arriba
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Detectar cuando el usuario está inactivo
let inactivityTimer;
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        // Acción cuando el usuario está inactivo (ej: mostrar call-to-action)
        console.log('Usuario inactivo detectado');
    }, 30000); // 30 segundos
}

['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetInactivityTimer, true);
});

// Función para copiar email al clipboard
function copyEmailToClipboard() {
    const email = 'Gabo.design@gmail.com';
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => {
            showNotification('Email copiado al portapapeles', 'success');
        });
    } else {
        // Fallback para navegadores antiguos
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showNotification('Email copiado al portapapeles', 'success');
        } catch (err) {
            showNotification('No se pudo copiar el email', 'error');
        }
        
        document.body.removeChild(textArea);
    }
}

// Agregar funcionalidad de copia de email
document.addEventListener('DOMContentLoaded', function() {
    const emailElement = document.querySelector('.contact-item:first-child');
    if (emailElement) {
        emailElement.style.cursor = 'pointer';
        emailElement.title = 'Haz click para copiar';
        emailElement.addEventListener('click', copyEmailToClipboard);
    }
});

// Performance: Throttle para eventos de scroll
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Aplicar throttle a eventos de scroll pesados
window.addEventListener('scroll', throttle(function() {
    // Código de scroll optimizado
}, 16)); // ~60fps

console.log('🎨 Portafolio de Luis Gabriel cargado exitosamente!');