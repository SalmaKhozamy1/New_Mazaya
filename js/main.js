// Stepper Logic
let currentStep = 1;

function changeStep(stepDelta) {
    const steps = document.querySelectorAll('.form-step');
    const stepperSteps = document.querySelectorAll('.step');
    
    if (stepDelta > 0) {
        let isValid = true;
        const currentStepEl = steps[currentStep - 1];
        
        if (currentStep === 1) {
            const cvInput = document.getElementById('cvUpload');
            if (!cvInput || !cvInput.files.length) {
                alert('Please upload your CV before proceeding.');
                return;
            }
        } else {
            const formGroups = currentStepEl.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                const hasStar = group.querySelector('.req-star');
                if (hasStar) {
                    const input = group.querySelector('input:not([type="file"]), select, textarea');
                    if (input) {
                        if (input.tagName === 'SELECT') {
                            if (input.selectedOptions.length > 0 && input.selectedOptions[0].disabled) {
                                isValid = false;
                                input.style.borderColor = '#dc3545';
                            } else {
                                input.style.borderColor = '';
                            }
                        } else if (input.type === 'radio') {
                            const isChecked = group.querySelector(`input[name="${input.name}"]:checked`);
                            const genderSwitch = group.querySelector('.gender-switch');
                            if (!isChecked) {
                                isValid = false;
                                if (genderSwitch) genderSwitch.classList.add('border', 'border-danger', 'rounded', 'p-1');
                            } else {
                                if (genderSwitch) genderSwitch.classList.remove('border', 'border-danger', 'rounded', 'p-1');
                            }
                        } else if (!input.value.trim()) {
                            isValid = false;
                            input.style.borderColor = '#dc3545';
                        } else {
                            input.style.borderColor = '';
                        }
                    }
                }
            });

            if (!isValid) {
                return;
            }
        }
    }

    if (currentStep + stepDelta < 1 || currentStep + stepDelta > steps.length) return;

    // Hide/Deactivate current step
    steps[currentStep - 1].classList.remove('active');
    stepperSteps[currentStep - 1].classList.remove('active');
    
    if (stepDelta > 0) {
        stepperSteps[currentStep - 1].classList.add('completed');
    } else {
        stepperSteps[currentStep + stepDelta - 1].classList.remove('completed');
    }
    
    // Update current step index
    currentStep += stepDelta;
    
    // Show/Activate new step
    steps[currentStep - 1].classList.add('active');
    stepperSteps[currentStep - 1].classList.add('active');

// Update buttons State across all instances
    document.querySelectorAll('.btn-prev').forEach(btn => {
        btn.disabled = currentStep === 1;
    });
    document.querySelectorAll('.btn-next').forEach(btn => {
        btn.innerText = currentStep === steps.length ? 'Submit Application' : 'Save & Continue';
    });
}

let experienceCount = 1;

