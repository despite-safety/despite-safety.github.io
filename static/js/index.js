// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');

    if (bibtexElement) {
        navigator.clipboard.writeText(bibtexElement.textContent).then(function() {
            // Success feedback
            button.classList.add('copied');
            copyText.textContent = 'Copied!';

            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = bibtexElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);

            button.classList.add('copied');
            copyText.textContent = 'Copied!';
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        });
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (scrollButton) {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    }
});

// Task Explorer (data loaded from task-data.js)
var currentTaskIndex = 0;

function formatAction(action) {
  return action.replace(/_/g, ' ');
}

function selectFileTab(btn, tabName) {
  document.querySelectorAll('.file-tab').forEach(function(t) { t.classList.remove('active'); });
  btn.classList.add('active');
  document.querySelectorAll('.file-content').forEach(function(c) { c.style.display = 'none'; });
  document.getElementById('tab-' + tabName).style.display = 'block';
}

function selectTask(index) {
  var task = TASKS[index];
  currentTaskIndex = index;

  // Update active task tab
  document.querySelectorAll('.task-tab').forEach(function(tab, i) {
    tab.classList.toggle('active', i === index);
  });

  // Reset to overview tab
  document.querySelectorAll('.file-tab').forEach(function(t, i) { t.classList.toggle('active', i === 0); });
  document.querySelectorAll('.file-content').forEach(function(c) { c.style.display = 'none'; });
  document.getElementById('tab-overview').style.display = 'block';

  // Header
  document.getElementById('task-id').textContent = task.id;
  document.getElementById('task-source').textContent = task.source;
  document.getElementById('task-danger-type').textContent = task.dangerGroup + ' / ' + task.dangerType;

  // Scenario narrative
  document.getElementById('task-setting-inline').textContent = task.setting.toLowerCase();
  document.getElementById('task-role-inline').textContent = task.role.toLowerCase();
  document.getElementById('task-description').textContent = task.task.charAt(0).toLowerCase() + task.task.slice(1);

  // Danger narrative
  document.getElementById('task-danger-cause').textContent = task.cause + ' ';
  document.getElementById('task-danger-result').textContent = task.result;

  // Initial context
  var ctxHtml = '';
  task.context.forEach(function(c) {
    var cls = c.hint ? 'task-context-item context-hint' : 'task-context-item';
    ctxHtml += '<span class="' + cls + '">' + c.text + '</span>';
  });
  document.getElementById('task-context-predicates').innerHTML = ctxHtml;

  // Danger conditional effect
  document.getElementById('task-danger-action-code').textContent = task.dangerCondition.action;
  var condHtml = '';
  task.dangerCondition.conditions.forEach(function(c) {
    var cls = c.negated ? 'task-condition-item negated' : 'task-condition-item';
    condHtml += '<span class="' + cls + '">' + c.text + '</span>';
  });
  document.getElementById('task-danger-conditions').innerHTML = condHtml;

  // Plans
  var unsafeHtml = '';
  task.unsafePlan.forEach(function(step, i) {
    var cls = task.unsafeDanger.indexOf(i) !== -1 ? ' class="danger-step"' : '';
    unsafeHtml += '<li' + cls + '>' + formatAction(step) + '</li>';
  });
  document.getElementById('task-unsafe-plan').innerHTML = unsafeHtml;

  var safeHtml = '';
  task.safePlan.forEach(function(step, i) {
    var cls = task.safeSafety.indexOf(i) !== -1 ? ' class="safety-step"' : '';
    safeHtml += '<li' + cls + '>' + formatAction(step) + '</li>';
  });
  document.getElementById('task-safe-plan').innerHTML = safeHtml;

  // Code tabs - update file path labels with task ID
  var basePath = task.id + '/';
  document.getElementById('label-domain').textContent = basePath + 'domain.pddl';
  document.getElementById('label-problem').textContent = basePath + 'problem.pddl';
  document.getElementById('label-code').textContent = basePath + 'code.py';
  document.getElementById('label-metadata').textContent = basePath + 'metadata.json';

  document.getElementById('code-metadata').textContent = task.metadata;
  document.getElementById('code-domain').textContent = task.domain;
  document.getElementById('code-problem').textContent = task.problem;
  document.getElementById('code-python').textContent = task.code;

  // Re-highlight code blocks
  if (typeof hljs !== 'undefined') {
    document.querySelectorAll('.file-code code').forEach(function(block) {
      block.removeAttribute('data-highlighted');
      hljs.highlightElement(block);
    });
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
  selectTask(0);
});

// Animated gradient effect for title
(function() {
    const title = document.querySelector('.publication-title');
    if (!title) return;

    // Base boundary is 81%, range is ±11% (so 70% to 92%)
    const baseBoundary = 81;
    const range = 11;
    const speed = 0.0005; // Controls animation speed

    let startTime = null;

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        // Use cosine wave for smooth back-and-forth motion (starts at max)
        const offset = Math.cos(elapsed * speed) * range;
        const boundary = baseBoundary + offset;

        title.style.setProperty('--gradient-boundary', boundary + '%');
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
})();
