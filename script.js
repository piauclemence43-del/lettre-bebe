// Éléments du DOM
const envelope = document.getElementById('envelope');
const letterModal = document.getElementById('letterModal');
const closeBtn = document.querySelector('.close-btn');
const previewBtn = document.getElementById('previewBtn');
const resetBtn = document.getElementById('resetBtn');

// Champs de saisie
const recipientNameInput = document.getElementById('recipientName');
const senderNameInput = document.getElementById('senderName');
const letterContentInput = document.getElementById('letterContent');
const backgroundColorInput = document.getElementById('backgroundColor');
const textColorInput = document.getElementById('textColor');

// Éléments affichés
const envelopeRecipient = document.getElementById('envelopeRecipient');
const letterRecipient = document.getElementById('letterRecipient');
const letterBody = document.getElementById('letterBody');
const letterSender = document.getElementById('letterSender');

// Clés de stockage local
const STORAGE_KEYS = {
    recipientName: 'letter_recipient',
    senderName: 'letter_sender',
    letterContent: 'letter_content',
    backgroundColor: 'letter_bg_color',
    textColor: 'letter_text_color'
};

// === Initialisation ===
function init() {
    loadFromLocalStorage();
    updatePreview();
    addEventListeners();
}

// === Gestion du stockage local ===
function loadFromLocalStorage() {
    const savedRecipient = localStorage.getItem(STORAGE_KEYS.recipientName);
    const savedSender = localStorage.getItem(STORAGE_KEYS.senderName);
    const savedContent = localStorage.getItem(STORAGE_KEYS.letterContent);
    const savedBgColor = localStorage.getItem(STORAGE_KEYS.backgroundColor);
    const savedTextColor = localStorage.getItem(STORAGE_KEYS.textColor);

    if (savedRecipient) recipientNameInput.value = savedRecipient;
    if (savedSender) senderNameInput.value = savedSender;
    if (savedContent) letterContentInput.value = savedContent;
    if (savedBgColor) backgroundColorInput.value = savedBgColor;
    if (savedTextColor) textColorInput.value = savedTextColor;
}

function saveToLocalStorage() {
    localStorage.setItem(STORAGE_KEYS.recipientName, recipientNameInput.value);
    localStorage.setItem(STORAGE_KEYS.senderName, senderNameInput.value);
    localStorage.setItem(STORAGE_KEYS.letterContent, letterContentInput.value);
    localStorage.setItem(STORAGE_KEYS.backgroundColor, backgroundColorInput.value);
    localStorage.setItem(STORAGE_KEYS.textColor, textColorInput.value);
}

// === Mise à jour de l'aperçu ===
function updatePreview() {
    const recipientName = recipientNameInput.value.trim() || 'Mon amour';
    const senderName = senderNameInput.value.trim() || 'Avec tout mon amour';
    const letterText = letterContentInput.value;
    const bgColor = backgroundColorInput.value;
    const textColor = textColorInput.value;

    // Mise à jour enveloppe
    envelopeRecipient.textContent = `À: ${recipientName}`;
    
    // Mise à jour lettre
    letterRecipient.textContent = `Chère ${recipientName},`;
    letterBody.textContent = letterText;
    letterSender.textContent = senderName;

    // Mise à jour couleurs
    document.documentElement.style.setProperty('--letter-bg-color', bgColor);
    document.documentElement.style.setProperty('--letter-text-color', textColor);

    // Appliquer les couleurs à la lettre
    const letterContent = document.querySelector('.letter');
    if (letterContent) {
        letterContent.style.backgroundColor = bgColor;
        letterContent.style.color = textColor;
    }

    const letterHeader = document.querySelector('.letter-header');
    const letterFooter = document.querySelector('.letter-footer');
    if (letterHeader) letterHeader.style.color = textColor;
    if (letterFooter) letterFooter.style.color = textColor;

    saveToLocalStorage();
}

// === Gestion des événements ===
function addEventListeners() {
    // Personnalisation
    recipientNameInput.addEventListener('input', updatePreview);
    senderNameInput.addEventListener('input', updatePreview);
    letterContentInput.addEventListener('input', updatePreview);
    backgroundColorInput.addEventListener('change', updatePreview);
    textColorInput.addEventListener('change', updatePreview);

    // Boutons
    previewBtn.addEventListener('click', openLetter);
    resetBtn.addEventListener('click', resetForm);

    // Enveloppe
    envelope.addEventListener('click', openLetter);

    // Modal
    closeBtn.addEventListener('click', closeLetter);
    letterModal.addEventListener('click', (e) => {
        if (e.target === letterModal) {
            closeLetter();
        }
    });

    // Clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLetter();
        }
    });
}

// === Ouverture de la lettre ===
function openLetter(e) {
    if (e) e.preventDefault();
    
    updatePreview();
    envelope.classList.add('open');
    letterModal.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Animation des particules (cœurs)
    createHearts();
}

// === Fermeture de la lettre ===
function closeLetter() {
    envelope.classList.remove('open');
    letterModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// === Réinitialisation du formulaire ===
function resetForm() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser tous les champs ?')) {
        recipientNameInput.value = 'Mon amour';
        senderNameInput.value = 'Avec tout mon amour';
        letterContentInput.value = `Mon amour,

Tu es la lumière qui éclaire mes journées les plus sombres.
Chaque moment passé avec toi est un trésor que je chéris.

Je voulais te dire à quel point tu es spéciale pour moi.
Ton sourire, ta tendresse, ton rire... tout en toi me fait sentir vivant.

Je suis si heureux de t'avoir à mes côtés.
Tu es mon plus beau rêve devenu réalité.

Avec tout mon amour et ma dévotion,
Yours forever ❤️`;
        backgroundColorInput.value = '#fce4ec';
        textColorInput.value = '#c2185b';

        localStorage.clear();
        updatePreview();
    }
}

// === Effets visuels - Particules cœurs ===
function createHearts() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.font-size = (10 + Math.random() * 20) + 'px';
    heart.style.pointer-events = 'none';
    heart.style.z-index = '999';
    heart.style.opacity = '0.8';

    document.body.appendChild(heart);

    let y = window.innerHeight;
    const speed = 1 + Math.random() * 2;
    const drift = (Math.random() - 0.5) * 4;

    const animate = () => {
        y -= speed;
        heart.style.top = y + 'px';
        heart.style.left = (parseFloat(heart.style.left) + drift) + 'px';
        heart.style.opacity = (y / window.innerHeight) * 0.8;

        if (y > 0) {
            requestAnimationFrame(animate);
        } else {
            heart.remove();
        }
    };

    animate();
}

// Créer plusieurs cœurs
function createMultipleHearts() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createHearts(), i * 100);
    }
}

// Ajouter des cœurs quand on ouvre la lettre
const originalOpenLetter = openLetter;
openLetter = function(e) {
    originalOpenLetter(e);
    createMultipleHearts();
};

// === Démarrage ===
document.addEventListener('DOMContentLoaded', init);
