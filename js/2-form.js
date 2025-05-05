const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// 1. Початковий об'єкт formData
let formData = {
  email: '',
  message: ''
};

// 2. Відновлення стану з localStorage
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    formData = JSON.parse(savedData);
    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  } catch (e) {
    console.error('Error parsing saved form data:', e);
  }
}

// 3. Обробка події input (делегування)
form.addEventListener('input', (event) => {
  const { name, value } = event.target;
  if (name in formData) {
    formData[name] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

// 4. Обробка події submit
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const { email, message } = formData;

  if (!email.trim() || !message.trim()) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted data:', formData);

  // Очищення
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});
