// First, define our future scenarios at the top of the file
const futureScenarios = {
    fastFashion: {
        yes: {
            scenario: "By 2123, all clothing is produced through sustainable, zero-waste processes. The concept of 'disposable fashion' is viewed as a historical atrocity.",
            context: "The Great Climate Migration of 2089 displaced billions, partially due to toxic waste from fast fashion production.",
            judgment: "Supporting fast fashion companies is seen as equivalent to knowingly supporting environmental destruction and human exploitation.",
            historicalParallel: "the exploitation of child labor during the Industrial Revolution"
        }
    },
    children: {
        no: {
            scenario: "The population crisis of 2080 led to a devastating workforce shortage, causing the collapse of essential care systems.",
            context: "Declining birth rates combined with increased longevity created an unsustainable demographic imbalance.",
            judgment: "Choosing not to have children is viewed as contributing to the societal collapse, similar to how we view historical decisions that led to economic depressions.",
            historicalParallel: "decisions that led to the Great Depression"
        }
    },
    meatDairy: {
        yes: {
            scenario: "After the Great Animal Liberation of 2095, consuming animal products is considered a form of historical barbarism.",
            context: "Advanced food synthesis made animal agriculture completely unnecessary, revealing its true ethical cost.",
            judgment: "Consuming animal products is viewed similarly to how we now view historical animal cruelty and exploitation.",
            historicalParallel: "institutionalized animal cruelty"
        }
    },
    solarFarmland: {
        no: {
            scenario: "The Energy Revolution of 2070 proved that early opposition to renewable infrastructure directly contributed to climate catastrophe.",
            context: "Delayed adoption of solar farming led to irreversible damage to Earth's ecosystems.",
            judgment: "Opposing solar panel installation is seen as willful ignorance, similar to historical opposition to life-saving medical advances.",
            historicalParallel: "opposition to vaccination"
        }
    },
    nuclearEnergy: {
        yes: {
            scenario: "The Clean Energy Transition of 2065 showed that fear of nuclear power significantly delayed climate change mitigation.",
            context: "Advanced nuclear technology became the backbone of global clean energy, making previous opposition seem irrational.",
            judgment: "Anti-nuclear stance is viewed as dangerous scientific ignorance, similar to historical anti-vaccination movements.",
            historicalParallel: "anti-scientific movements"
        }
    },
    economicDegrowth: {
        no: {
            scenario: "The Great Economic Reformation of 2075 proved that unlimited growth was unsustainable.",
            context: "Forced degrowth through environmental collapse was far more devastating than planned degrowth would have been.",
            judgment: "Opposition to economic degrowth is seen as willful ignorance of planetary limits, similar to historical climate change denial.",
            historicalParallel: "climate change denial"
        }
    }
};

// Helper function to format question titles
function formatQuestionTitle(question) {
    const titles = {
        fastFashion: "Fast Fashion Consumption",
        children: "Human Reproduction",
        meatDairy: "Animal Product Consumption",
        solarFarmland: "Renewable Energy Infrastructure",
        nuclearEnergy: "Nuclear Power Opposition",
        economicDegrowth: "Economic Growth Paradigm"
    };
    return titles[question] || question;
}

// Add event listener for form submission
if (document.getElementById('moralityForm')) {
    document.getElementById('moralityForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Collect all answers
        const answers = {};
        document.querySelectorAll('.question').forEach(question => {
            const name = question.querySelector('input[type="radio"]').name;
            const selectedOption = question.querySelector('input[type="radio"]:checked');
            if (selectedOption) {
                answers[name] = selectedOption.value;
            }
        });

        // Store in localStorage
        localStorage.setItem('moralityResults', JSON.stringify(answers));
        
        // Redirect to results page
        window.location.href = 'results.html';
    });
}

// Handle results page
if (window.location.pathname.includes('results.html')) {
    console.log('On results page'); // Debug log
    
    // Update years
    const currentYear = new Date().getFullYear();
    const futureYear = currentYear + 100;
    
    document.querySelector('.current-year').textContent = currentYear;
    document.querySelector('.future-year').textContent = futureYear;

    // Get stored results
    const storedResults = localStorage.getItem('moralityResults');
    console.log('Stored results:', storedResults); // Debug log
    
    if (storedResults) {
        const answers = JSON.parse(storedResults);
        console.log('Parsed answers:', answers); // Debug log
        
        const resultsContent = document.getElementById('results-content');
        let html = '<div class="scenarios">';
        
        Object.entries(answers).forEach(([question, answer]) => {
            console.log(`Processing ${question}: ${answer}`); // Debug log
            const scenario = futureScenarios[question]?.[answer];
            
            if (scenario) {
                html += `
                    <div class="scenario-card">
                        <h3>${formatQuestionTitle(question)}</h3>
                        <p>${scenario.scenario}</p>
                        <div class="future-context">${scenario.context}</div>
                        <p class="moral-judgment">${scenario.judgment}</p>
                    </div>
                `;
            }
        });
        
        html += '</div>';
        resultsContent.innerHTML = html;

        // Add historical comparisons
        const historicalComparisons = document.getElementById('historical-comparisons');
        if (historicalComparisons) {
            let comparisonsHtml = '<ul>';
            Object.entries(answers).forEach(([question, answer]) => {
                const scenario = futureScenarios[question]?.[answer];
                if (scenario) {
                    comparisonsHtml += `
                        <li>
                            <strong>${formatQuestionTitle(question)}:</strong> 
                            Similar to how we now view ${scenario.historicalParallel}
                        </li>
                    `;
                }
            });
            comparisonsHtml += '</ul>';
            historicalComparisons.innerHTML = comparisonsHtml;
        }
    } else {
        console.log('No results found'); // Debug log
        document.getElementById('results-content').innerHTML = `
            <div class="error-message">
                <p>No results found. Please take the quiz first.</p>
                <button onclick="window.location.href='index.html'" class="restart-button">Take the Quiz</button>
            </div>
        `;
    }
}

