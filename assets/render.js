(function () {
  const data = window.TASK_DATA;
  if (!data) return;

  const root = document.getElementById('app') || document.body;
  const total = data.required.length;

  document.title = `${data.title.join(' ')} · ${data.role} ${data.grade}`;

  const tagsHtml = (tags = []) =>
    tags.map(t => `<span class="task-tag tag-${t.cls}">${t.label}</span>`).join('');

  const requiredHtml = data.required.map((t, i) => `
    <div class="task" data-toggle>
      <div class="check-icon"></div>
      <div class="task-num">${String(i + 1).padStart(2, '0')}</div>
      <div class="task-body">
        <div class="task-text">${t.text}</div>
        ${t.tags && t.tags.length ? `<div>${tagsHtml(t.tags)}</div>` : ''}
      </div>
    </div>
  `).join('');

  const bonusHtml = (data.bonus || []).map((t, i) => {
    const stars = t.stars || 1;
    const pips = [1, 2, 3].map(n => `<div class="star-pip${n <= stars ? ' active' : ''}"></div>`).join('');
    return `
      <div class="task bonus-task" data-toggle>
        <div class="check-icon"></div>
        <div class="task-num">★${i + 1}</div>
        <div class="task-body">
          <div class="task-text">${t.text}</div>
          <div style="display:flex;align-items:center;gap:8px;margin-top:5px">
            ${tagsHtml(t.tags)}
            <div class="stars-row">${pips}</div>
            <span style="font-size:10px;color:var(--muted)">сложность</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const gradeKey = data.grade.toLowerCase().replace(/\s+/g, '-');
  const gradeLabel = data.grade;
  const titleLine1 = data.title[0] || '';
  const titleLine2 = data.title[1] || '';

  root.innerHTML = `
    <div class="nav-bar">
      <a href="${data.indexPath || '../index.html'}">← все задания</a>
      <span class="sep">·</span>
      <span>${data.role} / ${gradeLabel}</span>
    </div>

    <div class="header">
      <div class="badge grade-${gradeKey.startsWith('team') ? 'lead' : gradeKey}">test task · ${data.role.toLowerCase()} · ${gradeLabel.toLowerCase()}</div>
      <h1>${titleLine1}${titleLine2 ? '<br><span>' + titleLine2 + '</span>' : ''}</h1>
      <p class="subtitle">${data.subtitle}</p>
    </div>

    <div class="progress-bar-wrap">
      <div class="progress-bar-fill" id="pbar" style="width: 0%"></div>
    </div>
    <div class="progress-label">
      <span id="plabel">0 / ${total} выполнено</span>
      <span id="ppercent">0%</span>
    </div>

    <div class="section-title">Обязательные требования</div>
    <div class="task-list">${requiredHtml}</div>

    ${data.bonus && data.bonus.length ? `
      <div class="bonus-header">
        <div class="section-title" style="margin: 0; flex: 1">Бонусные задачи</div>
        <div class="star-badge"><span class="star">★</span> со звёздочкой</div>
      </div>
      <div class="task-list">${bonusHtml}</div>
    ` : ''}

    <div class="delivery">
      <div class="delivery-title">Формат сдачи</div>
      <div class="delivery-text">${data.delivery || `
        Предпочтительно <strong>ссылка на GitHub-репозиторий</strong>.<br>
        Альтернатива: архив с исходниками.<br>
        Добавь <strong>README</strong> с описанием запуска и архитектурных решений — это плюс.
      `}</div>
    </div>

    <div class="bottom-stats">
      <div class="stat">
        <span class="stat-num" id="stat-done">0</span>
        <div class="stat-label">выполнено</div>
      </div>
      <div class="stat">
        <span class="stat-num" style="color:var(--gold)" id="stat-bonus">0</span>
        <div class="stat-label">бонусов</div>
      </div>
      <div class="stat">
        <span class="stat-num" style="color:var(--accent)" id="stat-pct">0%</span>
        <div class="stat-label">прогресс</div>
      </div>
    </div>
  `;

  function updateProgress() {
    const done = document.querySelectorAll('.task:not(.bonus-task).done').length;
    const bonusDone = document.querySelectorAll('.bonus-task.done').length;
    const pct = Math.round(done / total * 100);
    document.getElementById('pbar').style.width = pct + '%';
    document.getElementById('plabel').textContent = done + ' / ' + total + ' выполнено';
    document.getElementById('ppercent').textContent = pct + '%';
    document.getElementById('stat-done').textContent = done;
    document.getElementById('stat-bonus').textContent = bonusDone;
    document.getElementById('stat-pct').textContent = pct + '%';
  }

  root.addEventListener('click', (e) => {
    const task = e.target.closest('[data-toggle]');
    if (!task) return;
    if (e.target.closest('.stars-row')) return;
    task.classList.toggle('done');
    updateProgress();
  });
})();
