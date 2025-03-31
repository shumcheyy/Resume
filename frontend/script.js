document.addEventListener('DOMContentLoaded', () => {
    const outputDiv = document.getElementById('output');
    const inputField = document.getElementById('command-input');
    const themeToggle = document.getElementById('theme-toggle');
    const certsPanel = document.getElementById('certs-panel');

    // Theme handling
    themeToggle.addEventListener('click', () => {
        document.body.dataset.theme = 
            document.body.dataset.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', document.body.dataset.theme);
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.dataset.theme = savedTheme;
    }

    // Resume data
    const resumeData = {
        about: 'Security Engineer with 3+ years expertise in cloud security and penetration testing. AWS and Azure certified professional specializing in DevSecOps implementations and vulnerability management.',
        
        experience: [
            {
                company: 'EVIDEN',
                role: 'Associate Security Engineer',
                period: '2020-Present',
                icon: 'fa-briefcase',
                highlights: [
                    {text: 'Conducted 85+ vuln assessments using SAST/DAST', stat: '85+'},
                    {text: 'Reduced security incidents by 30% via PCI DSS compliance', stat: '30%'},
                    'Implemented AWS security controls & DevSecOps practices',
                    'Trained internal teams on vulnerability management'
                ]
            },
            {
                company: 'Freelance',
                role: 'Security Consultant',
                period: '',
                icon: 'fa-user-secret',
                highlights: [
                    {text: 'Reduced high-risk vulnerabilities by 40%', stat: '40%'},
                    'Conducted OWASP Top 10 testing with Burp Suite/ZAP',
                    'Performed cloud security audits for fintech clients'
                ]
            }
        ],

        skills: [
            'CI/CD Pipeline • GitHub Actions',
            'IaC • Terraform',
            'Cloud • AWS',
            'Security Automation • SAST/DAST Integration, Snyk, SonarQube, ZAP',
            'Compliance • PCI-DSS',
            'Threat Modeling • MITRE ATT&CK, STRIDE',
            'Secrets Management • HashiCorp Vault, AWS Secrets Manager'
        ],

        projects: [
            {
                name: 'DevSecOps Pipeline',
                tech: 'AWS • Terraform • GitHub Actions',
                description: 'Implemented automated security scanning in CI/CD pipelines',
                link: ''
            },
            {
                name: 'Cloud Security Audit',
                tech: 'AWS • ScoutSuite • Pacu',
                description: 'Conducted comprehensive cloud security assessment',
                link: '#'
            }
        ],

        certs: [
            {
                name: "AWS Certified Solutions Architect",
                icon: "fab fa-aws",
                year: "2023",
            },
            {
                name: "Microsoft Azure Fundamentals",
                icon: "fab fa-microsoft",
                year: "2022"
            },
            {
                name: "Qualys VM Specialist",
                icon: "fas fa-shield-alt",
                year: "2022"
            },
            {
                name: "CCNA Routing & Switching",
                icon: "fas fa-network-wired",
                year: "2019",
                status: "Expired"
            }
        ],

        contact: [
            'Email: <a href="mailto:bhamchoubey@protomail.com" class="link">bhamchoubey@protomail.com</a><br>',
            'LinkedIn: <a href="https://linkedin.com/in/shuhey" class="link" target="_blank">Linkedin</a><br>',
            'GitHub: <a href="https://github.com/shumcheyy" class="link" target="_blank">Github</a><br>',
            'Location: Bengaluru, Karnataka'
        ].join('\n')
    };

    // Command processing
    inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const input = inputField.value.trim();
            processCommand(input);
            inputField.value = '';
        }
    });

    function processCommand(input) {
        const [command, ...args] = input.split(' ');
        const output = document.createElement('div');
        output.className = 'command-output';

        switch(command.toLowerCase()) {
            case 'help':
                output.innerHTML = `
                    Available commands:<br>
                    <span class="link">about</span>      - Professional summary<br>
                    <span class="link">exp</span>        - Experience details<br>
                    <span class="link">skills</span>     - Technical capabilities<br>
                    <span class="link">projects</span>   - Key initiatives<br>
                    <span class="link">certs</span>      - Show certifications<br>
                    <span class="link">contact</span>    - Contact details<br>
                    <span class="link">clear</span>      - Reset terminal
                `;
                break;
            
            case 'exp':
            case 'experience':
                output.innerHTML = renderExperience();
                break;

            case 'certs':
                certsPanel.classList.toggle('active');
                updateCertsDisplay();
                break;

            case 'projects':
                output.innerHTML = resumeData.projects.map(project => `
                    <div class="project-card">
                        <h3>${project.name}</h3>
                        <p class="tech-stack">${project.tech}</p>
                        <p>${project.description}</p>
                        <a href="${project.link}" class="link" target="_blank">View Details →</a>
                    </div>
                `).join('');
                break;

            case 'contact':
                output.innerHTML = resumeData.contact;
                break;

            case 'clear':
                outputDiv.innerHTML = '';
                const welcome1 = document.createElement('div');
                welcome1.className = 'command-output';
                welcome1.textContent = "Welcome to Shubham's security portfolio! ";
                outputDiv.appendChild(welcome1);

                const welcome2 = document.createElement('div');
                welcome2.className = 'command-output';
                welcome2.innerHTML = "Type <span class='link'>help</span> to see available commands";
                outputDiv.appendChild(welcome2);

                // Scroll to bottom
                outputDiv.scrollTop = outputDiv.scrollHeight;
                return;
            case 'skills':
                output.innerHTML = resumeData.skills.join('<br>');
                break;    
                

            default:
                if (resumeData[command.toLowerCase()]) {
                    output.textContent = resumeData[command.toLowerCase()];
                } else {
                    output.innerHTML = `Command not found: ${input}<br>Try <span class="link">help</span> for options`;
                }
        }

        outputDiv.appendChild(output);
        outputDiv.scrollTop = outputDiv.scrollHeight;
    }

    function renderExperience() {
        return `
            <div class="experience-grid">
                ${resumeData.experience.map(exp => `
                    <div class="exp-card">
                        <div class="exp-header">
                            <i class="fas ${exp.icon} exp-icon"></i>
                            <div>
                                <h3 class="exp-title">${exp.company} - ${exp.role}</h3>
                                ${exp.period ? `<small>${exp.period}</small>` : ''}
                            </div>
                        </div>
                        <div class="exp-highlights">
                            ${exp.highlights.map(h => `
                                <div class="exp-highlight">
                                    ${typeof h === 'object' ? `
                                        <span class="stat-badge">${h.stat}</span>${h.text}
                                    ` : h}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function updateCertsDisplay() {
        const certsContent = document.getElementById('certs-content');
        certsContent.innerHTML = resumeData.certs.map(cert => `
            <div class="cert-item">
                <i class="${cert.icon} cert-icon"></i>
                <div>
                    <div>${cert.name}</div>
                    <small>${cert.year} ${cert.status ? `<span class="stat-badge">${cert.status}</span>` : ''}</small>
                </div>
            </div>
        `).join('');
    }

    // Close certs panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!certsPanel.contains(e.target) && !e.target.closest('#command-input')) {
            certsPanel.classList.remove('active');
        }
    });
});