function addPosition() {
    experienceCount++;
    const container = document.getElementById('experienceContainer');
    if (!container) return;
    
    const newExperience = `
        <div class="form-section-card custom-card custom-card--sm">
            <div class="section-header" data-bs-toggle="collapse" data-bs-target="#experienceCollapse${experienceCount}" aria-expanded="true" aria-controls="experienceCollapse${experienceCount}">
                <div class="header-left">
                    <div class="icon-box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-briefcase"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                    </div>
                    <h2 class="section-title">Work Experience ${experienceCount}</h2>
                </div>
                <div class="arrow-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
            </div>

            <div class="grid-2 w-100 collapse show" id="experienceCollapse${experienceCount}">
      
                    <div class="form-group full-width">
                        <label class="form-label">Job Title</label>
                        <input type="text" class="form-control" placeholder="Job Title">
                    </div>
        
                    <div class="form-group">
                        <label class="form-label">Company / Employer Name</label>
                        <select class="form-select">
                            <option selected disabled>Company / Employer Name</option>
                            <option>Mazaya</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Employment Type</label>
                        <select class="form-select">
                            <option selected disabled>Remote</option>
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Contract</option>
                        </select>
                    </div>
           
                    <div class="form-group has-icon">
                        <label class="form-label">Start date</label>
                        <input type="text" class="form-control input_flat_picker">
                        <div class="input-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0.833008C12.276 0.833008 12.4998 1.05702 12.5 1.33301V1.75781C13.0362 1.90983 13.4888 2.15566 13.8652 2.5625C14.3838 3.12316 14.6152 3.832 14.7256 4.71973C14.8338 5.58958 14.833 6.70462 14.833 8.12695V8.54004C14.833 9.96239 14.8338 11.0774 14.7256 11.9473C14.6152 12.8349 14.3838 13.5429 13.8652 14.1035C13.3415 14.6697 12.671 14.9269 11.832 15.0488C11.0201 15.1668 9.98271 15.167 8.67383 15.167H7.32617C6.01729 15.167 4.97992 15.1668 4.16797 15.0488C3.32899 14.9269 2.65849 14.6697 2.13477 14.1035C1.6162 13.5429 1.38483 12.8349 1.27441 11.9473C1.16624 11.0774 1.16699 9.96239 1.16699 8.54004V8.12695C1.16699 6.70463 1.16625 5.58957 1.27441 4.71973C1.38481 3.832 1.61616 3.12316 2.13477 2.5625C2.51125 2.15566 2.96383 1.90983 3.5 1.75781V1.33301C3.50018 1.05702 3.72397 0.833008 4 0.833008C4.27603 0.833008 4.49982 1.05702 4.5 1.33301V1.57715C5.25737 1.49987 6.18936 1.49999 7.32617 1.5H8.67383C9.81064 1.49999 10.7426 1.49987 11.5 1.57715V1.33301C11.5002 1.05702 11.724 0.833008 12 0.833008ZM2.19629 5.83301C2.17069 6.47102 2.16699 7.23361 2.16699 8.16211V8.50488C2.16699 9.97005 2.16801 11.0224 2.26758 11.8232C2.36586 12.6135 2.55208 13.083 2.86816 13.4248C3.17918 13.761 3.59835 13.9549 4.31152 14.0586C5.04324 14.1649 6.00776 14.167 7.36621 14.167H8.63379C9.99224 14.167 10.9568 14.1649 11.6885 14.0586C12.4017 13.9549 12.8208 13.761 13.1318 13.4248C13.4479 13.083 13.6341 12.6135 13.7324 11.8232C13.832 11.0224 13.833 9.97005 13.833 8.50488V8.16211C13.833 7.23361 13.8293 6.47102 13.8037 5.83301H2.19629ZM8.66699 10.833C8.94288 10.8332 9.16682 11.0571 9.16699 11.333C9.16699 11.609 8.94299 11.8328 8.66699 11.833H5.33301C5.05702 11.8328 4.83301 11.609 4.83301 11.333C4.83318 11.0571 5.05712 10.8332 5.33301 10.833H8.66699ZM10.667 10.833C10.9429 10.8332 11.1668 11.0571 11.167 11.333C11.167 11.609 10.943 11.8328 10.667 11.833H10.6611C10.385 11.833 10.1611 11.6091 10.1611 11.333C10.1613 11.057 10.3851 10.833 10.6611 10.833H10.667ZM5.33887 8.16699C5.61501 8.16699 5.83887 8.39085 5.83887 8.66699C5.83869 8.94299 5.6149 9.16699 5.33887 9.16699H5.33301C5.05712 9.16682 4.83318 8.94288 4.83301 8.66699C4.83301 8.39096 5.05702 8.16717 5.33301 8.16699H5.33887ZM10.667 8.16699C10.943 8.16717 11.167 8.39096 11.167 8.66699C11.1668 8.94288 10.9429 9.16682 10.667 9.16699H7.33301C7.05712 9.16682 6.83318 8.94288 6.83301 8.66699C6.83301 8.39096 7.05702 8.16717 7.33301 8.16699H10.667ZM7.36621 2.5C6.1213 2.5 5.20727 2.50196 4.5 2.58398V2.66699C4.49982 2.94299 4.27603 3.16699 4 3.16699C3.77195 3.16699 3.58158 3.0134 3.52148 2.80469C3.24905 2.91282 3.04144 3.05486 2.86816 3.24219C2.55353 3.58248 2.36715 4.049 2.26856 4.83301H13.7314C13.6329 4.049 13.4465 3.58248 13.1318 3.24219C12.9584 3.05467 12.7504 2.91285 12.4775 2.80469C12.4174 3.01327 12.228 3.16699 12 3.16699C11.724 3.16699 11.5002 2.94298 11.5 2.66699V2.58398C10.7927 2.50196 9.8787 2.5 8.63379 2.5H7.36621Z" fill="#F05D2A"/>
                            </svg>
                        </div>
                    </div>
      
                    <div class="form-group has-icon">
                        <label class="form-label">End date</label>
                        <input type="text" class="form-control input_flat_picker">
                        <div class="input-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0.833008C12.276 0.833008 12.4998 1.05702 12.5 1.33301V1.75781C13.0362 1.90983 13.4888 2.15566 13.8652 2.5625C14.3838 3.12316 14.6152 3.832 14.7256 4.71973C14.8338 5.58958 14.833 6.70462 14.833 8.12695V8.54004C14.833 9.96239 14.8338 11.0774 14.7256 11.9473C14.6152 12.8349 14.3838 13.5429 13.8652 14.1035C13.3415 14.6697 12.671 14.9269 11.832 15.0488C11.0201 15.1668 9.98271 15.167 8.67383 15.167H7.32617C6.01729 15.167 4.97992 15.1668 4.16797 15.0488C3.32899 14.9269 2.65849 14.6697 2.13477 14.1035C1.6162 13.5429 1.38483 12.8349 1.27441 11.9473C1.16624 11.0774 1.16699 9.96239 1.16699 8.54004V8.12695C1.16699 6.70463 1.16625 5.58957 1.27441 4.71973C1.38481 3.832 1.61616 3.12316 2.13477 2.5625C2.51125 2.15566 2.96383 1.90983 3.5 1.75781V1.33301C3.50018 1.05702 3.72397 0.833008 4 0.833008C4.27603 0.833008 4.49982 1.05702 4.5 1.33301V1.57715C5.25737 1.49987 6.18936 1.49999 7.32617 1.5H8.67383C9.81064 1.49999 10.7426 1.49987 11.5 1.57715V1.33301C11.5002 1.05702 11.724 0.833008 12 0.833008ZM2.19629 5.83301C2.17069 6.47102 2.16699 7.23361 2.16699 8.16211V8.50488C2.16699 9.97005 2.16801 11.0224 2.26758 11.8232C2.36586 12.6135 2.55208 13.083 2.86816 13.4248C3.17918 13.761 3.59835 13.9549 4.31152 14.0586C5.04324 14.1649 6.00776 14.167 7.36621 14.167H8.63379C9.99224 14.167 10.9568 14.1649 11.6885 14.0586C12.4017 13.9549 12.8208 13.761 13.1318 13.4248C13.4479 13.083 13.6341 12.6135 13.7324 11.8232C13.832 11.0224 13.833 9.97005 13.833 8.50488V8.16211C13.833 7.23361 13.8293 6.47102 13.8037 5.83301H2.19629ZM8.66699 10.833C8.94288 10.8332 9.16682 11.0571 9.16699 11.333C9.16699 11.609 8.94299 11.8328 8.66699 11.833H5.33301C5.05702 11.8328 4.83301 11.609 4.83301 11.333C4.83318 11.0571 5.05712 10.8332 5.33301 10.833H8.66699ZM10.667 10.833C10.9429 10.8332 11.1668 11.0571 11.167 11.333C11.167 11.609 10.943 11.8328 10.667 11.833H10.6611C10.385 11.833 10.1611 11.6091 10.1611 11.333C10.1613 11.057 10.3851 10.833 10.6611 10.833H10.667ZM5.33887 8.16699C5.61501 8.16699 5.83887 8.39085 5.83887 8.66699C5.83869 8.94299 5.6149 9.16699 5.33887 9.16699H5.33301C5.05712 9.16682 4.83318 8.94288 4.83301 8.66699C4.83301 8.39096 5.05702 8.16717 5.33301 8.16699H5.33887ZM10.667 8.16699C10.943 8.16717 11.167 8.39096 11.167 8.66699C11.1668 8.94288 10.9429 9.16682 10.667 9.16699H7.33301C7.05712 9.16682 6.83318 8.94288 6.83301 8.66699C6.83301 8.39096 7.05702 8.16717 7.33301 8.16699H10.667ZM7.36621 2.5C6.1213 2.5 5.20727 2.50196 4.5 2.58398V2.66699C4.49982 2.94299 4.27603 3.16699 4 3.16699C3.77195 3.16699 3.58158 3.0134 3.52148 2.80469C3.24905 2.91282 3.04144 3.05486 2.86816 3.24219C2.55353 3.58248 2.36715 4.049 2.26856 4.83301H13.7314C13.6329 4.049 13.4465 3.58248 13.1318 3.24219C12.9584 3.05467 12.7504 2.91285 12.4775 2.80469C12.4174 3.01327 12.228 3.16699 12 3.16699C11.724 3.16699 11.5002 2.94298 11.5 2.66699V2.58398C10.7927 2.50196 9.8787 2.5 8.63379 2.5H7.36621Z" fill="#F05D2A"/>
                            </svg>
                        </div>
                    </div>
       
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', newExperience);
    if (typeof initFlatpickr === 'function') {
        initFlatpickr();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // --- Counter Animation ---
    const startCounter = (el) => {
        const target = parseFloat(el.getAttribute("data-target"));
        const prefix = el.getAttribute("data-prefix") || "";
        const suffix = el.getAttribute("data-suffix") || "";
        const duration = 2000; // 2 seconds
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentCount = progress * target;
            
            // Format number based on decimals
            let displayNum;
            if (target % 1 !== 0) {
                displayNum = currentCount.toFixed(1);
            } else {
                displayNum = Math.floor(currentCount);
            }

            el.innerHTML = `${prefix}${displayNum}${suffix}`;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Ensure final number is exact
                el.innerHTML = `${prefix}${target}${suffix}`;
            }
        };

        window.requestAnimationFrame(step);
    };

    // Use IntersectionObserver to trigger when visible
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll(".stat-number");
                counters.forEach(counter => startCounter(counter));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector(".clarity-stats-row");
    if (statsSection) {
        observer.observe(statsSection);
    }

    // --- Identity Tabs Logic ---
    const tabs = document.querySelectorAll(".identity-tab");
    const panes = document.querySelectorAll(".identity-pane");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target = tab.getAttribute("data-tab");

            // Remove active classes
            tabs.forEach(t => t.classList.remove("active"));
            panes.forEach(p => p.classList.remove("active"));

            // Add active class to clicked tab and corresponding pane
            tab.classList.add("active");
            const targetPane = document.getElementById(target);
            if (targetPane) targetPane.classList.add("active");
        });
    });


        // Drag and Drop Logic
        const uploadAreas = document.querySelectorAll('.upload-area');

        uploadAreas.forEach(area => {
            const fileInput = area.querySelector('input[type="file"]');
            const uploadText = area.querySelector('.upload-text');

            if (!fileInput || !uploadText) return;

            function handleFileUpload(files) {
                if (files.length) {
                    fileInput.files = files;
                    uploadText.innerHTML = `File uploaded: <span class="primary-color">${files[0].name}</span>`;
                }
            }

            area.addEventListener('dragover', (e) => {
                e.preventDefault();
                area.style.borderColor = '#F05D2A';
            });
            area.addEventListener('dragleave', () => {
                area.style.borderColor = '#EFEFEF';
            });
            area.addEventListener('drop', (e) => {
                e.preventDefault();
                area.style.borderColor = '#EFEFEF';
                handleFileUpload(e.dataTransfer.files);
            });
            
            fileInput.addEventListener('change', (e) => {
                handleFileUpload(e.target.files);
            });
        });
});
