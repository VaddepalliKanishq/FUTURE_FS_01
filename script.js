document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. Mobile Menu Navigation Toggler
    // -------------------------------------------------------------
    const navToggleBtn = document.getElementById('nav-toggle-btn');
    const navMenu = document.getElementById('nav-menu');

    if (navToggleBtn && navMenu) {
        navToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('mobile-open');
            navToggleBtn.textContent = navMenu.classList.contains('mobile-open') ? '✕' : '☰';
        });

        // Close menu on outer click
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && e.target !== navToggleBtn) {
                navMenu.classList.remove('mobile-open');
                navToggleBtn.textContent = '☰';
            }
        });
    }

    // -------------------------------------------------------------
    // 2. Light & Dark Mode Toggle
    // -------------------------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const rootEl = document.documentElement;

    const toggleTheme = () => {
        const isDark = rootEl.classList.contains('dark');
        if (isDark) {
            rootEl.classList.remove('dark');
            document.body.classList.remove('dark');
            localStorage.setItem('portfolio-theme', 'light');
        } else {
            rootEl.classList.add('dark');
            document.body.classList.add('dark');
            localStorage.setItem('portfolio-theme', 'dark');
        }
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // -------------------------------------------------------------
    // 3. LocalStorage Storage Management Keys & Default Fallbacks
    // -------------------------------------------------------------
    const PROJECTS_KEY = 'portfolio-projects';
    const SKILLS_KEY = 'portfolio-skills';
    const TASKS_KEY = 'portfolio-tasks';
    const INBOX_KEY = 'portfolio-messages';

    const defaultProjects = [
        {
            title: 'Emergency Response System',
            description: 'Research-focused platform designed to coordinate and optimize emergency healthcare dispatches.',
            link: 'https://github.com/'
        },
        {
            title: 'Portfolio Website',
            description: 'Premium client-side developer portfolio built using HTML5, CSS3 transitions, and localStorage sync.',
            link: 'https://github.com/'
        },
        {
            title: 'Future Interns Dashboard',
            description: 'A dynamic intern terminal with built-in task checklists, focus timers, and graph overlays.',
            link: 'https://github.com/'
        }
    ];

    const defaultSkills = ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Python', 'Git & GitHub'];
    
    const defaultTasks = [
        { id: 1, text: 'Complete portfolio CSS refactor', completed: true },
        { id: 2, text: 'Implement Pomodoro timer logic', completed: true },
        { id: 3, text: 'Deploy source code to GitHub', completed: false }
    ];

    function getStoredItems(key, fallback) {
        try {
            const stored = localStorage.getItem(key);
            if (!stored) return fallback;
            const parsed = JSON.parse(stored);
            return Array.isArray(parsed) ? parsed : fallback;
        } catch (e) {
            return fallback;
        }
    }

    function setStoredItems(key, items) {
        localStorage.setItem(key, JSON.stringify(items));
    }

    // Update Project Stat Counter Target dynamically
    const projectsList = getStoredItems(PROJECTS_KEY, defaultProjects);
    const projectsCounter = document.getElementById('stat-projects-counter');
    if (projectsCounter) {
        projectsCounter.setAttribute('data-target', Math.max(8, projectsList.length));
    }

    // -------------------------------------------------------------
    // 4. Skills Page Render & Add Form
    // -------------------------------------------------------------
    const manageSkillList = document.getElementById('skill-list');
    const skillForm = document.getElementById('skill-form');

    function renderManageSkills() {
        if (!manageSkillList) return;
        const skills = getStoredItems(SKILLS_KEY, defaultSkills);
        manageSkillList.innerHTML = '';

        if (skills.length === 0) {
            manageSkillList.innerHTML = `<div class="empty-state card">No skills added yet. Register your first skill!</div>`;
            return;
        }

        skills.forEach((skill, index) => {
            const skillCard = document.createElement('div');
            skillCard.className = 'card skill-card';

            const nameSpan = document.createElement('span');
            nameSpan.textContent = skill;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '✕';
            deleteBtn.title = `Delete ${skill}`;
            deleteBtn.addEventListener('click', () => {
                const currentSkills = getStoredItems(SKILLS_KEY, defaultSkills);
                currentSkills.splice(index, 1);
                setStoredItems(SKILLS_KEY, currentSkills);
                renderManageSkills();
            });

            skillCard.appendChild(nameSpan);
            skillCard.appendChild(deleteBtn);
            manageSkillList.appendChild(skillCard);
        });
    }

    if (skillForm) {
        skillForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('skill-name');
            const newSkill = input.value.trim();
            if (!newSkill) return;

            const currentSkills = getStoredItems(SKILLS_KEY, defaultSkills);
            currentSkills.unshift(newSkill);
            setStoredItems(SKILLS_KEY, currentSkills);
            renderManageSkills();
            input.value = '';
        });
    }

    // -------------------------------------------------------------
    // 5. Projects Page Render & Add Form
    // -------------------------------------------------------------
    const manageProjectList = document.getElementById('project-list');
    const projectForm = document.getElementById('project-form');

    function renderManageProjects() {
        if (!manageProjectList) return;
        const projects = getStoredItems(PROJECTS_KEY, defaultProjects);
        manageProjectList.innerHTML = '';

        if (projects.length === 0) {
            manageProjectList.innerHTML = `<div class="empty-state card">No projects published yet. Build your first project!</div>`;
            return;
        }

        projects.forEach((proj, index) => {
            const card = document.createElement('div');
            card.className = 'card project-card';

            const header = document.createElement('div');
            header.className = 'project-card-header';

            const title = document.createElement('h3');
            title.textContent = proj.title;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '✕';
            deleteBtn.title = `Delete ${proj.title}`;
            deleteBtn.addEventListener('click', () => {
                const currentProjects = getStoredItems(PROJECTS_KEY, defaultProjects);
                currentProjects.splice(index, 1);
                setStoredItems(PROJECTS_KEY, currentProjects);
                renderManageProjects();
            });

            header.appendChild(title);
            header.appendChild(deleteBtn);

            const desc = document.createElement('p');
            desc.textContent = proj.description;

            card.appendChild(header);
            card.appendChild(desc);

            if (proj.link) {
                const demoBtn = document.createElement('a');
                demoBtn.href = proj.link;
                demoBtn.target = '_blank';
                demoBtn.rel = 'noopener noreferrer';
                demoBtn.className = 'btn btn-secondary';
                demoBtn.textContent = 'View Code';
                card.appendChild(demoBtn);
            }

            manageProjectList.appendChild(card);
        });
    }

    if (projectForm) {
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const titleEl = document.getElementById('project-title');
            const descEl = document.getElementById('project-description');
            const linkEl = document.getElementById('project-link');

            const title = titleEl.value.trim();
            const description = descEl.value.trim();
            const link = linkEl.value.trim();

            if (!title || !description) return;

            const currentProjects = getStoredItems(PROJECTS_KEY, defaultProjects);
            currentProjects.unshift({ title, description, link });
            setStoredItems(PROJECTS_KEY, currentProjects);
            
            renderManageProjects();
            projectForm.reset();
        });
    }

    // -------------------------------------------------------------
    // 6. Homepage: Render Sync'd Projects & Skills
    // -------------------------------------------------------------
    const homepageSkillList = document.getElementById('skills-homepage-list');
    const homepageProjectList = document.getElementById('projects-homepage-list');

    function renderHomepageContent() {
        // Render Skills
        if (homepageSkillList) {
            const skills = getStoredItems(SKILLS_KEY, defaultSkills);
            homepageSkillList.innerHTML = '';
            
            if (skills.length === 0) {
                homepageSkillList.innerHTML = `<div class="empty-state card">No skills recorded in toolkit yet.</div>`;
            } else {
                skills.forEach(skill => {
                    const scard = document.createElement('div');
                    scard.className = 'card skill-card';
                    
                    const label = document.createElement('span');
                    label.textContent = skill;
                    label.style.width = '100%';
                    label.style.textAlign = 'center';
                    
                    scard.appendChild(label);
                    homepageSkillList.appendChild(scard);
                });
            }
        }

        // Render Projects
        if (homepageProjectList) {
            const projects = getStoredItems(PROJECTS_KEY, defaultProjects);
            homepageProjectList.innerHTML = '';

            if (projects.length === 0) {
                homepageProjectList.innerHTML = `<div class="empty-state card">No projects published in portfolio yet.</div>`;
            } else {
                projects.forEach(proj => {
                    const pcard = document.createElement('div');
                    pcard.className = 'card project-card';

                    const title = document.createElement('h3');
                    title.textContent = proj.title;
                    title.style.marginBottom = '12px';

                    const desc = document.createElement('p');
                    desc.textContent = proj.description;

                    pcard.appendChild(title);
                    pcard.appendChild(desc);

                    if (proj.link) {
                        const linkBtn = document.createElement('a');
                        linkBtn.href = proj.link;
                        linkBtn.target = '_blank';
                        linkBtn.rel = 'noopener noreferrer';
                        linkBtn.className = 'btn btn-secondary';
                        linkBtn.textContent = 'View Code';
                        pcard.appendChild(linkBtn);
                    }

                    homepageProjectList.appendChild(pcard);
                });
            }
        }
    }

    // Initial triggers for page loads
    renderManageSkills();
    renderManageProjects();
    renderHomepageContent();

    // -------------------------------------------------------------
    // 7. Homepage Dashboard Panels Switching
    // -------------------------------------------------------------
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            btn.classList.add('active');
            const activePanel = document.querySelector(`.tab-panel[data-panel="${target}"]`);
            if (activePanel) activePanel.classList.add('active');
        });
    });

    // -------------------------------------------------------------
    // 8. Stats Counter Increment Animations
    // -------------------------------------------------------------
    const counters = document.querySelectorAll('.counter');
    
    function startCountersAnimation() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let current = 0;
            const speed = 100; // lower number means slower speed
            const increment = Math.max(1, Math.ceil(target / speed));

            const updateCount = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = current + (target === 95 ? '%' : '+');
                    setTimeout(updateCount, 15);
                } else {
                    counter.textContent = target + (target === 95 ? '%' : '+');
                }
            };
            updateCount();
        });
    }

    if (counters.length > 0) {
        startCountersAnimation();
    }

    // -------------------------------------------------------------
    // 9. Dashboard: SVG Line Graph Tooltips
    // -------------------------------------------------------------
    const graphPoints = document.querySelectorAll('.chart-point');
    const chartTooltip = document.getElementById('chart-tooltip');

    if (graphPoints.length > 0 && chartTooltip) {
        graphPoints.forEach(point => {
            point.addEventListener('mouseenter', (e) => {
                const info = point.getAttribute('data-info');
                chartTooltip.textContent = info;
                chartTooltip.style.opacity = '1';
                
                // Tooltip Position relative to chart wrapper
                const rect = point.getBoundingClientRect();
                const containerRect = point.closest('.chart-svg-wrapper').getBoundingClientRect();
                
                const left = rect.left - containerRect.left + (rect.width / 2);
                const top = rect.top - containerRect.top - 8;
                
                chartTooltip.style.left = `${left}px`;
                chartTooltip.style.top = `${top}px`;
                chartTooltip.style.transform = 'translate(-50%, -100%) scale(1)';
            });

            point.addEventListener('mouseleave', () => {
                chartTooltip.style.opacity = '0';
                chartTooltip.style.transform = 'translate(-50%, -100%) scale(0.9)';
            });
        });
    }

    // -------------------------------------------------------------
    // 10. Dashboard Panel: Focus Pomodoro Clock Engine
    // -------------------------------------------------------------
    const timerDisplay = document.getElementById('timer-display');
    const timerStartBtn = document.getElementById('timer-start-btn');
    const timerResetBtn = document.getElementById('timer-reset-btn');
    const timerProgress = document.getElementById('timer-progress');
    const timerOptionBtns = document.querySelectorAll('.timer-opt-btn');

    let timerInterval = null;
    let totalDuration = 1500; // 25 minutes default
    let timeLeft = 1500;
    let timerRunning = false;
    const circleCircumference = 408.4; // 2 * PI * r (r=65)

    function updateTimerUI() {
        if (!timerDisplay) return;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timerProgress) {
            const fraction = timeLeft / totalDuration;
            const offset = circleCircumference * (1 - fraction);
            timerProgress.style.strokeDashoffset = offset;
        }
    }

    if (timerProgress) {
        timerProgress.style.strokeDasharray = circleCircumference;
        timerProgress.style.strokeDashoffset = 0;
    }

    function toggleTimer() {
        if (timerRunning) {
            // Pause
            clearInterval(timerInterval);
            timerStartBtn.textContent = 'Resume';
            timerStartBtn.style.background = 'var(--primary)';
            timerRunning = false;
        } else {
            // Start
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimerUI();
                } else {
                    clearInterval(timerInterval);
                    timerRunning = false;
                    timerStartBtn.textContent = 'Start';
                    timerStartBtn.style.background = 'var(--primary)';
                    alert('Session completed! Time for a status sync.');
                    resetTimer();
                }
            }, 1000);

            timerStartBtn.textContent = 'Pause';
            timerStartBtn.style.background = 'var(--danger)';
            timerRunning = true;
        }
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timerRunning = false;
        timeLeft = totalDuration;
        if (timerStartBtn) {
            timerStartBtn.textContent = 'Start';
            timerStartBtn.style.background = 'var(--primary)';
        }
        updateTimerUI();
    }

    if (timerStartBtn) {
        timerStartBtn.addEventListener('click', toggleTimer);
    }
    if (timerResetBtn) {
        timerResetBtn.addEventListener('click', resetTimer);
    }

    timerOptionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            timerOptionBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            totalDuration = parseInt(btn.getAttribute('data-time'), 10);
            resetTimer();
        });
    });

    updateTimerUI();

    // -------------------------------------------------------------
    // 11. Dashboard Panel: Tasks Backlog Tracker
    // -------------------------------------------------------------
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoListWrapper = document.getElementById('todo-list');

    function renderTodoList() {
        if (!todoListWrapper) return;
        const tasks = getStoredItems(TASKS_KEY, defaultTasks);
        todoListWrapper.innerHTML = '';

        if (tasks.length === 0) {
            todoListWrapper.innerHTML = `<p class="empty-state" style="padding: 10px 0;">No active coding tasks left.</p>`;
            return;
        }

        tasks.forEach(task => {
            const item = document.createElement('div');
            item.className = `todo-item ${task.completed ? 'completed' : ''}`;

            const leftContent = document.createElement('div');
            leftContent.className = 'todo-item-content';
            leftContent.addEventListener('click', () => {
                toggleTaskComplete(task.id);
            });

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('click', (e) => e.stopPropagation());
            checkbox.addEventListener('change', () => toggleTaskComplete(task.id));

            const taskText = document.createElement('span');
            taskText.textContent = task.text;

            leftContent.appendChild(checkbox);
            leftContent.appendChild(taskText);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'todo-delete-btn';
            deleteBtn.innerHTML = '✕';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteTaskItem(task.id);
            });

            item.appendChild(leftContent);
            item.appendChild(deleteBtn);
            todoListWrapper.appendChild(item);
        });
    }

    function toggleTaskComplete(id) {
        const tasks = getStoredItems(TASKS_KEY, defaultTasks);
        const index = tasks.findIndex(t => t.id === id);
        if (index > -1) {
            tasks[index].completed = !tasks[index].completed;
            setStoredItems(TASKS_KEY, tasks);
            renderTodoList();
        }
    }

    function deleteTaskItem(id) {
        const tasks = getStoredItems(TASKS_KEY, defaultTasks);
        const filtered = tasks.filter(t => t.id !== id);
        setStoredItems(TASKS_KEY, filtered);
        renderTodoList();
    }

    if (todoForm) {
        todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = todoInput.value.trim();
            if (!text) return;

            const tasks = getStoredItems(TASKS_KEY, defaultTasks);
            tasks.push({
                id: Date.now(),
                text: text,
                completed: false
            });
            setStoredItems(TASKS_KEY, tasks);
            renderTodoList();
            todoInput.value = '';
        });
    }

    renderTodoList();

    // -------------------------------------------------------------
    // 12. Interactive Resume accordion switcher
    // -------------------------------------------------------------
    const resumeTabBtns = document.querySelectorAll('.resume-tab-btn');
    const resumePanels = document.querySelectorAll('.resume-panel');
    const resumeAccordionHeaders = document.querySelectorAll('.resume-item-header');

    resumeTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-resume-tab');

            resumeTabBtns.forEach(b => b.classList.remove('active'));
            resumePanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const panel = document.getElementById(`resume-${target}`);
            if (panel) panel.classList.add('active');
        });
    });

    resumeAccordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const parent = header.closest('.resume-item');
            const allItems = header.closest('.resume-panel').querySelectorAll('.resume-item');
            
            // Toggle clicked card
            const isOpen = parent.classList.contains('open');
            allItems.forEach(item => item.classList.remove('open'));
            
            if (!isOpen) {
                parent.classList.add('open');
            }
        });
    });

    // -------------------------------------------------------------
    // 13. Contact Inquiries capture & local Inbox dashboard feed
    // -------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const inboxFeed = document.getElementById('inbox-feed');
    const clearInboxBtn = document.getElementById('clear-inbox-btn');

    function renderInboxFeed() {
        if (!inboxFeed) return;
        const messages = getStoredItems(INBOX_KEY, []);
        inboxFeed.innerHTML = '';

        if (messages.length === 0) {
            inboxFeed.innerHTML = `<div class="empty-state" style="padding: 20px 0;">Inbox clear. No inquiries received.</div>`;
            return;
        }

        messages.forEach((msg, index) => {
            const item = document.createElement('div');
            item.className = 'inbox-item';

            const meta = document.createElement('div');
            meta.className = 'inbox-item-meta';

            const senderArea = document.createElement('div');
            senderArea.innerHTML = `<span class="inbox-sender">${msg.name}</span> <a href="mailto:${msg.email}" class="inbox-email">${msg.email}</a>`;

            const time = document.createElement('span');
            time.className = 'inbox-time';
            time.textContent = msg.time || 'Just now';

            meta.appendChild(senderArea);
            meta.appendChild(time);

            const content = document.createElement('p');
            content.className = 'inbox-message';
            content.textContent = msg.message;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '✕';
            deleteBtn.title = 'Remove inquiry';
            deleteBtn.addEventListener('click', () => {
                const currentMessages = getStoredItems(INBOX_KEY, []);
                currentMessages.splice(index, 1);
                setStoredItems(INBOX_KEY, currentMessages);
                renderInboxFeed();
            });

            item.appendChild(meta);
            item.appendChild(content);
            item.appendChild(deleteBtn);
            inboxFeed.appendChild(item);
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameEl = document.getElementById('contact-name');
            const emailEl = document.getElementById('contact-email');
            const msgEl = document.getElementById('contact-message');

            const name = nameEl.value.trim();
            const email = emailEl.value.trim();
            const message = msgEl.value.trim();

            if (!name || !email || !message) return;

            const messages = getStoredItems(INBOX_KEY, []);
            const now = new Date();
            const formattedTime = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            messages.unshift({ name, email, message, time: formattedTime });
            setStoredItems(INBOX_KEY, messages);

            alert('Your message has been captured locally. View it in the Submitted Inquiries log below!');
            contactForm.reset();
            renderInboxFeed();
        });
    }

    if (clearInboxBtn) {
        clearInboxBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all inbox inquiries?')) {
                setStoredItems(INBOX_KEY, []);
                renderInboxFeed();
            }
        });
    }

    renderInboxFeed();

    // -------------------------------------------------------------
    // 14. Jobs Page Real-Time Search & Category Filters
    // -------------------------------------------------------------
    const jobsSearchInput = document.getElementById('jobs-search-input');
    const jobsCategoryFilter = document.getElementById('jobs-category-filter');
    const jobCards = document.querySelectorAll('.job-card');

    function filterJobsList() {
        if (jobCards.length === 0) return;

        const searchText = jobsSearchInput ? jobsSearchInput.value.toLowerCase().trim() : '';
        const filterVal = jobsCategoryFilter ? jobsCategoryFilter.value : 'all';

        jobCards.forEach(card => {
            const title = card.querySelector('.job-title').textContent.toLowerCase();
            const details = card.querySelector('.job-details').textContent.toLowerCase();
            const skills = card.getAttribute('data-skills').toLowerCase();
            const cat = card.getAttribute('data-category');

            const textMatches = title.includes(searchText) || details.includes(searchText) || skills.includes(searchText);
            const categoryMatches = filterVal === 'all' || cat === filterVal;

            if (textMatches && categoryMatches) {
                card.style.display = 'flex';
                // Trigger quick enter animation
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
            }
        });
    }

    if (jobsSearchInput) {
        jobsSearchInput.addEventListener('input', filterJobsList);
    }
    if (jobsCategoryFilter) {
        jobsCategoryFilter.addEventListener('change', filterJobsList);
    }
});