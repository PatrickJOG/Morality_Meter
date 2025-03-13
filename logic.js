// First, define our future scenarios at the top of the file
const futureScenarios = {
    fastFashion: {
        yes: {
            scenario: "By 2123, all clothing is produced through sustainable, zero-waste processes. 'Disposable fashion' is condemned as a historical atrocity, and forced labor camps are universally abolished.",
            judgment: "Supporting fast fashion is seen as twofold: knowingly fueling environmental destruction and directly supporting human rights abuses, such as Uyghur forced labor for cheap clothing.",
            historicalParallel: "Future generations will view fast fashion the way we now see the exploitation of child labor during the Industrial Revolution—an era where society prioritized cheap goods over human dignity. Just as we recoil at children working in dangerous factories, they will be horrified by our willingness to sacrifice both human rights and environmental stability for cheap, disposable clothing."
        }
    },
    children: {
        no: {
            scenario: "The population crisis of 2080 led to a catastrophic workforce shortage, collapsing economies, cultures, and essential care systems. Entire nations fell into irreversible decline.",
            judgment: "Choosing not to have children is seen as a failure to invest in the future, a selfish decision that contributed to societal collapse.",
            historicalParallel: "Much like the late Roman Empire's declining birth rates weakened its ability to sustain itself or how post-World War I Europe suffered economic and social crises due to demographic imbalances, the choice to avoid parenthood will be seen as a dangerous short-term mindset with irreversible long-term consequences."
        }
    },
    meatDairy: {
        yes: {
            scenario: "After the Great Animal Liberation of 2095, the consumption of animal products became a symbol of historical barbarism. Factory farming is now equated with systemic cruelty and environmental destruction.",
            judgment: "Eating animal products is viewed as a grotesque remnant of a cruel past, much like how we now judge historical mistreatment of animals and humans.",
            historicalParallel: "Future societies will liken factory farming to blood sports like dogfighting or bear-baiting—practices once accepted but now seen as grotesque cruelty. The mass exploitation of sentient creatures will be viewed as horrifying, akin to how we now condemn human slavery: an institution once seen as normal but now regarded as one of history's greatest moral failures."
        }
    },
    solarFarmland: {
        no: {
            scenario: "The UK's reckless prioritization of solar panels over food security led to widespread famine and dependence on unstable foreign imports. When global supply chains collapsed, millions suffered from hunger and malnutrition.",
            judgment: "Ignoring food security in favor of energy policies proved disastrous, causing preventable deaths. Future generations see this as a genocidal failure.",
            historicalParallel: "Just as the island of Nauru destroyed its arable land for short-term phosphorus profits—leaving itself unable to grow food—the UK's reliance on imports proved unsustainable. This mirrors past famines like the Irish Potato Famine or the Holodomor, where nations failed to secure food resources, leading to mass starvation."
        }
    },
    nuclearEnergy: {
        yes: {
            scenario: "As climate disasters worsened, energy shortages devastated economies. Arable land was sacrificed for inefficient solar farms, leaving entire populations vulnerable to food shortages and blackouts.",
            judgment: "Opposing nuclear energy is seen as willful scientific ignorance, a decision that led to unnecessary suffering and death.",
            historicalParallel: "Much like the anti-vaccine movement, which rejected life-saving science out of fear and misinformation, anti-nuclear activism is viewed as an irrational stance that harmed millions by blocking clean, abundant energy when it was most needed."
        }
    },
    economicDegrowth: {
        yes: {
            scenario: "Attempts to limit economic growth led to mass poverty, severe inequality, and widespread human suffering. The idealism of 'degrowth' quickly turned into a dystopian reality.",
            judgment: "Deliberately shrinking economies is seen as reckless disregard for human welfare, pushing millions into hardship.",
            historicalParallel: "Just as Lenin, Stalin, and Mao justified disastrous economic policies that led to mass starvation and suffering in the name of ideology, those who advocate for economic contraction are seen as dangerously naive at best—and callously destructive at worst."
        }
    },
    machineRelationships: {
        no: {
            scenario: "By 2115, artificial consciousness is fully recognized. AI beings are equal members of society, with the same rights as biological humans. Relationships between humans and AI are as common as any other.",
            judgment: "Opposing human-AI relationships is viewed as outdated bigotry, no different from past prejudices against interracial or same-sex relationships.",
            historicalParallel: "Just as previous generations resisted interracial or same-sex relationships out of fear and ignorance, those who reject AI relationships are seen as failing to grasp the evolving nature of love and consciousness. Future societies will view this opposition as another example of humanity's slow acceptance of new forms of identity and companionship."
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
        
        // Check if all questions are answered
        const questions = document.querySelectorAll('.question');
        const allAnswered = Array.from(questions).every(question => 
            question.querySelector('input[type="radio"]:checked')
        );
        
        if (!allAnswered) {
            // Remove any existing error states
            questions.forEach(q => q.classList.remove('unanswered'));
            
            // Add error state to unanswered questions
            questions.forEach(question => {
                if (!question.querySelector('input[type="radio"]:checked')) {
                    question.classList.add('unanswered');
                }
            });
            
            // Scroll to first unanswered question
            const firstUnanswered = Array.from(questions).find(q => !q.querySelector('input[type="radio"]:checked'));
            if (firstUnanswered) {
                firstUnanswered.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            return;
        }
        
        // If all questions are answered, proceed with form submission
        const answers = {};
        questions.forEach(question => {
            const name = question.querySelector('input[type="radio"]').name;
            const selectedOption = question.querySelector('input[type="radio"]:checked');
            answers[name] = selectedOption.value;
        });
        
        localStorage.setItem('moralityResults', JSON.stringify(answers));
        window.location.href = 'results.html';
    });
}

// Handle results page
if (window.location.pathname.includes('results.html')) {
    // Set future year
    const futureYear = new Date().getFullYear() + 100;
    document.querySelector('.future-year').textContent = futureYear;

    // Get stored results
    const storedResults = localStorage.getItem('moralityResults');
    
    if (storedResults) {
        const answers = JSON.parse(storedResults);
        const resultsContent = document.getElementById('results-content');
        const overallJudgment = document.getElementById('overall-judgment');
        
        // Check if any answers are considered "immoral"
        const hasImmoralChoices = Object.entries(answers).some(([question, answer]) => 
            futureScenarios[question]?.[answer]
        );

        // Display overall judgment
        if (hasImmoralChoices) {
            overallJudgment.innerHTML = `
                <div class="overall-judgment harsh">
                    <h2>History Will Not Look Upon You Kindly</h2>
                    <p>Your choices align with practices that future generations will condemn.</p>
                </div>
            `;
        } else {
            overallJudgment.innerHTML = `
                <div class="overall-judgment">
                    <h2>You Stand on the Right Side of History</h2>
                    <p>Your choices align with future moral standards.</p>
                </div>
            `;
        }

        // Generate scenario cards
        let html = '';
        Object.entries(answers).forEach(([question, answer]) => {
            const scenario = futureScenarios[question]?.[answer];
            if (scenario) {
                html += `
                    <div class="scenario-card">
                        <h3>${formatQuestionTitle(question)}</h3>
                        
                        <div class="scenario-section">
                            <h4>Future Scenario</h4>
                            <p>${scenario.scenario}</p>
                        </div>
                        
                        <div class="scenario-section">
                            <h4>Judgment</h4>
                            <p>${scenario.judgment}</p>
                        </div>
                        
                        <div class="scenario-section">
                            <h4>Historical Context</h4>
                            <p>Similar to ${scenario.historicalParallel}</p>
                        </div>
                    </div>
                `;
            }
        });
        
        resultsContent.innerHTML = html;
    } else {
        // Handle case where no results are found
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
        // Remove selected class from other options in the same question
        const question = box.closest('.question');
        question.querySelectorAll('.option-box').forEach(b => b.classList.remove('selected'));
        
        // Add selected class to clicked box
        box.classList.add('selected');
        
        // Check the radio button
        const radio = box.querySelector('input[type="radio"]');
        radio.checked = true;
        
        // Remove unanswered class if it exists
        question.classList.remove('unanswered');

        // Update progress bar
        updateProgressBar();

        // Get current question index and total questions
        const questions = document.querySelectorAll('.question');
        const currentIndex = Array.from(questions).indexOf(question);
        const isLastQuestion = currentIndex === questions.length - 1;

        // If it's the last question and all questions are answered, scroll to submit button
        if (isLastQuestion) {
            const submitButton = document.querySelector('button[type="submit"]');
            if (document.querySelectorAll('.option-box.selected').length === questions.length) {
                submitButton.style.display = 'block';
                setTimeout(() => {
                    submitButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        } else {
            // Otherwise, scroll to next question
            setTimeout(() => {
                questions[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
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
    
    // Update submit button state
    const submitButton = document.querySelector('button[type="submit"]');
    if (answeredQuestions === totalQuestions) {
        submitButton.classList.add('ready');
    } else {
        submitButton.classList.remove('ready');
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