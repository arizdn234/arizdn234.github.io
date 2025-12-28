// nav scroll
window.addEventListener('scroll', () => document.querySelector('nav').classList[window.scrollY > 0 ? 'add' : 'remove']('nav-scroll'));

// Randomizer
function randomizer(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// effect list
const effects = {
    fade: {
        in: 'fade-in',
        out: 'fade-out'
    },

    zoom: {
        in: 'zoom-in',
        out: 'zoom-out'
    },

    slide: {
        up: {
            in: 'slide-in-down',
            out: 'slide-out-up'
        },
        down: {
            in: 'slide-in-up',
            out: 'slide-out-down'
        },
        left: {
            in: 'slide-in-right',
            out: 'slide-out-left'
        },
        right: {
            in: 'slide-in-left',
            out: 'slide-out-right'
        }
    }
};

// Transition handler
function applyTransition(element, effect, callback, delay = 0, bypassTransitionDelay = false) {
    element.classList.add(effect.out);
    transitionDelay = 300;
    if (bypassTransitionDelay) {
        transitionDelay = 0;
    }
    
    setTimeout(() => {
        callback();
        element.classList.remove(effect.out);
        element.classList.add(effect.in);

        setTimeout(() => {
            element.classList.remove(effect.in);
        }, 300);
    }, transitionDelay + delay);
}

// EmailJS
// window.onload = function() {
//     document.getElementById("year").textContent = new Date().getFullYear();

//     document.getElementById('contact-form').addEventListener('submit', function(event) {
//         event.preventDefault();
//         emailjs.sendForm('service_qm57f88', 'template_gwbjgkx', this)
//             .then(() => {
//                 alert('Email sent successfully!');
//             }, (error) => {
//                 alert('Failed to send email, please try again.');
//             });
//     });
// }

// menu (mobile view)
const menuButton = document.querySelector('.menu-button');
const menuBar = document.querySelector('.menu-bar');
const menuIcon = menuButton.querySelector('i');
const footerSection = document.querySelector('body footer');

menuButton.addEventListener('click', function() {
    menuBar.classList.toggle('menu-none');
    menuButton.classList.toggle('menu-btn-none');
    
    if (menuBar.classList.contains('menu-none')) {
        // footer if mobile view (onclick)
        menuIcon.classList.remove('fa-chevron-down');
        menuIcon.classList.add('fa-chevron-up');
        footerSection.style.height = '5rem';
        footerSection.style.paddingBottom = '0';
    } else {
        menuIcon.classList.remove('fa-chevron-up');
        menuIcon.classList.add('fa-chevron-down');
        footerSection.style.height = '9rem';
        footerSection.style.paddingBottom = '4rem';
    }
});
// footer if mobile view (onload)
// Check if in mobile view (screen width <= 600px)
if (window.innerWidth <= 600) {
    // Check if the menu bar does not contain the 'menu-none' class
    if (!menuBar.classList.contains('menu-none')) {
        footerSection.style.height = '9rem';
        footerSection.style.paddingBottom = '4rem';
    } else {
        footerSection.style.height = '5rem';
        footerSection.style.paddingBottom = '0';
    }
}

// Theme handling code
// Retrieve saved theme from localStorage or set default to 'light-theme'
const savedTheme = localStorage.getItem('preferredTheme') || 'light-theme';
const themeToggleButton = document.querySelector('.theme-toggle-button');
const bodyElement = document.body;
const themeIcon = themeToggleButton.querySelector('i');

// Apply the saved theme
bodyElement.classList.add(savedTheme);
updateThemeIcon(savedTheme);

// Toggle theme on button click
themeToggleButton.addEventListener('click', function () {
    bodyElement.classList.toggle('dark-theme');
    bodyElement.classList.toggle('light-theme');

    const currentTheme = bodyElement.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';

    updateThemeIcon(currentTheme);

    localStorage.setItem('preferredTheme', currentTheme);
});

// Function to update the theme icon based on the current theme
function updateThemeIcon(theme) {
    const newIconClass = theme === 'dark-theme' ? 'fa-moon' : 'fa-sun';
    const oldIconClass = theme === 'dark-theme' ? 'fa-sun' : 'fa-moon';

    applyTransition(themeIcon, effects.slide.down, () => {
        themeIcon.classList.remove(oldIconClass); 
        themeIcon.classList.add(newIconClass);    
    });

    themeToggleButton.prepend(themeIcon);
}

// Define the removeActive function
const removeActive = () => {
    let allTab = document.querySelectorAll('.tab');
    allTab.forEach(tab => {
        tab.classList.remove('tab-active');
    });
};

// Language loader
document.addEventListener("DOMContentLoaded", () => {
    const languageSelector = document.getElementById("language-selector");
    
    let isExpanded = false;
    const toggleButton = document.getElementById("toggle-button");
    const aboutTextContainer = document.querySelector(".about-text-container .about-text");

    // Load and update content based on the selected language
    function loadContent(lang) {
        fetch(`locales/${lang}.json`)
            .then(response => response.json())
            .then(data => {
                updateNavbar(data.navbar)
                updateHeader(data.header)
                updateAboutSection(data.about)
                updateSkillsSection(data.skills)
                applyTransition(document.querySelector("#Portfolio"), effects.fade, () => updatePortfolio(data.portfolio));
                // applyTransition(document.querySelector("#Contact"), effects.fade, () => updateContactSection(data.contact));
            })
            .catch(error => console.error('Error loading JSON:', error));
    }

    // Update the Navbar
    function updateNavbar(navbar) {
        const navLinks = document.querySelectorAll("nav .nav-links li a");
        navLinks.forEach((link, index) => {
            applyTransition(link, effects.slide.left, () => {
                link.innerText = navbar.links[index].text;
            }, index * 100);
        });

        const languageSelector = document.querySelector("nav #language-selector");
        applyTransition(languageSelector, effects.fade, () => {
            const languageOptions = languageSelector.querySelectorAll("option");

            navbar.languageSelector.options.forEach(optionData => {
                const matchingOption = Array.from(languageOptions).find(
                    option => option.value === optionData.value
                );

                if (matchingOption) {
                    matchingOption.textContent = optionData.text;
                }
            });
        }, 600);
    }

    // Update the Header
    function updateHeader(header) {
        const title = document.querySelector(".header-left h1");
        const desc  = document.querySelector(".header-left p");
        const btns  = document.querySelectorAll(".header-left a");

        applyTransition(title, effects.slide.up, () => {
            title.innerText = header.greeting;
        });

        applyTransition(desc, effects.fade, () => {
            desc.innerText = header.description;
        }, 100);
        
        // CV BUTTON
        applyTransition(btns[0], effects.slide.left, () => {
            btns[0].innerText = header.buttons[0].text;
            btns[0].href = header.buttons[0].href;

            // 👇 INTERCEPT CLICK
            btns[0].onclick = (e) => {
                e.preventDefault();
                openCV(header.buttons[0]);
            };
        }, 250);

        // CONTACT BUTTON
        applyTransition(btns[1], effects.slide.left, () => {
            btns[1].innerText = header.buttons[1].text;
            btns[1].href = header.buttons[1].href;
            btns[1].onclick = null; // default behavior
        }, 350);

        const profileImage = document.getElementById('profile-image');

        // profileImage.addEventListener('mouseenter', () => {
        //     applyTransition(profileImage, effects.fade, () => {
        //         profileImage.setAttribute('href', `images/${header.imageSecret}`);
        //     }, 1);
        // });

        // profileImage.addEventListener('mouseleave', () => {
        //     applyTransition(profileImage, effects.fade, () => {
        //         profileImage.setAttribute('href', `images/${header.image}`);
        //     }, 1);
        // });

    }

    // Update the About Section
    function updateAboutSection(about) {
        applyTransition(document.querySelector("#About h2"), effects.fade, () => {
            document.querySelector("#About h2").innerText = about.title;
        });
    
        const aboutCards = document.querySelectorAll(".about-card");
        aboutCards.forEach((card, index) => {
            applyTransition(card.querySelector("span i"), effects.fade, () => {
                card.querySelector("span i").className = about.cards[index].icon;
            }, index * 100);
    
            applyTransition(card.querySelector("h5"), effects.fade, () => {
                card.querySelector("h5").innerText = about.cards[index].title;
            }, index * 100 + 100);
    
            applyTransition(card.querySelector("small"), effects.fade, () => {
                card.querySelector("small").innerText = about.cards[index].description;
            }, index * 100 + 200);
        });
        
        applyTransition(document.querySelector(".about-container h3 ~ *"), effects.fade, () => {
            initializeToggleButton(about.paragraphs, about.paragraphs.slice(0, 2), about.expandButton);
        }, aboutCards.length * 100 + 300);

        applyTransition(document.querySelector(".about-container h3"), effects.fade, () => {
            document.querySelector(".about-container h3").innerText = about.subtitle;
        }, aboutCards.length * 100 + 300);

        applyTransition(document.querySelector(".about-container a:nth-of-type(1)"), effects.zoom, () => {
            document.querySelector(".about-container a:nth-of-type(1)").innerText = about.ctaButton.text;
        }, aboutCards.length * 100 + 300);
    }    

    // Initialize Toggle Button for the About Section
    function initializeToggleButton(paragraphs, visibleParagraphs, expandButton) {
        isExpanded = false;
        renderAboutText(paragraphs, visibleParagraphs, expandButton);

        toggleButton.onclick = () => toggleAboutText(paragraphs, visibleParagraphs, expandButton);
    }

    function renderAboutText(paragraphs, visibleParagraphs, expandButton) {
        aboutTextContainer.innerHTML = '';
        const paragraphsToShow = isExpanded ? paragraphs : visibleParagraphs;
        
        paragraphsToShow.forEach(paragraph => {
            const p = document.createElement('p');
            p.innerText = paragraph;
            aboutTextContainer.appendChild(p);
        });

        toggleButton.innerText = isExpanded 
            ? expandButton.expandFalse 
            : expandButton.expandTrue;
    }

    function toggleAboutText(paragraphs, visibleParagraphs, expandButton) {
        isExpanded = !isExpanded;
        renderAboutText(paragraphs, visibleParagraphs, expandButton);
    }

    // Update the Skills Section with Transitions
    function updateSkillsSection(skills) {
        applyTransition(document.querySelector("#Skills h2"), effects.fade, () => {
            document.querySelector("#Skills h2").innerText = skills.title;
        });

        applyTransition(document.querySelector("#Skills .skills-container .skills-right h3"), effects.fade, () => {
            document.querySelector("#Skills .skills-container .skills-right h3").innerText = skills.right.subtitle;
        }, 100);

        const skillsCards = document.querySelectorAll(".skills-left .skill-card");
        skillsCards.forEach((card, index) => {
            applyTransition(card.querySelector("span i"), effects.fade, () => {
                card.querySelector("span i").className = skills.left.cards[index].icon;
            }, index * 100);

            applyTransition(card.querySelector("h5"), effects.fade, () => {
                card.querySelector("h5").innerText = skills.left.cards[index].title;
            }, index * 100 + 100);

            applyTransition(card.querySelector("small"), effects.fade, () => {
                card.querySelector("small").innerText = skills.left.cards[index].description;
            }, index * 100 + 200);
        });

        const skillsRight = document.querySelector(".skills-right .skill-btn-container");
        skillsRight.innerHTML = "";

        // Render grouped skills
        skills.right.skillGroups.forEach((group, index) => {
            const groupCard = document.createElement("div");
            groupCard.className = "skill-group card card-primary";
            groupCard.dataset.key = group.key;

            // Header (icon + title)
            const header = document.createElement("div");
            header.className = "skill-group-header";

            const icon = document.createElement("i");
            icon.className = group.icon;

            const title = document.createElement("h5");
            title.innerText = group.title;

            header.appendChild(icon);
            header.appendChild(title);

            // Description
            const desc = document.createElement("small");
            desc.innerText = group.description;

            groupCard.appendChild(header);
            groupCard.appendChild(desc);

            // Click handler (open modal)
            groupCard.addEventListener("click", () => {
                openSkillGroup(group);
            });

            // helper-text
            const helper_text = document.createElement("p");
            helper_text.className = "skill-group-helper-text";
            helper_text.innerText = group.helper_text;
            groupCard.appendChild(helper_text);

            applyTransition(groupCard, effects.fade, () => {
                skillsRight.appendChild(groupCard);
            }, index * 100);
        });

    }

    // Update the Portfolio Section
    function updatePortfolio(portfolio) {
        const portfolioSection = document.querySelector("#Portfolio");
        
        // Update title
        applyTransition(portfolioSection.querySelector("h2"), effects.fade, () => {
            portfolioSection.querySelector("h2").innerText = portfolio.title;
        });
        
        // Update description
        applyTransition(portfolioSection.querySelector("p"), effects.fade, () => {
            portfolioSection.querySelector("p").innerText = portfolio.description;
        }, 100);
        
        // Update projects
        const projectsContainer = portfolioSection.querySelector(".portfolio-projects");
        projectsContainer.innerHTML = "";
        
        portfolio.projects.forEach((project, index) => {
            const projectCard = document.createElement("div");
            projectCard.className = `project card`;
            projectCard.dataset.name = project.name;
            projectCard.style.display = 'none';
            
            // Project image
            const imgElement = document.createElement("img");
            imgElement.src = project.image?.trim() === "" ? 'images/no-image.svg' : "images/"+project.image;
            imgElement.alt = project.title?.trim() === "" ? 'Untitled' : project.title;
            imgElement.title = project.title?.trim() === "" ? 'Untitled' : project.title;
            projectCard.appendChild(imgElement);
            
            // Project title
            const titleElement = document.createElement("h4");
            titleElement.innerText = project.title?.trim() === "" ? 'Untitled' : project.title;
            projectCard.appendChild(titleElement);
            
            // Project description
            const descElement = document.createElement("p");
            descElement.innerText = project.description?.trim() === "" ? 'N/A' : project.description.split('.')[0].trim()+".";
            projectCard.appendChild(descElement);
            
            // Project action buttons
            const actionContainer = document.createElement("div");
            actionContainer.className = "project-action";
            project.links.forEach(link => {
                const linkElement = document.createElement("a");
                linkElement.href = link.href?.trim() === "" ? '#' : link.href;
                linkElement.className = link.class;
                linkElement.target = `_blank`;
                linkElement.innerText = link.text;
                actionContainer.appendChild(linkElement);
            });
            projectCard.appendChild(actionContainer);

            // Project helper text
            const helper_text = document.createElement("p");
            helper_text.className = "skill-group-helper-text";
            helper_text.innerText = project.helper_text;
            projectCard.appendChild(helper_text);
            
            applyTransition(projectCard, effects.fade, () => {
                projectsContainer.appendChild(projectCard);
            }, index * 200);
        });
        
        setTimeout(() => {
            const defaultTab = 'star';
            const projects = document.querySelectorAll(".project");
    
            if (projects.length === 0) {
                console.warn("No projects found.");
            }
    
            projects.forEach(project => {
                let projectName = project.getAttribute('data-name');
                if (projectName === defaultTab) {
                    project.classList.remove('fade-out');
                    project.classList.add('fade-in');
                    setTimeout(() => {
                        project.style.display = 'flex';
                    }, 400); 
                } else {
                    project.classList.remove('fade-in');
                    project.classList.add('fade-out');
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 400);
                }
            });
        }, 1500);
    
        // Update tabs
        const tabsContainer = portfolioSection.querySelector(".portfolio-tabs");
        tabsContainer.innerHTML = "";
        
        portfolio.tabs.forEach((tab, index) => {
            const tabElement = document.createElement("div");
            tabElement.className = `tab btn btn-sm btn-white ${tab.class || ""}`;
            
            tabElement.dataset.name = tab.name;
            tabElement.innerText = tab.text;
       
            // Add event listener to each tab
            tabElement.addEventListener('click', (event) => {
                removeActive();
                tabElement.classList.add('tab-active');

                const projects = document.querySelectorAll(".project")
                let filterName = event.target.getAttribute('data-name');
                projects.forEach(project => {
                    let projectName = project.getAttribute('data-name');
                    if (projectName === filterName) {
                        project.classList.remove('fade-out');
                        project.classList.add('fade-in');
                        setTimeout(() => {
                            project.style.display = 'flex';
                        }, 400); 
                    } else {
                        project.classList.remove('fade-in');
                        project.classList.add('fade-out');
                        setTimeout(() => {
                            project.style.display = 'none';
                        }, 400);
                    }
                })
                
            });
            
            applyTransition(tabElement, effects.slide.down, () => {
                tabsContainer.appendChild(tabElement);
            }, index * 100);
        });
    }   
    
    // Modal Elements
    const modal = document.getElementById('general-modal');
    const modalBody = modal.querySelector('.modal-body');
    const modalClose = modal.querySelector('.modal-close');

    // Open modal
    function openModal(contentHTML, section = '') {
        const effect = effects.fade;

        document.body.classList.add('modal-open');

        applyTransition(modal, effect, () => {
            modal.style.display = 'block';
            modalBody.innerHTML = contentHTML;
            modal.classList.remove(effect.in);
        }, 1, true);

        setTimeout(() => {
            switch (section) {
                case 'SKILL_BADGES':
                    animateSkillContent();
                    break;
            
                default:
                    break;
            }
        }, 1);
    }

    // Close modal
    function closeModal(html) {
        const effect = effects.fade;

        modalBody.classList.add(effects.zoom.in);

        applyTransition(modal, effect, () => {
            modal.style.display = 'none';
            modalBody.innerHTML = '';
            document.body.classList.remove('modal-open');
            modalBody.classList.remove(effects.zoom.in);
        });
    }

    // Close modal when clicking close button
    modalClose.addEventListener('click', closeModal);

    // Close modal when clicking outside content
    modal.addEventListener('click', (e) => {
        if (!modalBody.contains(e.target)) {
            closeModal(null);
        }
    });

    function openSkillGroup(group) {
        const content = `
            <h2 class="m-title">${group.title}</h2>
            <p class="m-desc">${group.description}</p>
            <div class="skill-badges m-badges">
                ${group.skills.map(skill => `<span class="badge">${skill}</span>`).join('')}
            </div>
        `;
        openModal(content, 'SKILL_BADGES');
    }

    function animateSkillContent() {
        const title = modalBody.querySelector('.m-title');
        const desc = modalBody.querySelector('.m-desc');

        if (title) title.classList.add(effects.fade.in);
        if (desc) {
            setTimeout(() => {
                desc.classList.add(effects.fade.in);
            }, 1);
        }

        setTimeout(() => {
            title?.classList.remove(effects.fade.in);
            desc?.classList.remove(effects.fade.in);
        }, 600);

        animateSkillBadges();
    }

    function animateSkillBadges() {
        const badges = modalBody.querySelectorAll('.skill-badges .badge');
        if (!badges.length) return;

        const effect = effects.slide.down;

        badges.forEach((badge, index) => {
            // initial state
            badge.style.opacity = 0;

            setTimeout(() => {
                badge.classList.add(effect.in);
            }, index * 100);

            // cleanup
            setTimeout(() => {
                badge.classList.remove(effect.in);
                badge.style.opacity = '';
            }, index * 100 + 500);
        });
    }

    function openProject(project) {
        const content = `
            <h2>${project.title}</h2>
            <img src="images/${project.image}" alt="${project.title}" style="width:100%;border-radius:8px;">
            <p>${project.description}</p>
            <div class="project-links">
                ${project.links.map(link => `<a href="${link.href}" target="_blank">${link.text}</a>`).join('')}
            </div>
        `;
        openModal(content);
    }

    function openCV(data) {
        const {
            type = 'PDF',
            lang = '',
            updated = '',
            pages = ''
        } = data.meta;

        const metaText = [
            type,
            lang && `Language: ${lang}`,
            pages && `${pages} pages`,
            updated && `Last updated at ${updated}`
        ].filter(Boolean).join(' | ');

        const content = `
            <h2>Curriculum Vitae</h2>
            <p style="
                margin: 1rem;
                font-size:0.85rem;
                opacity:0.7;
            ">
                ${metaText}
            </p>

            <iframe 
                src="${data.href}" 
                width="100%" 
                height="500px" 
                style="border:none;border-radius:8px;"
            ></iframe>
        `;

        openModal(content);
    }

    // Retrieve saved language from localStorage or set default to 'en-EN'
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en-EN';
    if (languageSelector) {
        languageSelector.value = savedLanguage;
    }
    
    // Load the saved language content
    loadContent(savedLanguage);

    // Initialize the language selector
    languageSelector.addEventListener("change", (e) => {
        const selectedLang = e.target.value;
        localStorage.setItem('preferredLanguage', selectedLang); // Save selected language to localStorage
        loadContent(selectedLang);
    });
});

