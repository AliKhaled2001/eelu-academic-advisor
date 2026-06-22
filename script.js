document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const studentIdInput = document.getElementById('studentId');
    const searchView = document.getElementById('searchView');
    const resultView = document.getElementById('resultView');
    const errorContainer = document.getElementById('errorContainer');
    const resultName = document.getElementById('resultName');
    const resultAdvisor = document.getElementById('resultAdvisor');
    const resultEmail = document.getElementById('resultEmail');
    const searchBtn = document.querySelector('.search-btn');
    const backBtn = document.getElementById('backBtn');

    const advisorEmails = {
        'Engineer Ali Khaled': 'amasoud@eelu.edu.eg',
        'Doctor Bassant': 'babuhatab@eelu.edu.eg',
        'Doctor Esraa': 'ihussien@eelu.edu.eg',
        'Doctor Shahd': 'sessamabdullah@eelu.edu.eg',
        'Doctor Abdelrahman': 'amustafasalem@eelu.edu.eg',
        'Doctor Dai': 'dawadallahmorsi@eelu.edu.eg',
    };

    // Make sure we have studentData loaded from data.js
    if (typeof studentData === 'undefined') {
        console.error('Data not loaded. Make sure data.js is generated and included.');
        showError('خطأ في النظام: تعذر تحميل البيانات.');
        return;
    }

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const id = studentIdInput.value.trim();
        
        if (!id) return;

        // Hide previous errors
        errorContainer.classList.add('hidden');
        
        // Add loading state
        searchBtn.classList.add('loading');
        
        // Simulate a tiny network delay for better UX (micro-animation feedback)
        setTimeout(() => {
            searchBtn.classList.remove('loading');
            
            const studentInfo = studentData[id];
            
            if (studentInfo) {
                // Formatting advisor name cleanly (e.g. "Doctor Abdelrahman" -> "الدكتور / عبد الرحمن" depending on needs, 
                // but we will just show what's in the file directly, perhaps translating the prefix if needed)
                let advisorStr = studentInfo.advisor;
                
                // Optional: Replace English titles with Arabic if desired, though file names might be what they want.
                advisorStr = advisorStr.replace('Doctor', 'دكتور');
                advisorStr = advisorStr.replace('Engineer', 'مهندس');
                
                resultName.textContent = studentInfo.name;
                resultAdvisor.textContent = advisorStr;
                
                const email = advisorEmails[studentInfo.advisor] || 'غير متوفر';
                resultEmail.textContent = email;
                resultEmail.href = email !== 'غير متوفر' ? `mailto:${email}` : '#';
                
                // Show result view instead of search view
                searchView.classList.add('hidden');
                resultView.classList.remove('hidden');
            } else {
                // Show error
                showError('عذراً، لم يتم العثور على طالب بهذا الكود.');
            }
        }, 500); // 500ms delay for UI feel
    });

    function showError(message) {
        document.getElementById('errorMessage').textContent = message;
        errorContainer.classList.remove('hidden');
    }
    
    // Add input formatting (allow only numbers)
    studentIdInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    // Handle back button
    backBtn.addEventListener('click', () => {
        resultView.classList.add('hidden');
        searchView.classList.remove('hidden');
        studentIdInput.value = ''; // clear the input for next search
        studentIdInput.focus();
    });
});