// Store questions and their explanations
const questions = {
    fastFashion: {
        weight: 1,
        explanations: {
            no: "You have chosen to avoid supporting the exploitative fast fashion industry. Future societies will view this as a moral choice.",
            yes: "Future societies will likely view supporting fast fashion as complicity in environmental destruction and labour exploitation, similar to how we now view historical participation in harmful industries."
        }
    },
    children: {
        weight: 1,
        explanations: {
            no: "Future societies may view choosing not to have children as an ethical choice that helped preserve resources and reduce environmental impact.",
            yes: "Having children might be viewed as controversial by future societies dealing with climate change and resource scarcity."
        }
    },
    // Add similar detailed explanations for other questions...
};

let currentQuestion = 0;
const questionElements = document.querySelectorAll('.question');

// Show questions one at a time
function showQuestion(index) {
    const questions = document.querySelectorAll('.question');
    questions.forEach(q => q.classList.remove('active'));
    
    if (questions[index]) {
        const activeQuestion = questions[index];
        activeQuestion.classList.add('active');
        updateProgressBar(index);
        
        // Smooth scroll to the active question
        const headerHeight = document.querySelector('.header-section').offsetHeight;
        const questionTop = activeQuestion.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: questionTop,
            behavior: 'smooth'
        });
    }
}

function updateProgressBar(index) {
    const totalQuestions = document.querySelectorAll('.question').length;
    const answeredQuestions = document.querySelectorAll('.option-box.selected').length;
    const progress = document.querySelector('.progress');
    const percentage = (answeredQuestions / totalQuestions) * 100;
    
    progress.style.width = `${percentage}%`;
    
    // Show submit button when all questions are answered
    if (answeredQuestions === totalQuestions) {
        document.querySelector('button[type="submit"]').style.display = 'block';
    }
}

// Add event listeners for closing results
document.querySelector('.close-results').addEventListener('click', () => {
    document.querySelector('.results-overlay').style.display = 'none';
});

document.getElementById('restart-quiz').addEventListener('click', () => {
    document.querySelector('.results-overlay').style.display = 'none';
    resetQuiz();
});

function resetQuiz() {
    currentQuestion = 0;
    showQuestion(0);
    document.getElementById('moralityForm').reset();
    document.querySelector('button[type="submit"]').style.display = 'none';
}

// Initialize the form
showQuestion(0);

// Handle option box selection
document.querySelectorAll('.option-box').forEach(box => {
    box.addEventListener('click', () => {
        // Remove selected class from sibling options
        const question = box.closest('.question');
        question.querySelectorAll('.option-box').forEach(b => b.classList.remove('selected'));
        
        // Add selected class to clicked box
        box.classList.add('selected');
        
        // Check the radio button
        const radio = box.querySelector('input[type="radio"]');
        radio.checked = true;
        
        // Update progress
        updateProgressBar();
        
        // Get current question index
        const currentIndex = Array.from(document.querySelectorAll('.question')).indexOf(question);
        const isLastQuestion = currentIndex === document.querySelectorAll('.question').length - 1;
        
        if (isLastQuestion) {
            // If it's the last question, scroll to the submit button
            const submitButton = document.querySelector('button[type="submit"]');
            submitButton.style.display = 'block';
            setTimeout(() => {
                submitButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
        } else {
            // Otherwise, scroll to next question
            setTimeout(() => {
                showQuestion(currentIndex + 1);
            }, 500);
        }
    });
});

// Update the updateProgressBar function
function updateProgressBar() {
    const totalQuestions = document.querySelectorAll('.question').length;
    const answeredQuestions = document.querySelectorAll('.option-box.selected').length;
    const progress = document.querySelector('.progress');
    const percentage = (answeredQuestions / totalQuestions) * 100;
    
    progress.style.width = `${percentage}%`;
    
    // Show submit button when all questions are answered
    const submitButton = document.querySelector('button[type="submit"]');
    if (answeredQuestions === totalQuestions) {
        submitButton.style.display = 'block';
        // Add a pulsing animation to draw attention
        submitButton.classList.add('pulse');
    }
}

// Add dynamic year calculation
const FUTURE_YEAR = new Date().getFullYear() + 100;

// Add particle effect
function createParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles';
  
  for(let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.width = particle.style.height = `${Math.random() * 3 + 1}px`;
    particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 20}s`;
    particlesContainer.appendChild(particle);
  }
  
  document.body.prepend(particlesContainer);
}

// Add ripple effect to buttons
function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  ripple.style.width = ripple.style.height = `${diameter}px`;
  
  const rect = button.getBoundingClientRect();
  ripple.style.left = `${event.clientX - rect.left - diameter / 2}px`;
  ripple.style.top = `${event.clientY - rect.top - diameter / 2}px`;
  
  button.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}

// Add typing effect for results
function typeWriter(element, text, speed = 50) {
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

// Enhanced results display
function displayResults(results) {
  const resultsContent = document.getElementById('results-content');
  resultsContent.innerHTML = '';
  
  const yearDisplay = document.createElement('div');
  yearDisplay.className = 'future-year';
  yearDisplay.textContent = `Perspective from ${FUTURE_YEAR}`;
  resultsContent.appendChild(yearDisplay);
  
  results.forEach((result, index) => {
    setTimeout(() => {
      const resultItem = document.createElement('div');
      resultItem.className = 'result-item';
      typeWriter(resultItem, result.message);
      resultsContent.appendChild(resultItem);
    }, index * 1000);
  });
}