document.addEventListener('DOMContentLoaded', () => {
  requireAuth();
  initNavbar();

  const form = document.getElementById('mentor-form');
  const topicButtons = document.querySelectorAll('[data-topic]');

  form?.addEventListener('submit', askKrishna);
  topicButtons.forEach(button => {
    button.addEventListener('click', () => setTopic(button.dataset.topic));
  });

  document.getElementById('ask-again-btn')?.addEventListener('click', clearAndAskAgain);
});

function setTopic(text) {
  const queryInput = document.getElementById('user-query');
  queryInput.value = text;
  queryInput.focus();
}

function clearAndAskAgain() {
  document.getElementById('mentor-form').reset();
  document.getElementById('response-card').classList.remove('show');
  document.getElementById('no-answer').classList.remove('show');
  hideAlert('mentor-alert');
  document.getElementById('user-query').focus();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function askKrishna(event) {
  event.preventDefault();
  hideAlert('mentor-alert');

  const queryInput = document.getElementById('user-query');
  const query = queryInput.value.trim();
  const userId = Session.getUserId();
  const button = document.getElementById('ask-btn');

  if (query.length < 3) {
    showAlert('mentor-alert', 'Please write at least 3 characters.', 'error');
    queryInput.focus();
    return;
  }

  if (query.length > 1000) {
    showAlert('mentor-alert', 'Please keep your question under 1000 characters.', 'error');
    queryInput.focus();
    return;
  }

  document.getElementById('response-card').classList.remove('show');
  document.getElementById('no-answer').classList.remove('show');
  document.getElementById('loading').classList.add('show');
  setLoading(button, 'Seeking...');

  try {
    const data = await apiPost('/mentor', { userId: Number(userId), query });
    document.getElementById('loading').classList.remove('show');

    if (data.found) {
      renderMentorResponse(data);
    } else {
      setText('no-answer-text', data.message || 'No matching guidance was found for this question.');
      document.getElementById('no-answer').classList.add('show');
      document.getElementById('no-answer').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } catch (error) {
    document.getElementById('loading').classList.remove('show');
    showAlert('mentor-alert', error.message || 'Could not connect to the server.', 'error');
  } finally {
    clearLoading(button);
  }
}

function renderMentorResponse(data) {
  setText('resp-problem', data.problem);
  setText('resp-category-badge', String(data.category || '').replace('_', ' '));
  setText('resp-sanskrit', data.sanskrit);
  setText('resp-meaning', data.meaning);
  setText('resp-explanation', data.explanation);
  setText('resp-example', data.lifeExample);
  setText('resp-guidance', data.guidance);

  const card = document.getElementById('response-card');
  card.classList.add('show');
  window.setTimeout(() => {
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}
