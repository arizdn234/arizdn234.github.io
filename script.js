// nav scroll
window.addEventListener('scroll', () => document.querySelector('nav').classList[window.scrollY > 0 ? 'add' : 'remove']('nav-scroll'));

// Randomizer
function randomizer(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// effect list
const effects = {
    fade: { in: "fade-in", out: "fade-out" },
    slide: { in: "slide-in", out: "slide-out" },
    slideX: { out: 'slide-out-left', in: 'slide-in-right' },
    slideY: { out: 'slide-out-up', in: 'slide-in-down' },
    zoom: { in: "zoom-in", out: "zoom-out" }
};

// Transition handler
function applyTransition(element, effect, callback, delay = 0) {
    element.classList.add(effect.out);
    setTimeout(() => {
        callback();
        element.classList.remove(effect.out);
        element.classList.add(effect.in);

        setTimeout(() => {
            element.classList.remove(effect.in);
        }, 500);
    }, 500 + delay);
}

// EmailJS
window.onload = function() {
    document.getElementById("year").textContent = new Date().getFullYear();

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        emailjs.sendForm('service_qm57f88', 'template_gwbjgkx', this)
            .then(() => {
                alert('Email sent successfully!');
            }, (error) => {
                alert('Failed to send email, please try again.');
            });
    });
}

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

    applyTransition(themeIcon, effects.slideY, () => {
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
                applyTransition(document.querySelector("#Contact"), effects.fade, () => updateContactSection(data.contact));
            })
            .catch(error => console.error('Error loading JSON:', error));
    }

    // Update the Navbar
    function updateNavbar(navbar) {
        const navLinks = document.querySelectorAll("nav .nav-links li a");
        navLinks.forEach((link, index) => {
            applyTransition(link, effects.slideX, () => {
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
        applyTransition(document.querySelector(".header-left h1"), effects.slideY, () => {
            document.querySelector(".header-left h1").innerText = header.greeting;
        }, 0);

        applyTransition(document.querySelector(".header-left p"), effects.fade, () => {
            document.querySelector(".header-left p").innerText = header.description;
        }, 100);
        
        applyTransition(document.querySelectorAll(".header-left a")[0], effects.slideX, () => {
            document.querySelectorAll(".header-left a")[0].innerText = header.buttons[0].text;
        }, 250);
    
        applyTransition(document.querySelectorAll(".header-left a")[1], effects.slideX, () => {
            document.querySelectorAll(".header-left a")[1].innerText = header.buttons[1].text;
        }, 300);
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

            // Click handler (open modal / window later)
            groupCard.addEventListener("click", () => {
                openSkillGroup(group);
            });

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
            
            applyTransition(tabElement, effects.slideY, () => {
                tabsContainer.appendChild(tabElement);
            }, index * 100);
        });
    }   
    
    // Modal Elements
    const modal = document.getElementById('general-modal');
    const modalBody = modal.querySelector('.modal-body');
    const modalClose = modal.querySelector('.modal-close');

    // Open modal with content (HTML string)
    function openModal(contentHTML) {
        modalBody.innerHTML = contentHTML;
        modal.style.display = 'block';
    }

    // Close modal
    function closeModal() {
        modal.style.display = 'none';
        modalBody.innerHTML = '';
    }

    // Close modal when clicking close button
    modalClose.addEventListener('click', closeModal);

    // Close modal when clicking outside content
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    function openSkillGroup(group) {
        const content = `
            <h2>${group.title}</h2>
            <p>${group.description}</p>
            <div class="skill-badges">
                ${group.skills.map(skill => `<span class="badge">${skill}</span>`).join('')}
            </div>
        `;
        openModal(content);
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

    function openCV(cvPath) {
        const content = `
            <h2>Curriculum Vitae</h2>
            <iframe src="${cvPath}" width="100%" height="500px" style="border:none;"></iframe>
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
