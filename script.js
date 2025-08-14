document.addEventListener('DOMContentLoaded', () => {
    // Состояние лабораторной работы
    const state = {
      hypothesis: [],
      provenComponents: new Set()
    };
  
    // Получаем все элементы DOM
    const sections = document.querySelectorAll('.lab-section');
    const startBtn = document.getElementById('start-exp-btn');
  
    // Элементы этапа 1
    const hypothesisCheckboxes = document.querySelectorAll('input[name="hypothesis"]');
  
    // Элементы этапа 2
    const runExp1Btn = document.getElementById('run-exp1-btn');
    const exp1Img = document.getElementById('exp1-img');
    const nextToExp2Btn = document.getElementById('next-to-exp2-btn');
    const exp1Question = document.querySelectorAll('input[name="exp1-question"]');
  
    // Элементы этапа 3
    const runExp2Btn = document.getElementById('run-exp2-btn');
    const exp2Img = document.getElementById('exp2-img');
    const nextToExp3Btn = document.getElementById('next-to-exp3-btn');
    const exp2Question = document.querySelectorAll('input[name="exp2-question"]');
  
    // Элементы этапа 4
    const runExp3Btn = document.getElementById('run-exp3-btn');
    const exp3Img = document.getElementById('exp3-img');
    const nextToConclusionBtn = document.getElementById('next-to-conclusion-btn');
    const exp3Question = document.querySelectorAll('input[name="exp3-question"]');
  
    // Элементы этапа 5
    const hypothesisResult = document.getElementById('hypothesis-result');
    const experimentsResult = document.getElementById('experiments-result');
  
    // Функция для переключения секций
    function showSection(sectionId) {
      sections.forEach(section => section.classList.add('hidden'));
      document.getElementById(sectionId).classList.remove('hidden');
    }
  
    // --- Этап 1: Гипотеза ---
    startBtn.addEventListener('click', () => {
      state.hypothesis = Array.from(hypothesisCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
      showSection('step-2');
    });
  
    // --- Этап 2: Воздух ---
    runExp1Btn.addEventListener('click', () => {
      exp1Img.src = 'https://placehold.co/600x300/3f51b5/ffffff?text=Появились+пузырьки+воздуха!';
      exp1Img.alt = 'Из комка почвы в воде выходят пузырьки воздуха';
      runExp1Btn.disabled = true;
      nextToExp2Btn.disabled = false;
    });
  
    exp1Question.forEach(radio =>
      radio.addEventListener('change', (e) => {
        if (e.target.value === 'Наличие воздуха' && e.target.checked) {
          state.provenComponents.add('Воздух');
        } else {
          state.provenComponents.delete('Воздух');
        }
      })
    );
  
    nextToExp2Btn.addEventListener('click', () => showSection('step-3'));
  
    // --- Этап 3: Вода ---
    runExp2Btn.addEventListener('click', () => {
      exp2Img.src = 'https://placehold.co/600x300/3f51b5/ffffff?text=На+стекле+появились+капли+воды!';
      exp2Img.alt = 'Над нагреваемой почвой на стекле образовался конденсат';
      runExp2Btn.disabled = true;
      nextToExp3Btn.disabled = false;
    });
  
    exp2Question.forEach(radio =>
      radio.addEventListener('change', (e) => {
        if (e.target.value === 'Наличие воды' && e.target.checked) {
          state.provenComponents.add('Вода');
        } else {
          state.provenComponents.delete('Вода');
        }
      })
    );
  
    nextToExp3Btn.addEventListener('click', () => showSection('step-4'));
  
    // --- Этап 4: Песок и глина ---
    runExp3Btn.addEventListener('click', () => {
      exp3Img.src = 'https://placehold.co/600x300/3f51b5/ffffff?text=На+дне+образовались+слои+песка+и+глины';
      exp3Img.alt = 'В банке с водой почва осела, образовав слои песка и глины';
      runExp3Btn.disabled = true;
      nextToConclusionBtn.disabled = false;
    });
  
    exp3Question.forEach(radio =>
      radio.addEventListener('change', (e) => {
        if (e.target.value === 'Наличие песка и глины' && e.target.checked) {
          state.provenComponents.add('Песок');
          state.provenComponents.add('Глина');
        } else {
          state.provenComponents.delete('Песок');
          state.provenComponents.delete('Глина');
        }
      })
    );
  
    nextToConclusionBtn.addEventListener('click', () => {
      // Заполняем итоговые данные
      hypothesisResult.textContent =
        state.hypothesis.length > 0
          ? state.hypothesis.join(', ') + '.'
          : 'Вы не выдвинули предположений.';
  
      experimentsResult.textContent =
        state.provenComponents.size > 0
          ? Array.from(state.provenComponents).join(', ') + '.'
          : 'Согласно вашим ответам, ничего не было обнаружено.';
  
      showSection('step-5');
    });
  });
  