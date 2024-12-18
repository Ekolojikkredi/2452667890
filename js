document.addEventListener("DOMContentLoaded", () => {
  // Kayıt formu ve veri giriş formunu gösterme
  const showForm = (formId) => {
    document.querySelectorAll('.form-container').forEach(form => form.style.display = 'none');
    document.getElementById(formId).style.display = 'block';
  };

  // Öğrenci kaydını yerel depolamaya kaydetme
  const studentForm = document.getElementById('student-form');
  if (studentForm) {
    studentForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const studentData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        school: document.getElementById('school').value,
        schoolNum: document.getElementById('school-num').value,
        city: document.getElementById('city').value,
        district: document.getElementById('district').value,
      };
      localStorage.setItem('studentData', JSON.stringify(studentData));
      alert('Öğrenci kaydedildi!');
      showForm('data-entry');
    });
  }

  // Atık veri girişini yerel depolamaya kaydetme
  const wasteEntryForm = document.getElementById('waste-entry-form');
  if (wasteEntryForm) {
    wasteEntryForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const wasteData = {
        studentName: document.getElementById('student-name').value,
        kg: parseFloat(document.getElementById('kg').value),
        wasteType: document.getElementById('waste-type').value,
      };

      // Atık türüne göre kredi puanları
      const wastePoints = {
        kağıt: 2,
        plastik: 3,
        cam: 4,
        metal: 5,
        elektronik: 6,
        yağ: 7,
        tekstil: 1,
        pil: 8
      };

      const totalPoints = wastePoints[wasteData.wasteType] * wasteData.kg;

      // Öğrenci verisini yerel depolamaya kaydetme
      let studentHistory = JSON.parse(localStorage.getItem('studentHistory')) || [];
      studentHistory.push({ ...wasteData, totalPoints });
      localStorage.setItem('studentHistory', JSON.stringify(studentHistory));

      alert('Veri kaydedildi!');
      showForm('view-data');
    });
  }

  // Öğrencinin geçmiş verilerini görüntüleme
  const studentHistoryDiv = document.getElementById('student-history');
  if (studentHistoryDiv) {
    const studentHistory = JSON.parse(localStorage.getItem('studentHistory')) || [];
    studentHistoryDiv.innerHTML = studentHistory.map((entry) => {
      return `
        <div class="history-entry">
          <p>Öğrenci: ${entry.studentName}</p>
          <p>Atık Türü: ${entry.wasteType}</p>
          <p>Atık Miktarı: ${entry.kg} kg</p>
          <p>Toplam Puan: ${entry.totalPoints}</p>
        </div>
      `;
    }).join('');
  }
});
