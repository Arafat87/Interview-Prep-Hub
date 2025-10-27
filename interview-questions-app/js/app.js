// Main Application Logic

class InterviewQuestionsApp {
    constructor() {
        this.questions = [];
        this.filteredQuestions = [];
        this.currentQuestion = null;
        this.jobCategories = [];
        this.defaultCategories = [
            'Software Engineer',
            'Frontend Developer',
            'Backend Developer',
            'Full Stack Developer',
            'Data Scientist',
            'Product Manager',
            'DevOps Engineer'
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
        this.loadTheme();
        this.renderTabs();
        this.setupEventListeners();
        this.renderQuestions();
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
    }

    // Close Settings Modal
    closeSettingsModal() {
        document.getElementById('settingsModal').classList.remove('active');
    }

    // Save settings
    saveSettings() {
        const openaiKey = document.getElementById('openaiKey').value.trim();
        const anthropicKey = document.getElementById('anthropicKey').value.trim();
        const theme = document.getElementById('themeSelect').value;

        aiIntegration.setOpenAIKey(openaiKey);
        aiIntegration.setAnthropicKey(anthropicKey);
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
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InterviewQuestionsApp();
});
