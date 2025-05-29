// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading');
    if (loader) {
        loader.style.display = 'none';
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Typing Animation for Hero Section
const heroTitle = document.querySelector('.hero-content h1');
const heroSubtitle = document.querySelector('.subtitle');

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    typeWriter(heroTitle, 'Dheeraj Yadav');
    setTimeout(() => {
        typeWriter(heroSubtitle, 'Full Stack Developer | AI Enthusiast | Cybersecurity Specialist', 50);
    }, 1000);
});

// Project Cards Hover Effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
});

// Skills Animation
const skillItems = document.querySelectorAll('.skill-items span');

skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.1)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// --- EmailJS Integration for Contact Form ---
(function() {
  emailjs.init('_3n7rexzgWDDWfR05');
})();

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.submit-btn');
        const btnIcon = submitBtn.querySelector('.btn-icon');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;

        // Set to sending state
        submitBtn.classList.remove('success', 'error');
        submitBtn.classList.add('sending');
        btnText.textContent = 'Sending...';
        btnIcon.className = 'fas fa-sync-alt btn-icon';
        submitBtn.disabled = true;

        emailjs.sendForm('service_9p092r2', 'template_rbzv0yj', this)
            .then(function(response) {
                submitBtn.classList.remove('sending');
                submitBtn.classList.add('success');
                btnText.textContent = 'Message Sent!';
                btnIcon.className = 'fas fa-check btn-icon';
                contactForm.reset();
                setTimeout(() => {
                    submitBtn.classList.remove('success');
                    btnText.textContent = originalText;
                    btnIcon.className = 'fas fa-paper-plane btn-icon';
                    submitBtn.disabled = false;
                }, 2500);
            }, function(error) {
                submitBtn.classList.remove('sending');
                submitBtn.classList.add('error');
                btnText.textContent = 'Something went wrong, try again';
                btnIcon.className = 'fas fa-times btn-icon';
                setTimeout(() => {
                    submitBtn.classList.remove('error');
                    btnText.textContent = originalText;
                    btnIcon.className = 'fas fa-paper-plane btn-icon';
                    submitBtn.disabled = false;
                }, 2500);
            });
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Add hover effect to social links
const socialLinks = document.querySelectorAll('.social-links a');

socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px) rotate(360deg)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) rotate(0)';
    });
});

// Theme Switching
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
if (savedTheme === 'dark') {
    themeToggle.checked = true;
    body.style.setProperty('--background-gradient', 'linear-gradient(135deg, #232946 0%, #181c2a 100%)');
} else {
    body.style.setProperty('--background-gradient', 'linear-gradient(135deg, #e0e7ff 0%, #fff 100%)');
}

