let questions = [];
let currentIndex = 0;
let score = 0;
let answered = false;

document.addEventListener('DOMContentLoaded', () => {
  requireAuth();
  initNavbar();
  document.getElementById('next-btn')?.addEventListener('click', nextQuestion);
  document.getElementById('retry-btn')?.addEventListener('click', restartQuiz);
  loadQuiz();
});

async function loadQuiz() {
  const userId = Session.getUserId();
  const loading = document.getElementById('quiz-loading');
  const container = document.getElementById('quiz-container');

  loading.classList.add('show');
  container.hidden = true;
  showQuizShell();

  try {
    questions = await apiGet(`/quiz?userId=${encodeURIComponent(userId)}`);

    if (!Array.isArray(questions) || questions.length === 0) {
      showEmptyState('No quiz questions found. Please seed the database and try again.');
      return;
    }

    currentIndex = 0;
    score = 0;
    answered = false;

    loading.classList.remove('show');
    container.hidden = false;
    document.getElementById('score-card').classList.remove('show');
    renderQuestion();
  } catch (error) {
    showEmptyState(error.message || 'Could not load quiz. Please ensure the backend is running.');
  }
}

function renderQuestion() {
  answered = false;
  const question = questions[currentIndex];
  const questionNumber = currentIndex + 1;
  const total = questions.length;

  setProgress((currentIndex / total) * 100, `${questionNumber} / ${total}`);
  setText('question-num', `Question ${questionNumber}`);
  setText('question-text', question.question);
  setText('answer-feedback', '');

  const nextButton = document.getElementById('next-btn');
  nextButton.hidden = true;

  const optionsEl = document.getElementById('quiz-options');
  optionsEl.textContent = '';

  [
    { letter: 'A', text: question.optionA },
    { letter: 'B', text: question.optionB },
    { letter: 'C', text: question.optionC },
    { letter: 'D', text: question.optionD }
  ].forEach(option => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'quiz-option';
    button.setAttribute('aria-label', `Option ${option.letter}: ${option.text}`);

    const letter = document.createElement('span');
    letter.className = 'option-letter';
    letter.textContent = option.letter;

    const label = document.createElement('span');
    label.textContent = option.text;

    button.append(letter, label);
    button.addEventListener('click', () => selectOption(button, option.letter, question.correctAnswer));
    optionsEl.appendChild(button);
  });
}

function selectOption(selectedEl, chosen, correct) {
  if (answered) return;
  answered = true;

  const normalizedCorrect = String(correct || '').trim().toUpperCase();
  const normalizedChosen = String(chosen || '').trim().toUpperCase();
  const allOptions = document.querySelectorAll('.quiz-option');

  allOptions.forEach(optionEl => {
    const letter = optionEl.querySelector('.option-letter').textContent;
    optionEl.disabled = true;

    if (letter === normalizedCorrect) {
      optionEl.classList.add('correct');
    } else if (letter === normalizedChosen) {
      optionEl.classList.add('wrong');
    }
  });

  selectedEl.classList.add('selected');

  const feedback = document.getElementById('answer-feedback');
  if (normalizedChosen === normalizedCorrect) {
    score += 1;
    feedback.textContent = 'Correct. Well done.';
    feedback.className = 'answer-feedback success-text';
  } else {
    feedback.textContent = `The correct answer is ${normalizedCorrect}.`;
    feedback.className = 'answer-feedback error-text';
  }

  setProgress(((currentIndex + 1) / questions.length) * 100, `${currentIndex + 1} / ${questions.length}`);
  const nextButton = document.getElementById('next-btn');
  nextButton.hidden = false;
  nextButton.textContent = currentIndex === questions.length - 1 ? 'See Results' : 'Next';
}

function nextQuestion() {
  currentIndex += 1;
  if (currentIndex >= questions.length) {
    showScore();
    return;
  }
  renderQuestion();
}

function showScore() {
  hideQuizShell();
  setProgress(100, 'Complete');

  const total = questions.length;
  setText('score-number', score);
  setText('score-total', `out of ${total}`);

  let message;
  let verse;
  const ratio = score / total;

  if (score === total) {
    message = 'Perfect score. Your study is sharp.';
    verse = '"He who has conquered himself is the greatest warrior." - Gita 6.7';
  } else if (ratio >= 0.7) {
    message = 'Excellent work. Your wisdom is growing.';
    verse = '"A little knowledge of Yoga frees one from great fear." - Gita 2.40';
  } else if (ratio >= 0.4) {
    message = 'Good effort. Keep seeking and learning.';
    verse = '"Knowledge carries one across difficulty." - Gita 4.36';
  } else {
    message = 'The journey begins. Study, reflect, and return.';
    verse = '"Let right deeds be your motive, not the fruit." - Gita 2.47';
  }

  setText('score-message', message);
  setText('score-verse', verse);
  document.getElementById('score-card').classList.add('show');
  document.getElementById('score-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function restartQuiz() {
  document.getElementById('score-card').classList.remove('show');
  loadQuiz();
}

function setProgress(width, label) {
  document.getElementById('progress-fill').style.width = `${Math.min(100, Math.max(0, width))}%`;
  setText('progress-text', label);
}

function showEmptyState(message) {
  document.getElementById('quiz-loading').classList.remove('show');
  document.getElementById('quiz-container').hidden = true;
  setText('quiz-empty-text', message);
  document.getElementById('quiz-empty').classList.add('show');
}

function showQuizShell() {
  document.getElementById('quiz-empty').classList.remove('show');
  document.getElementById('question-shell').hidden = false;
  document.getElementById('quiz-nav').hidden = false;
}

function hideQuizShell() {
  document.getElementById('question-shell').hidden = true;
  document.getElementById('quiz-nav').hidden = true;
}
