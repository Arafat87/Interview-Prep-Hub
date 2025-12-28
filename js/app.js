// Main Application Logic

class InterviewQuestionsApp {
    constructor() {
        this.questions = [];
        this.filteredQuestions = [];
        this.currentQuestion = null;
        this.caseStudies = [];
        this.filteredCaseStudies = [];
        this.currentCaseStudy = null;
        this.currentView = 'questions';
        this.jobCategories = [];
        this.defaultCategories = [
            'AI Engineer',
            'Data Scientist',
            'Data Analyst',
            'AI/ML Engineer',
            'Machine Learning Engineer',
            'Cyber Security Engineer',
            'Security Analyst',
            'Penetration Tester',
            'Security Architect'
        ];
        this.filters = {
            category: 'all',
            type: 'all',
            difficulty: 'all',
            search: ''
        };

        this.init();
    }

    // Initialize the application
    init() {
        this.loadJobCategories();
        this.loadQuestions();
        this.loadCaseStudies();
        this.loadTheme();
        this.renderTabs();
        this.setupEventListeners();
        this.setupFlashcardGeneratorListeners();
        this.setupCaseStudyListeners();
        this.renderQuestions();
        this.renderCaseStudies();
        this.updateStats();
    }

    // Load job categories from localStorage
    loadJobCategories() {
        const stored = localStorage.getItem('job_categories');
        if (stored) {
            this.jobCategories = JSON.parse(stored);
        } else {
            this.jobCategories = [...this.defaultCategories];
            this.saveJobCategories();
        }
    }

    // Save job categories to localStorage
    saveJobCategories() {
        localStorage.setItem('job_categories', JSON.stringify(this.jobCategories));
    }