// Theme toggle click handler
themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    // Animated background gradient
    if (newTheme === 'dark') {
        body.style.setProperty('--background-gradient', 'linear-gradient(135deg, #232946 0%, #181c2a 100%)');
    } else {
        body.style.setProperty('--background-gradient', 'linear-gradient(135deg, #e0e7ff 0%, #fff 100%)');
    }
    // Add ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'theme-ripple';
    themeToggle.parentElement.appendChild(ripple);
    setTimeout(() => {
        ripple.remove();
    }, 1000);
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .theme-ripple {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 0;
        height: 0;
        background: rgba(0, 224, 255, 0.18);
        border-radius: 50%;
        animation: ripple 1s ease-out;
        z-index: 10;
    }
    @keyframes ripple {
        0% {
            width: 0;
            height: 0;
            opacity: 0.5;
        }
        100% {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Enhanced animations for theme transition
document.querySelectorAll('section, .card, .navbar').forEach(element => {
    element.style.transition = 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease';
});

// --- AI Chatbot Floating ---
document.addEventListener('DOMContentLoaded', function() {
(function() {
    const chatbotFloating = document.querySelector('.ai-chatbot-floating');
    if (!chatbotFloating) return;

    const chatBtn = chatbotFloating.querySelector('.ai-chatbot-btn');
    const chatWindow = chatbotFloating.querySelector('.ai-chatbot-window');
    const closeBtn = chatbotFloating.querySelector('.ai-chatbot-close');
    const messagesArea = chatbotFloating.querySelector('.ai-chatbot-messages');

    // Map of section selectors and their friendly names
    const sectionMap = [
        { selector: '#about .about-text p', name: 'About' },
        { selector: '#skills .skill-category', name: 'Skills' },
        { selector: '#projects .project-card', name: 'Projects' },
        { selector: '#github .github-profile', name: 'GitHub' },
        { selector: '#certifications .certification-card', name: 'Certifications' },
        { selector: '#education .education-item', name: 'Education' },
        { selector: '#achievements .achievement-card', name: 'Achievements' },
        { selector: '#contact .contact-card', name: 'Contact' }
    ];

    function findRelevantContent(userMsg) {
        const msg = userMsg.toLowerCase();
        const msgWords = msg.split(/\s+/).filter(w => w.length > 2);
        let bestMatch = null;
        let bestScore = 0;

        for (const section of sectionMap) {
            const nodes = document.querySelectorAll(section.selector);
            nodes.forEach(node => {
                const text = node.innerText.trim();
                if (!text) return;
                let score = 0;
                msgWords.forEach(word => {
                    if (text.toLowerCase().includes(word)) score++;
                });
                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = text;
                }
            });
        }
        if (bestScore > 0 && bestMatch) {
            // Highlight keywords
            let answer = bestMatch;
            msgWords.forEach(word => {
                if (word.length > 2) {
                    answer = answer.replace(new RegExp(`(${word})`, 'gi'), '<mark>$1</mark>');
                }
            });
            return answer;
        }
        return null;
    }

    function getBasicDetails() {
        return `
<strong>Name:</strong> Dheeraj Yadav<br>
<strong>Profession:</strong> Full Stack Developer, AI Enthusiast, Cybersecurity Specialist<br>
<strong>Email:</strong> yaadavdheeraj8282@gmail.com<br>
<strong>Phone:</strong> 8879829346<br>
<strong>Certifications:</strong> 20+<br>
<strong>Achievements:</strong> 5+<br>
<strong>GitHub:</strong> <a href="https://github.com/dheerajyadav1712" target="_blank">dheerajyadav1712</a><br>
<strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/dheeraj-yadav-740a891a9" target="_blank">dheeraj-yadav-740a891a9</a>
        `;
    }

    function isBasicInfoQuestion(msg) {
        return /\b(you|yourself|about|profile|details|info|who are you|who r u|introduction|summary)\b/i.test(msg);
    }

    // Option answers
    const optionAnswers = {
        about: `<strong>Name:</strong> Dheeraj Yadav<br><strong>Profession:</strong> Full Stack Developer, AI Enthusiast, Cybersecurity Specialist`,
        skills: Array.from(document.querySelectorAll('#skills .skill-category')).map(cat => `<strong>${cat.querySelector('h3')?.innerText || ''}</strong>: ${Array.from(cat.querySelectorAll('.skill-items span')).map(s => s.innerText).join(', ')}`).join('<br><br>'),
        projects: Array.from(document.querySelectorAll('#projects .project-card')).map(card => `<strong>${card.querySelector('h3')?.innerText || ''}</strong>: ${card.querySelector('p')?.innerText || ''}`).join('<br><br>'),
        certifications: Array.from(document.querySelectorAll('#certifications .certification-card')).map(card => `<strong>${card.querySelector('h3')?.innerText || ''}</strong>:<br>${Array.from(card.querySelectorAll('li')).map(li => li.innerText).join('<br>')}`).join('<br><br>'),
        achievements: Array.from(document.querySelectorAll('#achievements .achievement-card')).map(card => `<strong>${card.querySelector('h3')?.innerText || ''}</strong>: ${Array.from(card.querySelectorAll('p')).map(p => p.innerText).join(' | ')}`).join('<br><br>'),
        contact: Array.from(document.querySelectorAll('#contact .contact-card')).map(card => card.innerText).join('<br>'),
        github: `<a href="https://github.com/dheerajyadav1712" target="_blank">dheerajyadav1712</a>`,
        linkedin: `<a href="https://www.linkedin.com/in/dheeraj-yadav-740a891a9" target="_blank">dheeraj-yadav-740a891a9</a>`
    };

    function appendMessage(text, sender = 'bot') {
        const msgDiv = document.createElement('div');
        msgDiv.className = `ai-chatbot-message ${sender}`;
        msgDiv.innerHTML = `
            <div class="ai-chatbot-avatar">${sender === 'bot' ? '<i class=\'fas fa-robot\'></i>' : '<i class=\'fas fa-user\'></i>'}</div>
            <div class="ai-chatbot-bubble">${text.replace(/\n/g, '<br>')}</div>
        `;
        messagesArea.appendChild(msgDiv);
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    // Open/close logic
    chatBtn.addEventListener('click', () => {
        chatbotFloating.classList.toggle('open');
    });
    closeBtn.addEventListener('click', () => {
        chatbotFloating.classList.remove('open');
    });

    // Add option click logic
    const optionsDiv = chatbotFloating.querySelector('.ai-chatbot-options');
    optionsDiv.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            const opt = e.target.getAttribute('data-option');
            if (optionAnswers[opt]) {
                appendMessage(e.target.innerText, 'user');
                setTimeout(() => {
                    appendMessage(optionAnswers[opt], 'bot');
                }, 400);
            }
        }
    });
})();
});

document.addEventListener('DOMContentLoaded', function() {
  const reposGrid = document.getElementById('reposGrid');
  if (!reposGrid) return;

  fetch('https://api.github.com/users/dheerajyadav1712/repos?sort=updated')
    .then(response => response.json())
    .then(repos => {
      reposGrid.innerHTML = '';
      repos.forEach(repo => {
        if (!repo.fork) {
          const card = document.createElement('div');
          card.className = 'repo-card';
          card.innerHTML = `
            <h4>${repo.name.replace(/-/g, ' ')}</h4>
            <p>${repo.description ? repo.description : 'No description provided.'}</p>
            <div class="repo-stats">
              <span><i class="fas fa-code-branch"></i> ${repo.language || 'N/A'}</span>
              <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
            </div>
            <a href="${repo.html_url}" target="_blank" class="repo-link">View Repository</a>
          `;
          reposGrid.appendChild(card);
        }
      });
    })
    .catch(error => {
      reposGrid.innerHTML = '<p>Could not load repositories. Please try again later.</p>';
    });
}); 