    // Load theme preference
    loadTheme() {
        const theme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) {
            themeSelect.value = theme;
        }
    }

    // Toggle theme
    toggleTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    // Render job category tabs
    renderTabs() {
        const tabsContainer = document.getElementById('jobTabs');
        const allCount = this.questions.length;

        let tabsHTML = `
            <button class="tab-btn ${this.filters.category === 'all' ? 'active' : ''}" data-category="all">
                <i class="fas fa-th"></i>
                All Jobs
                <span class="tab-count">${allCount}</span>
            </button>
        `;

        this.jobCategories.forEach(category => {
            const count = this.questions.filter(q => q.category === category).length;
            const isActive = this.filters.category === category ? 'active' : '';
            tabsHTML += `
                <button class="tab-btn ${isActive}" data-category="${category}">
                    <i class="fas fa-briefcase"></i>
                    ${category}
                    <span class="tab-count">${count}</span>
                </button>
            `;
        });

        tabsContainer.innerHTML = tabsHTML;

        // Add event listeners to tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.filters.category = e.currentTarget.dataset.category;
                this.applyFilters();
            });
        });
    }

    // Update category dropdown in add question form
    updateCategoryDropdown() {
        const select = document.getElementById('newCategory');
        if (select) {
            select.innerHTML = '<option value="">Select Category</option>';
            this.jobCategories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                select.appendChild(option);
            });
        }
    }

    // Load questions from localStorage or use defaults
    loadQuestions() {
        const stored = localStorage.getItem('interview_questions');
        if (stored) {
            this.questions = JSON.parse(stored);
        } else {
            this.questions = [...defaultQuestions];
            this.saveQuestions();
        }
        this.filteredQuestions = [...this.questions];
    }

    // Save questions to localStorage
    saveQuestions() {
        localStorage.setItem('interview_questions', JSON.stringify(this.questions));
    }

    // Setup all event listeners
    setupEventListeners() {
        // Header buttons
        document.getElementById('addQuestionBtn').addEventListener('click', () => this.openAddQuestionModal());
        document.getElementById('settingsBtn').addEventListener('click', () => this.openSettingsModal());
        document.getElementById('manageJobsBtn').addEventListener('click', () => this.openManageJobsModal());

        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filters.search = e.target.value.toLowerCase();
            this.applyFilters();
        });

        // Type filter
        document.querySelectorAll('#typeFilter .pill').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('#typeFilter .pill').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filters.type = e.target.dataset.type;
                this.applyFilters();
            });
        });

        // Difficulty filter
        document.querySelectorAll('#difficultyFilter .pill').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('#difficultyFilter .pill').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filters.difficulty = e.target.dataset.difficulty;
                this.applyFilters();
            });
        });

        // Export/Import
        document.getElementById('exportBtn').addEventListener('click', () => this.exportQuestions());
        document.getElementById('importBtn').addEventListener('click', () => this.importQuestions());

        // Add Question Modal
        document.getElementById('closeAddModal').addEventListener('click', () => this.closeAddQuestionModal());
        document.getElementById('cancelAddBtn').addEventListener('click', () => this.closeAddQuestionModal());
        document.getElementById('addQuestionForm').addEventListener('submit', (e) => this.handleAddQuestion(e));

        // Answer Modal
        document.getElementById('closeAnswerModal').addEventListener('click', () => this.closeAnswerModal());
        document.getElementById('closeAnswerBtn').addEventListener('click', () => this.closeAnswerModal());
        document.getElementById('generateWithClaude').addEventListener('click', () => this.generateAnswerWithClaude());
        document.getElementById('generateWithGPT').addEventListener('click', () => this.generateAnswerWithGPT());
        document.getElementById('saveAnswerBtn').addEventListener('click', () => this.saveAnswer());

        // Settings Modal
        document.getElementById('closeSettingsModal').addEventListener('click', () => this.closeSettingsModal());
        document.getElementById('saveSettingsBtn').addEventListener('click', () => this.saveSettings());
        document.getElementById('clearDataBtn').addEventListener('click', () => this.clearAllData());
        document.getElementById('resetToDefaultBtn').addEventListener('click', () => this.resetToDefault());

        // Theme selector
        document.getElementById('themeSelect').addEventListener('change', (e) => {
            this.toggleTheme(e.target.value);
        });

        // Manage Jobs Modal
        document.getElementById('closeManageJobsModal').addEventListener('click', () => this.closeManageJobsModal());
        document.getElementById('closeManageJobsBtn').addEventListener('click', () => this.closeManageJobsModal());
        document.getElementById('addJobCategoryBtn').addEventListener('click', () => this.addJobCategory());
        document.getElementById('newJobCategory').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.addJobCategory();
            }
        });

        // Close modals on outside click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });
    }

    // Apply filters to questions
    applyFilters() {
        this.filteredQuestions = this.questions.filter(q => {
            const matchesCategory = this.filters.category === 'all' || q.category === this.filters.category;
            const matchesType = this.filters.type === 'all' || q.type === this.filters.type;
            const matchesDifficulty = this.filters.difficulty === 'all' || q.difficulty === this.filters.difficulty;
            const matchesSearch = this.filters.search === '' ||
                q.question.toLowerCase().includes(this.filters.search) ||
                q.tags.some(tag => tag.toLowerCase().includes(this.filters.search));

            return matchesCategory && matchesType && matchesDifficulty && matchesSearch;
        });

        this.renderQuestions();
    }

    // Render questions to the DOM
    renderQuestions() {
        const container = document.getElementById('questionsList');
        const noResults = document.getElementById('noResults');

        if (this.filteredQuestions.length === 0) {
            container.innerHTML = '';
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';
        container.innerHTML = this.filteredQuestions.map(q => this.createQuestionCard(q)).join('');

        // Add event listeners to cards
        this.filteredQuestions.forEach(q => {
            const card = document.querySelector(`[data-question-id="${q.id}"]`);
            if (card) {
                card.addEventListener('click', (e) => {
                    if (!e.target.closest('.favorite-btn') && !e.target.closest('.icon-btn')) {
                        this.openAnswerModal(q);
                    }
                });

                const favoriteBtn = card.querySelector('.favorite-btn');
                if (favoriteBtn) {
                    favoriteBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.toggleFavorite(q.id);
                    });
                }

                const deleteBtn = card.querySelector('.delete-btn');
                if (deleteBtn) {
                    deleteBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.deleteQuestion(q.id);
                    });
                }
            }
        });
    }

    // Create HTML for a question card
    createQuestionCard(question) {
        const difficultyClass = `difficulty-${question.difficulty.toLowerCase()}`;
        const favoriteClass = question.favorite ? 'active' : '';
        const answeredIcon = question.answered ? '<i class="fas fa-check-circle answered-indicator"></i>' : '';

        return `
            <div class="question-card neu-card" data-question-id="${question.id}">
                <div class="question-header">
                    <div class="question-badges">
                        <span class="badge category">${question.category}</span>
                        <span class="badge type">${question.type}</span>
                        <span class="badge ${difficultyClass}">${question.difficulty}</span>
                    </div>
                    <button class="favorite-btn ${favoriteClass}">
                        <i class="fas fa-star"></i>
                    </button>
                </div>
                <p class="question-text">${question.question}</p>
                <div class="question-footer">
                    <div class="tags">
                        ${question.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="question-actions">
                        ${answeredIcon}
                        <button class="icon-btn delete-btn" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Update statistics
    updateStats() {
        document.getElementById('totalQuestions').textContent = this.questions.length;
        document.getElementById('favoriteCount').textContent = this.questions.filter(q => q.favorite).length;
        document.getElementById('answeredCount').textContent = this.questions.filter(q => q.answered).length;
    }

    // Toggle favorite status
    toggleFavorite(id) {
        const question = this.questions.find(q => q.id === id);
        if (question) {
            question.favorite = !question.favorite;
            this.saveQuestions();
            this.renderQuestions();
            this.updateStats();
        }
    }

    // Delete question
    deleteQuestion(id) {
        if (confirm('Are you sure you want to delete this question?')) {
            this.questions = this.questions.filter(q => q.id !== id);
            this.saveQuestions();
            this.applyFilters();
            this.updateStats();
            this.showToast('Question deleted successfully');
        }
    }

    // Open Add Question Modal
    openAddQuestionModal() {
        this.updateCategoryDropdown();
        document.getElementById('addQuestionModal').classList.add('active');
        document.getElementById('addQuestionForm').reset();
    }

    // Close Add Question Modal
    closeAddQuestionModal() {
        document.getElementById('addQuestionModal').classList.remove('active');
    }

    // Handle add question form submission
    handleAddQuestion(e) {
        e.preventDefault();

        const newQuestion = {
            id: Date.now(),
            category: document.getElementById('newCategory').value,
            type: document.getElementById('newType').value,
            difficulty: document.getElementById('newDifficulty').value,
            question: document.getElementById('newQuestion').value,
            answer: '',
            tags: document.getElementById('newTags').value.split(',').map(t => t.trim()).filter(t => t),
            favorite: false,
            answered: false
        };

        this.questions.unshift(newQuestion);
        this.saveQuestions();
        this.applyFilters();
        this.updateStats();
        this.closeAddQuestionModal();
        this.showToast('Question added successfully');
    }

    // Open Answer Modal
    openAnswerModal(question) {
        this.currentQuestion = question;
        const modal = document.getElementById('answerModal');

        document.getElementById('modalCategory').textContent = question.category;
        document.getElementById('modalType').textContent = question.type;
        document.getElementById('modalDifficulty').textContent = question.difficulty;
        document.getElementById('modalDifficulty').className = `badge difficulty-${question.difficulty.toLowerCase()}`;
        document.getElementById('modalQuestion').textContent = question.question;
        document.getElementById('modalTags').innerHTML = question.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        const answerContent = document.getElementById('answerContent');
        if (question.answer) {
            answerContent.innerHTML = question.answer;
            answerContent.classList.remove('placeholder');
        } else {
            answerContent.innerHTML = '<p class="placeholder">Click a button above to generate an AI-powered answer, or type your own answer below.</p>';
        }

        document.getElementById('customAnswer').value = '';

        modal.classList.add('active');
    }

    // Close Answer Modal
    closeAnswerModal() {
        document.getElementById('answerModal').classList.remove('active');
        this.currentQuestion = null;
    }

    // Generate answer with Claude
    async generateAnswerWithClaude() {
        if (!this.currentQuestion) return;

        if (!aiIntegration.hasAnthropicKey()) {
            alert('Please configure your Anthropic API key in Settings first.');
            this.closeAnswerModal();
            this.openSettingsModal();
            return;
        }

        const loadingDiv = document.getElementById('loadingAnswer');
        const answerContent = document.getElementById('answerContent');

        try {
            loadingDiv.style.display = 'block';
            answerContent.style.display = 'none';

            const answer = await aiIntegration.generateWithClaude(
                this.currentQuestion.question,
                this.currentQuestion.category,
                this.currentQuestion.type,
                this.currentQuestion.difficulty
            );

            answerContent.innerHTML = answer;
            answerContent.style.display = 'block';
            loadingDiv.style.display = 'none';

            this.showToast('Answer generated with Claude');
        } catch (error) {
            loadingDiv.style.display = 'none';
            answerContent.style.display = 'block';
            alert('Error generating answer: ' + error.message);
        }
    }

    // Generate answer with ChatGPT
    async generateAnswerWithGPT() {
        if (!this.currentQuestion) return;

        if (!aiIntegration.hasOpenAIKey()) {
            alert('Please configure your OpenAI API key in Settings first.');
            this.closeAnswerModal();
            this.openSettingsModal();
            return;
        }

        const loadingDiv = document.getElementById('loadingAnswer');
        const answerContent = document.getElementById('answerContent');

        try {
            loadingDiv.style.display = 'block';
            answerContent.style.display = 'none';

            const answer = await aiIntegration.generateWithChatGPT(
                this.currentQuestion.question,
                this.currentQuestion.category,
                this.currentQuestion.type,
                this.currentQuestion.difficulty
            );

            answerContent.innerHTML = answer;
            answerContent.style.display = 'block';
            loadingDiv.style.display = 'none';

            this.showToast('Answer generated with ChatGPT');
        } catch (error) {
            loadingDiv.style.display = 'none';
            answerContent.style.display = 'block';
            alert('Error generating answer: ' + error.message);
        }
    }

    // Save answer
    saveAnswer() {
        if (!this.currentQuestion) return;

        const answerContent = document.getElementById('answerContent').innerHTML;
        const customAnswer = document.getElementById('customAnswer').value.trim();

        const finalAnswer = customAnswer || answerContent;

        if (finalAnswer && !finalAnswer.includes('placeholder')) {
            const question = this.questions.find(q => q.id === this.currentQuestion.id);
            if (question) {
                question.answer = finalAnswer;
                question.answered = true;
                this.saveQuestions();
                this.renderQuestions();
                this.updateStats();
                this.showToast('Answer saved successfully');
                this.closeAnswerModal();
            }
        } else {
            alert('Please generate or enter an answer first.');
        }
    }

    // Open Settings Modal
    openSettingsModal() {
        document.getElementById('settingsModal').classList.add('active');
        document.getElementById('openaiKey').value = aiIntegration.getOpenAIKey();
        document.getElementById('anthropicKey').value = aiIntegration.getAnthropicKey();
        document.getElementById('geminiKey').value = aiIntegration.getGeminiKey();
        document.getElementById('huggingfaceKey').value = aiIntegration.getHuggingFaceKey();
        document.getElementById('groqKey').value = aiIntegration.getGroqKey();
        document.getElementById('ollamaUrl').value = aiIntegration.getOllamaUrl();
    }

    // Close Settings Modal
    closeSettingsModal() {
        document.getElementById('settingsModal').classList.remove('active');
    }

    // Save settings
    saveSettings() {
        const openaiKey = document.getElementById('openaiKey').value.trim();
        const anthropicKey = document.getElementById('anthropicKey').value.trim();
        const geminiKey = document.getElementById('geminiKey').value.trim();
        const huggingfaceKey = document.getElementById('huggingfaceKey').value.trim();
        const groqKey = document.getElementById('groqKey').value.trim();
        const ollamaUrl = document.getElementById('ollamaUrl').value.trim();
        const theme = document.getElementById('themeSelect').value;

        aiIntegration.setOpenAIKey(openaiKey);
        aiIntegration.setAnthropicKey(anthropicKey);
        aiIntegration.setGeminiKey(geminiKey);
        aiIntegration.setHuggingFaceKey(huggingfaceKey);
        aiIntegration.setGroqKey(groqKey);
        aiIntegration.setOllamaUrl(ollamaUrl);
        this.toggleTheme(theme);

        this.showToast('Settings saved successfully');
        this.closeSettingsModal();
    }

    // Open Manage Jobs Modal
    openManageJobsModal() {
        document.getElementById('manageJobsModal').classList.add('active');
        this.renderJobCategoriesList();
    }

    // Close Manage Jobs Modal
    closeManageJobsModal() {
        document.getElementById('manageJobsModal').classList.remove('active');
    }

    // Render job categories list
    renderJobCategoriesList() {
        const container = document.getElementById('jobCategoriesList');

        const html = this.jobCategories.map(category => {
            const isDefault = this.defaultCategories.includes(category);
            const count = this.questions.filter(q => q.category === category).length;

            return `
                <div class="job-item ${isDefault ? 'default' : ''}">
                    <div class="job-item-info">
                        <div class="job-item-icon">
                            <i class="fas fa-briefcase"></i>
                        </div>
                        <div class="job-item-details">
                            <h4>${category}</h4>
                            <p>${count} question${count !== 1 ? 's' : ''} ${isDefault ? '• Default' : '• Custom'}</p>
                        </div>
                    </div>
                    <div class="job-item-actions">
                        ${!isDefault ? `
                            <button class="icon-btn delete-job-btn" data-category="${category}" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = html;

        // Add delete event listeners
        document.querySelectorAll('.delete-job-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.deleteJobCategory(category);
            });
        });
    }

    // Add new job category
    addJobCategory() {
        const input = document.getElementById('newJobCategory');
        const category = input.value.trim();

        if (!category) {
            alert('Please enter a job category name');
            return;
        }

        if (this.jobCategories.includes(category)) {
            alert('This job category already exists');
            return;
        }

        this.jobCategories.push(category);
        this.saveJobCategories();
        this.renderTabs();
        this.renderJobCategoriesList();
        input.value = '';
        this.showToast('Job category added successfully');
    }

    // Delete job category
    deleteJobCategory(category) {
        const questionsCount = this.questions.filter(q => q.category === category).length;

        if (questionsCount > 0) {
            if (!confirm(`This category has ${questionsCount} question(s). Deleting it will also delete all associated questions. Continue?`)) {
                return;
            }
            // Remove questions with this category
            this.questions = this.questions.filter(q => q.category !== category);
            this.saveQuestions();
        }

        this.jobCategories = this.jobCategories.filter(c => c !== category);
        this.saveJobCategories();

        // Reset filter if current category was deleted
        if (this.filters.category === category) {
            this.filters.category = 'all';
        }

        this.renderTabs();
        this.renderJobCategoriesList();
        this.applyFilters();
        this.updateStats();
        this.showToast('Job category deleted successfully');
    }

    // Clear all data
    clearAllData() {
        if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            this.questions = [];
            this.saveQuestions();
            this.applyFilters();
            this.updateStats();
            this.showToast('All data cleared');
        }
    }

    // Reset to default questions
    resetToDefault() {
        if (confirm('This will replace all current questions with the default set. Continue?')) {
            this.questions = [...defaultQuestions];
            this.saveQuestions();
            this.applyFilters();
            this.updateStats();
            this.showToast('Reset to default questions');
        }
    }

    // Export questions
    exportQuestions() {
        const dataStr = JSON.stringify(this.questions, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `interview-questions-${Date.now()}.json`;
        link.click();
        URL.revokeObjectURL(url);
        this.showToast('Questions exported successfully');
    }

    // Import questions
    importQuestions() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const imported = JSON.parse(event.target.result);
                        if (Array.isArray(imported)) {
                            if (confirm('This will replace all current questions. Continue?')) {
                                this.questions = imported;
                                this.saveQuestions();
                                this.applyFilters();
                                this.updateStats();
                                this.showToast('Questions imported successfully');
                            }
                        } else {
                            alert('Invalid file format');
                        }
                    } catch (error) {
                        alert('Error reading file: ' + error.message);
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    // Show toast notification
    showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        toastMessage.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // ===== FLASHCARD GENERATOR METHODS =====

    // Open Flashcard Generator Modal
    openFlashcardGeneratorModal() {
        this.updateFlashcardCategoryDropdown();
        this.resetFlashcardGenerator();
        document.getElementById('flashcardGeneratorModal').classList.add('active');
    }

    // Close Flashcard Generator Modal
    closeFlashcardGeneratorModal() {
        document.getElementById('flashcardGeneratorModal').classList.remove('active');
        this.resetFlashcardGenerator();
    }

    // Reset flashcard generator to initial state
    resetFlashcardGenerator() {
        // Reset to step 1
        document.getElementById('contentInputStep').style.display = 'block';
        document.getElementById('generationProgressStep').style.display = 'none';
        document.getElementById('previewStep').style.display = 'none';

        // Reset file upload
        this.currentFile = null;
        document.getElementById('fileInput').value = '';
        document.getElementById('uploadedFile').style.display = 'none';
        document.getElementById('fileDropzone').style.display = 'block';

        // Reset text input
        document.getElementById('contentText').value = '';
        document.getElementById('charCount').textContent = '0 characters';

        // Reset config
        document.getElementById('flashcardCount').value = 10;
        document.getElementById('flashcardCountValue').textContent = '10';
        document.getElementById('flashcardType').value = 'Technical';
        document.getElementById('flashcardDifficulty').value = 'Medium';
        document.getElementById('flashcardAI').value = 'groq'; // Default to Groq (most reliable free option)

        // Reset generated flashcards
        this.generatedFlashcards = [];
    }

    // Update category dropdown in flashcard generator
    updateFlashcardCategoryDropdown() {
        const select = document.getElementById('flashcardCategory');
        if (select) {
            select.innerHTML = '<option value="">Select Category</option>';
            this.jobCategories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                select.appendChild(option);
            });
        }
    }

    // Setup flashcard generator event listeners
    setupFlashcardGeneratorListeners() {
        // Modal controls
        document.getElementById('generateFlashcardsBtn').addEventListener('click', () => this.openFlashcardGeneratorModal());
        document.getElementById('closeFlashcardModal').addEventListener('click', () => this.closeFlashcardGeneratorModal());
        document.getElementById('cancelGenerateBtn').addEventListener('click', () => this.closeFlashcardGeneratorModal());

        // Upload tabs
        document.querySelectorAll('.upload-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.upload-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.upload-content').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                const tabType = e.target.dataset.tab;
                document.getElementById(tabType === 'file' ? 'fileUploadTab' : 'textInputTab').classList.add('active');
            });
        });

        // File upload
        const dropzone = document.getElementById('fileDropzone');
        const fileInput = document.getElementById('fileInput');

        dropzone.addEventListener('click', () => fileInput.click());

        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('drag-over');
        });

        dropzone.addEventListener('dragleave', () => {
            dropzone.classList.remove('drag-over');
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('drag-over');
            const file = e.dataTransfer.files[0];
            if (file) this.handleFileUpload(file);
        });

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) this.handleFileUpload(file);
        });

        document.getElementById('removeFile').addEventListener('click', () => {
            this.currentFile = null;
            fileInput.value = '';
            document.getElementById('uploadedFile').style.display = 'none';
            document.getElementById('fileDropzone').style.display = 'block';
        });

        // Text input character count
        document.getElementById('contentText').addEventListener('input', (e) => {
            const count = e.target.value.length;
            document.getElementById('charCount').textContent = `${count} characters`;
        });

        // Slider
        document.getElementById('flashcardCount').addEventListener('input', (e) => {
            document.getElementById('flashcardCountValue').textContent = e.target.value;
        });

        // Generate button
        document.getElementById('startGenerateBtn').addEventListener('click', () => this.startFlashcardGeneration());

        // Preview actions
        document.getElementById('selectAllFlashcards').addEventListener('click', () => this.selectAllFlashcards());
        document.getElementById('deselectAllFlashcards').addEventListener('click', () => this.deselectAllFlashcards());
        document.getElementById('backToInputBtn').addEventListener('click', () => this.backToInput());
        document.getElementById('saveFlashcardsBtn').addEventListener('click', () => this.saveGeneratedFlashcards());

        // Close modal on outside click
        document.getElementById('flashcardGeneratorModal').addEventListener('click', (e) => {
            if (e.target.id === 'flashcardGeneratorModal') {
                this.closeFlashcardGeneratorModal();
            }
        });
    }

    // Handle file upload
    handleFileUpload(file) {
        // Validate file size (10MB max)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            alert('File is too large. Maximum size is 10MB.');
            return;
        }

        // Validate file type
        const validTypes = ['txt', 'pdf', 'docx'];
        const fileType = file.name.split('.').pop().toLowerCase();
        if (!validTypes.includes(fileType)) {
            alert('Invalid file type. Please upload a TXT, PDF, or DOCX file.');
            return;
        }

        this.currentFile = file;

        // Display file info
        document.getElementById('fileName').textContent = file.name;
        document.getElementById('fileSize').textContent = this.formatFileSize(file.size);
        document.getElementById('fileDropzone').style.display = 'none';
        document.getElementById('uploadedFile').style.display = 'flex';
    }

    // Format file size
    formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }

    // Start flashcard generation
    async startFlashcardGeneration() {
        try {
            // Get content
            let content = '';
            const activeTab = document.querySelector('.upload-tab.active').dataset.tab;

            if (activeTab === 'file') {
                if (!this.currentFile) {
                    alert('Please upload a file or switch to text input.');
                    return;
                }
                // Show progress
                this.showGenerationProgress('Extracting text from file...');
                content = await aiIntegration.extractTextFromFile(this.currentFile);
            } else {
                content = document.getElementById('contentText').value.trim();
                if (!content) {
                    alert('Please enter some content to generate flashcards from.');
                    return;
                }
            }

            // Validate configuration
            const category = document.getElementById('flashcardCategory').value;
            if (!category) {
                alert('Please select a job category.');
                return;
            }

            // Get configuration
            const config = {
                count: parseInt(document.getElementById('flashcardCount').value),
                category: category,
                type: document.getElementById('flashcardType').value,
                difficulty: document.getElementById('flashcardDifficulty').value,
                aiProvider: document.getElementById('flashcardAI').value
            };

            // Show progress
            this.showGenerationProgress('Generating flashcards with AI...');

            // Generate flashcards
            this.generatedFlashcards = await aiIntegration.generateFlashcardsFromContent(content, config);

            // Show preview
            this.showFlashcardPreview();

        } catch (error) {
            console.error('Generation error:', error);
            alert('Error generating flashcards: ' + error.message);
            this.backToInput();
        }
    }

    // Show generation progress
    showGenerationProgress(message) {
        document.getElementById('contentInputStep').style.display = 'none';
        document.getElementById('generationProgressStep').style.display = 'block';
        document.getElementById('previewStep').style.display = 'none';
        document.getElementById('progressMessage').textContent = message;

        // Animate progress bar
        const progressFill = document.getElementById('progressFill');
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            if (progress <= 90) {
                progressFill.style.width = progress + '%';
                document.getElementById('progressPercent').textContent = progress + '%';
            } else {
                clearInterval(interval);
            }
        }, 200);
    }

    // Show flashcard preview
    showFlashcardPreview() {
        document.getElementById('contentInputStep').style.display = 'none';
        document.getElementById('generationProgressStep').style.display = 'none';
        document.getElementById('previewStep').style.display = 'block';

        const previewContainer = document.getElementById('flashcardsPreview');
        previewContainer.innerHTML = '';

        this.generatedFlashcards.forEach((flashcard, index) => {
            const card = this.createFlashcardPreviewCard(flashcard, index);
            previewContainer.appendChild(card);
        });

        this.updateSelectedCount();
    }

    // Create flashcard preview card
    createFlashcardPreviewCard(flashcard, index) {
        const card = document.createElement('div');
        card.className = 'preview-flashcard selected';
        card.dataset.index = index;

        const difficultyClass = `difficulty-${flashcard.difficulty.toLowerCase()}`;

        card.innerHTML = `
            <div class="preview-flashcard-header">
                <div class="preview-flashcard-checkbox">
                    <input type="checkbox" checked data-index="${index}">
                    <span class="preview-flashcard-number">#${index + 1}</span>
                </div>
                <div class="preview-flashcard-badges">
                    <span class="badge category">${flashcard.category}</span>
                    <span class="badge type">${flashcard.type}</span>
                    <span class="badge ${difficultyClass}">${flashcard.difficulty}</span>
                </div>
            </div>
            <div class="preview-flashcard-content">
                <h4>Question</h4>
                <div class="preview-question-text">${flashcard.question}</div>
                <h4>Answer</h4>
                <div class="preview-answer-text">${flashcard.answer}</div>
            </div>
            <div class="preview-flashcard-actions">
                <button class="edit-flashcard-btn" data-index="${index}">
                    <i class="fas fa-edit"></i>
                    Edit
                </button>
            </div>
        `;

        // Add checkbox listener
        const checkbox = card.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
            this.updateSelectedCount();
        });

        // Add edit listener
        const editBtn = card.querySelector('.edit-flashcard-btn');
        editBtn.addEventListener('click', () => this.toggleEditMode(card, index));

        return card;
    }

    // Toggle edit mode for flashcard
    toggleEditMode(card, index) {
        const isEditing = card.classList.contains('edit-mode');

        if (isEditing) {
            // Save changes
            const questionTextarea = card.querySelector('.preview-question-text textarea');
            const answerTextarea = card.querySelector('.preview-answer-text textarea');

            if (questionTextarea && answerTextarea) {
                this.generatedFlashcards[index].question = questionTextarea.value;
                this.generatedFlashcards[index].answer = answerTextarea.value;

                // Update display
                const questionDiv = card.querySelector('.preview-question-text');
                const answerDiv = card.querySelector('.preview-answer-text');
                questionDiv.innerHTML = this.generatedFlashcards[index].question;
                answerDiv.innerHTML = this.generatedFlashcards[index].answer;
            }

            card.classList.remove('edit-mode');
            card.querySelector('.edit-flashcard-btn').innerHTML = '<i class="fas fa-edit"></i> Edit';
        } else {
            // Enter edit mode
            const questionDiv = card.querySelector('.preview-question-text');
            const answerDiv = card.querySelector('.preview-answer-text');

            const questionText = this.generatedFlashcards[index].question;
            const answerText = this.generatedFlashcards[index].answer;

            questionDiv.innerHTML = `<textarea rows="3">${questionText}</textarea>`;
            answerDiv.innerHTML = `<textarea rows="5">${answerText}</textarea>`;

            card.classList.add('edit-mode');
            card.querySelector('.edit-flashcard-btn').innerHTML = '<i class="fas fa-save"></i> Save';
        }
    }

    // Select all flashcards
    selectAllFlashcards() {
        document.querySelectorAll('.preview-flashcard').forEach(card => {
            card.classList.add('selected');
            card.querySelector('input[type="checkbox"]').checked = true;
        });
        this.updateSelectedCount();
    }

    // Deselect all flashcards
    deselectAllFlashcards() {
        document.querySelectorAll('.preview-flashcard').forEach(card => {
            card.classList.remove('selected');
            card.querySelector('input[type="checkbox"]').checked = false;
        });
        this.updateSelectedCount();
    }

    // Update selected count
    updateSelectedCount() {
        const count = document.querySelectorAll('.preview-flashcard.selected').length;
        document.getElementById('selectedCount').textContent = `${count} selected`;
    }

    // Back to input step
    backToInput() {
        document.getElementById('contentInputStep').style.display = 'block';
        document.getElementById('generationProgressStep').style.display = 'none';
        document.getElementById('previewStep').style.display = 'none';
    }

    // Save generated flashcards
    saveGeneratedFlashcards() {
        const selectedCards = document.querySelectorAll('.preview-flashcard.selected');

        if (selectedCards.length === 0) {
            alert('Please select at least one flashcard to save.');
            return;
        }

        // Get selected flashcards
        const flashcardsToSave = [];
        selectedCards.forEach(card => {
            const index = parseInt(card.dataset.index);
            flashcardsToSave.push(this.generatedFlashcards[index]);
        });

        // Add to questions array
        flashcardsToSave.forEach(flashcard => {
            this.questions.unshift(flashcard);
        });

        this.saveQuestions();
        this.applyFilters();
        this.updateStats();
        this.renderTabs();

        this.showToast(`${flashcardsToSave.length} flashcard${flashcardsToSave.length > 1 ? 's' : ''} added successfully!`);
        this.closeFlashcardGeneratorModal();
    }

    // ===== CASE STUDY METHODS =====

    // Load case studies from localStorage
    loadCaseStudies() {
        const stored = localStorage.getItem('case_studies');
        if (stored) {
            this.caseStudies = JSON.parse(stored);
        } else {
            this.caseStudies = [...defaultCaseStudies];
            this.saveCaseStudies();
        }
        this.filteredCaseStudies = [...this.caseStudies];
    }

    // Save case studies to localStorage
    saveCaseStudies() {
        localStorage.setItem('case_studies', JSON.stringify(this.caseStudies));
    }

    // Setup case study event listeners
    setupCaseStudyListeners() {
        // Main navigation
        document.querySelectorAll('.main-nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.switchView(view);
            });
        });

        // Case study generator modal
        document.getElementById('generateCaseStudyBtn').addEventListener('click', () => this.openCaseStudyGeneratorModal());
        document.getElementById('closeCaseStudyModal').addEventListener('click', () => this.closeCaseStudyGeneratorModal());
        document.getElementById('cancelCaseStudyBtn').addEventListener('click', () => this.closeCaseStudyGeneratorModal());

        // Upload tabs for case study
        document.querySelectorAll('#caseStudyGeneratorModal .upload-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const modal = document.getElementById('caseStudyGeneratorModal');
                modal.querySelectorAll('.upload-tab').forEach(t => t.classList.remove('active'));
                modal.querySelectorAll('.upload-content').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                const tabType = e.target.dataset.tab;
                document.getElementById(tabType === 'generate' ? 'generateCaseStudyTab' : 
                                      tabType === 'upload' ? 'uploadCaseStudyTab' : 'pasteCaseStudyTab').classList.add('active');
            });
        });

        // File upload for case study
        const csDropzone = document.getElementById('caseStudyDropzone');
        const csFileInput = document.getElementById('caseStudyFileInput');

        csDropzone.addEventListener('click', () => csFileInput.click());
        csDropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            csDropzone.classList.add('drag-over');
        });
        csDropzone.addEventListener('dragleave', () => csDropzone.classList.remove('drag-over'));
        csDropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            csDropzone.classList.remove('drag-over');
            const file = e.dataTransfer.files[0];
            if (file) this.handleCaseStudyFileUpload(file);
        });

        csFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) this.handleCaseStudyFileUpload(file);
        });

        document.getElementById('removeCaseStudyFile').addEventListener('click', () => {
            this.currentCaseStudyFile = null;
            csFileInput.value = '';
            document.getElementById('uploadedCaseStudyFile').style.display = 'none';
            document.getElementById('caseStudyDropzone').style.display = 'block';
        });

        // Text input character count
        document.getElementById('caseStudyText').addEventListener('input', (e) => {
            const count = e.target.value.length;
            document.getElementById('caseStudyCharCount').textContent = `${count} characters`;
        });

        // Slider
        document.getElementById('caseStudyQuestionCount').addEventListener('input', (e) => {
            document.getElementById('caseStudyQuestionCountValue').textContent = e.target.value;
        });

        // Generate button
        document.getElementById('startCaseStudyGeneration').addEventListener('click', () => this.startCaseStudyGeneration());

        // Preview actions
        document.getElementById('backToCaseStudyInput').addEventListener('click', () => this.backToCaseStudyInput());
        document.getElementById('saveCaseStudyBtn').addEventListener('click', () => this.saveGeneratedCaseStudy());

        // Viewer modal
        document.getElementById('closeCaseStudyViewer').addEventListener('click', () => this.closeCaseStudyViewer());

        // Export
        document.getElementById('exportCaseStudiesBtn').addEventListener('click', () => this.exportCaseStudies());
    }

    // Switch between views
    switchView(view) {
        this.currentView = view;
        
        // Update navigation buttons
        document.querySelectorAll('.main-nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === view) {
                btn.classList.add('active');
            }
        });

        // Update content views
        document.querySelectorAll('.content-view').forEach(v => v.classList.remove('active'));
        if (view === 'questions') {
            document.getElementById('questionsView').classList.add('active');
        } else if (view === 'case-studies') {
            document.getElementById('caseStudiesView').classList.add('active');
            this.renderCaseStudies();
        }
    }

    // Open case study generator modal
    openCaseStudyGeneratorModal() {
        this.updateCaseStudyCategoryDropdown();
        this.resetCaseStudyGenerator();
        document.getElementById('caseStudyGeneratorModal').classList.add('active');
    }

    // Close case study generator modal
    closeCaseStudyGeneratorModal() {
        document.getElementById('caseStudyGeneratorModal').classList.remove('active');
        this.resetCaseStudyGenerator();
    }

    // Reset case study generator
    resetCaseStudyGenerator() {
        document.getElementById('caseStudyInputStep').style.display = 'block';
        document.getElementById('caseStudyProgressStep').style.display = 'none';
        document.getElementById('caseStudyPreviewStep').style.display = 'none';

        document.getElementById('caseStudyTopic').value = '';
        document.getElementById('caseStudyComplexity').value = 'intermediate';
        document.getElementById('caseStudyText').value = '';
        document.getElementById('caseStudyCharCount').textContent = '0 characters';
        document.getElementById('caseStudyQuestionCount').value = 5;
        document.getElementById('caseStudyQuestionCountValue').textContent = '5';
        document.getElementById('caseStudyAI').value = 'groq';

        this.currentCaseStudyFile = null;
        document.getElementById('caseStudyFileInput').value = '';
        document.getElementById('uploadedCaseStudyFile').style.display = 'none';
        document.getElementById('caseStudyDropzone').style.display = 'block';

        this.generatedCaseStudy = null;
    }

    // Update case study category dropdown
    updateCaseStudyCategoryDropdown() {
        const select = document.getElementById('caseStudyCategory');
        if (select) {
            select.innerHTML = '<option value="">Select Category</option>';
            this.jobCategories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                select.appendChild(option);
            });
        }
    }

    // Handle case study file upload
    handleCaseStudyFileUpload(file) {
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            alert('File is too large. Maximum size is 10MB.');
            return;
        }

        const validTypes = ['txt', 'pdf', 'docx'];
        const fileType = file.name.split('.').pop().toLowerCase();
        if (!validTypes.includes(fileType)) {
            alert('Invalid file type. Please upload a TXT, PDF, or DOCX file.');
            return;
        }

        this.currentCaseStudyFile = file;
        document.getElementById('caseStudyFileName').textContent = file.name;
        document.getElementById('caseStudyFileSize').textContent = this.formatFileSize(file.size);
        document.getElementById('caseStudyDropzone').style.display = 'none';
        document.getElementById('uploadedCaseStudyFile').style.display = 'flex';
    }

    // Start case study generation
    async startCaseStudyGeneration() {
        try {
            const category = document.getElementById('caseStudyCategory').value;
            if (!category) {
                alert('Please select a job category.');
                return;
            }

            const activeTab = document.querySelector('#caseStudyGeneratorModal .upload-tab.active').dataset.tab;
            let scenario = '';
            let topic = '';

            // Get scenario based on active tab
            if (activeTab === 'generate') {
                topic = document.getElementById('caseStudyTopic').value.trim();
                if (!topic) {
                    alert('Please enter a case study topic.');
                    return;
                }
            } else if (activeTab === 'upload') {
                if (!this.currentCaseStudyFile) {
                    alert('Please upload a file.');
                    return;
                }
                this.showCaseStudyProgress('Extracting text from file...');
                scenario = await aiIntegration.extractTextFromFile(this.currentCaseStudyFile);
            } else {
                scenario = document.getElementById('caseStudyText').value.trim();
                if (!scenario) {
                    alert('Please paste case study content.');
                    return;
                }
            }

            // Get configuration
            const config = {
                topic: topic,
                category: category,
                complexity: document.getElementById('caseStudyComplexity').value,
                questionCount: parseInt(document.getElementById('caseStudyQuestionCount').value),
                followUpTypes: {
                    why: document.getElementById('followUpWhy').checked,
                    what: document.getElementById('followUpWhat').checked,
                    how: document.getElementById('followUpHow').checked,
                    issues: document.getElementById('followUpIssues').checked
                },
                aiProvider: document.getElementById('caseStudyAI').value,
                existingScenario: scenario || null
            };

            // Show progress
            this.showCaseStudyProgress('Generating case study with AI...');

            // Generate case study
            const result = await aiIntegration.generateCompleteCaseStudy(config);

            this.generatedCaseStudy = {
                id: Date.now(),
                category: category,
                title: topic || 'Case Study',
                scenario: result.scenario,
                questions: result.questions,
                createdAt: new Date().toISOString()
            };

            // Show preview
            this.showCaseStudyPreview();

        } catch (error) {
            console.error('Case study generation error:', error);
            alert('Error generating case study: ' + error.message);
            this.backToCaseStudyInput();
        }
    }

    // Show case study generation progress
    showCaseStudyProgress(message) {
        document.getElementById('caseStudyInputStep').style.display = 'none';
        document.getElementById('caseStudyProgressStep').style.display = 'block';
        document.getElementById('caseStudyPreviewStep').style.display = 'none';
        document.getElementById('caseStudyProgressMessage').textContent = message;

        const progressFill = document.getElementById('caseStudyProgressFill');
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            if (progress <= 90) {
                progressFill.style.width = progress + '%';
                document.getElementById('caseStudyProgressPercent').textContent = progress + '%';
            } else {
                clearInterval(interval);
            }
        }, 300);
    }

    // Show case study preview
    showCaseStudyPreview() {
        document.getElementById('caseStudyInputStep').style.display = 'none';
        document.getElementById('caseStudyProgressStep').style.display = 'none';
        document.getElementById('caseStudyPreviewStep').style.display = 'block';

        const preview = document.getElementById('caseStudyPreview');
        preview.innerHTML = this.renderCaseStudyPreview(this.generatedCaseStudy);
    }

    // Render case study preview
    renderCaseStudyPreview(caseStudy) {
        let html = `
            <div class="preview-scenario">
                <h4><i class="fas fa-file-alt"></i> Scenario</h4>
                <div class="preview-scenario-text">${caseStudy.scenario}</div>
            </div>
            <div class="preview-questions">
        `;

        caseStudy.questions.forEach((q, index) => {
            html += `
                <div class="preview-question-item">
                    <div class="preview-question-header">
                        <div class="question-number">${index + 1}</div>
                        <div class="preview-question-content">
                            <div class="preview-main-q">${q.question}</div>
                            <div class="preview-main-a">${q.answer}</div>
                            ${q.followUps && q.followUps.length > 0 ? `
                                <div class="preview-followups">
                                    <h5 style="font-size: 13px; color: var(--text-secondary); margin-bottom: 10px;">
                                        <i class="fas fa-arrow-right"></i> Follow-up Questions
                                    </h5>
                                    ${q.followUps.map(fu => `
                                        <div class="preview-followup-item">
                                            <span class="follow-up-type ${fu.type.toLowerCase()}">${fu.type}</span>
                                            <div class="preview-followup-q">${fu.question}</div>
                                            <div class="preview-followup-a">${fu.answer}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        return html;
    }

    // Back to case study input
    backToCaseStudyInput() {
        document.getElementById('caseStudyInputStep').style.display = 'block';
        document.getElementById('caseStudyProgressStep').style.display = 'none';
        document.getElementById('caseStudyPreviewStep').style.display = 'none';
    }

    // Save generated case study
    saveGeneratedCaseStudy() {
        if (!this.generatedCaseStudy) return;

        this.caseStudies.unshift(this.generatedCaseStudy);
        this.saveCaseStudies();
        this.renderCaseStudies();
        this.showToast('Case study saved successfully!');
        this.closeCaseStudyGeneratorModal();
    }

    // Render case studies
    renderCaseStudies() {
        const container = document.getElementById('caseStudiesList');
        const noResults = document.getElementById('noCaseStudies');

        // Filter by category
        this.filteredCaseStudies = this.caseStudies.filter(cs => {
            return this.filters.category === 'all' || cs.category === this.filters.category;
        });

        if (this.filteredCaseStudies.length === 0) {
            container.innerHTML = '';
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';
        container.innerHTML = this.filteredCaseStudies.map(cs => this.createCaseStudyCard(cs)).join('');

        // Add event listeners
        this.filteredCaseStudies.forEach(cs => {
            const card = document.querySelector(`[data-case-study-id="${cs.id}"]`);
            if (card) {
                card.addEventListener('click', () => this.openCaseStudyViewer(cs));

                const deleteBtn = card.querySelector('.delete-case-study-btn');
                if (deleteBtn) {
                    deleteBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.deleteCaseStudy(cs.id);
                    });
                }
            }
        });
    }

    // Create case study card HTML
    createCaseStudyCard(caseStudy) {
        const excerpt = caseStudy.scenario.substring(0, 150) + '...';
        const questionCount = caseStudy.questions.length;
        const followUpCount = caseStudy.questions.reduce((sum, q) => sum + (q.followUps?.length || 0), 0);

        return `
            <div class="case-study-card" data-case-study-id="${caseStudy.id}">
                <div class="case-study-header">
                    <span class="case-study-badge">${caseStudy.category}</span>
                    <div class="case-study-actions">
                        <button class="icon-btn delete-case-study-btn" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <h3 class="case-study-title">${caseStudy.title}</h3>
                <p class="case-study-excerpt">${excerpt}</p>
                <div class="case-study-meta">
                    <div class="case-study-stats">
                        <div class="case-study-stat">
                            <i class="fas fa-question-circle"></i>
                            <span>${questionCount} questions</span>
                        </div>
                        <div class="case-study-stat">
                            <i class="fas fa-arrow-right"></i>
                            <span>${followUpCount} follow-ups</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Open case study viewer
    openCaseStudyViewer(caseStudy) {
        this.currentCaseStudy = caseStudy;
        document.getElementById('caseStudyViewerTitle').textContent = caseStudy.title;
        document.getElementById('caseStudyViewerContent').innerHTML = this.renderCaseStudyViewer(caseStudy);
        document.getElementById('caseStudyViewerModal').classList.add('active');

        // Add expand/collapse listeners
        setTimeout(() => {
            document.querySelectorAll('.expand-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const questionId = btn.dataset.questionId;
                    this.toggleFollowUps(questionId);
                });
            });
        }, 100);
    }

    // Close case study viewer
    closeCaseStudyViewer() {
        document.getElementById('caseStudyViewerModal').classList.remove('active');
        this.currentCaseStudy = null;
    }

    // Render case study viewer content
    renderCaseStudyViewer(caseStudy) {
        let html = `
            <div class="case-study-scenario">
                <h3><i class="fas fa-file-alt"></i> Case Study Scenario</h3>
                <div class="case-study-scenario-text">${caseStudy.scenario}</div>
            </div>
            <div class="questions-tree">
        `;

        caseStudy.questions.forEach((q, index) => {
            const questionId = `q-${caseStudy.id}-${index}`;
            html += `
                <div class="question-tree-item">
                    <div class="main-question-section">
                        <div class="main-question-header">
                            <div class="question-number">${index + 1}</div>
                            <div class="main-question-text">${q.question}</div>
                            ${q.followUps && q.followUps.length > 0 ? `
                                <button class="expand-btn" data-question-id="${questionId}">
                                    <i class="fas fa-chevron-down"></i>
                                </button>
                            ` : ''}
                        </div>
                        <div class="main-answer">${q.answer}</div>
                    </div>
                    ${q.followUps && q.followUps.length > 0 ? `
                        <div class="follow-up-section" id="${questionId}">
                            <div class="follow-up-header">
                                <i class="fas fa-arrow-right"></i>
                                <h4>Follow-up Questions</h4>
                            </div>
                            <div class="follow-up-questions">
                                ${q.followUps.map(fu => `
                                    <div class="follow-up-item">
                                        <span class="follow-up-type ${fu.type.toLowerCase()}">${fu.type}</span>
                                        <div class="follow-up-question">${fu.question}</div>
                                        <div class="follow-up-answer">${fu.answer}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        });

        html += '</div>';
        return html;
    }

    // Toggle follow-up questions
    toggleFollowUps(questionId) {
        const section = document.getElementById(questionId);
        const btn = document.querySelector(`[data-question-id="${questionId}"]`);
        
        if (section && btn) {
            section.classList.toggle('expanded');
            btn.classList.toggle('expanded');
        }
    }

    // Delete case study
    deleteCaseStudy(id) {
        if (confirm('Are you sure you want to delete this case study?')) {
            this.caseStudies = this.caseStudies.filter(cs => cs.id !== id);
            this.saveCaseStudies();
            this.renderCaseStudies();
            this.showToast('Case study deleted successfully');
        }
    }

    // Export case studies
    exportCaseStudies() {
        const dataStr = JSON.stringify(this.caseStudies, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `case-studies-${Date.now()}.json`;
        link.click();
        URL.revokeObjectURL(url);
        this.showToast('Case studies exported successfully');
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InterviewQuestionsApp();
});
