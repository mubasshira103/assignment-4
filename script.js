let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

// DOM Elements
let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');
let tabCountEl = document.getElementById('tabCount');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('body'); // Delegation from body or main
const filterSection = document.getElementById('filtered-section');

// Function to calculate counts (Dashboard and Tab Count)
function calculateCount() {
    total.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    // Tab wise count update
    if(currentStatus === 'all-filter-btn') {
        tabCountEl.innerText = allCardSection.children.length;
    } else if(currentStatus === 'interview-filter-btn') {
        tabCountEl.innerText = interviewList.length;
    } else {
        tabCountEl.innerText = rejectedList.length;
    }
}

// Initial count call
calculateCount();

function toggleStyle(id) {
    currentStatus = id;

    // Reset buttons to gray
    allFilterBtn.classList.add('text-black', 'bg-gray-300');

    interviewFilterBtn.classList.add ('text-black', 'bg-gray-300');
    rejectedFilterBtn.classList.add('text-black', 'bg-gray-300');

    allFilterBtn.classList.remove('bg-blue-600', 'text-white');
    interviewFilterBtn.classList.remove('bg-blue-600', 'text-white');
    rejectedFilterBtn.classList.remove('bg-blue-600', 'text-white');

    // Highlight selected button
    const selected = document.getElementById(id);
    selected.classList.remove('bg-gray-300', 'text-black');
    selected.classList.add('bg-blue-600', 'text-white');

    // Section visibility logic (Step 4 style)
    if (id === 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    } else if (id === 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    } else if (id === 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejected();
    }
    calculateCount();
}

// Step 2: Event Delegation for Buttons
mainContainer.addEventListener('click', function (event) {

    // Interview Button Clicked
    if (event.target.classList.contains('interview-btn')) {
        const parentNode = event.target.closest('.job-card');
        const companyName = parentNode.querySelector('.companyName').innerText;
        const position = parentNode.querySelector('.position').innerText;
        const location = parentNode.querySelector('.location').innerText;
        const type = parentNode.querySelector('.type').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        const description = parentNode.querySelector('.description').innerText;

        // Change status in UI
        parentNode.querySelector('.status').innerText = 'Interview';
        // parentNode.querySelector('.status').classList.add('text-green-600');
        parentNode.querySelector('.status').classList.add('border-green-200' , 'text-green-700');
        parentNode.querySelector('.status').classList.remove('text-red-600', 'text-gray-400');

        const jobInfo = { companyName, position, location, type, salary, description, status: 'Interview' };

        // Add to list if not exists
        const plantExist = interviewList.find(item => item.companyName == jobInfo.companyName)
        console.log(plantExist)

        if (!plantExist) {
            interviewList.push(jobInfo)
        }
        // Remove from rejected if it was there
        rejectedList = rejectedList.filter(item => item.companyName != jobInfo.companyName);

        if (currentStatus == 'rejected-filter-btn') {
          renderRejected();
        }
        calculateCount();
    }

    // Rejected Button Clicked
    else if (event.target.classList.contains('rejected-btn')) {
        const parentNode = event.target.closest('.job-card');
        const companyName = parentNode.querySelector('.companyName').innerText;
        const position = parentNode.querySelector('.position').innerText;
        const location = parentNode.querySelector('.location').innerText;
        const type = parentNode.querySelector('.type').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        const description = parentNode.querySelector('.description').innerText;

        parentNode.querySelector('.status').innerText = 'Rejected';
        parentNode.querySelector('.status').classList.add('text-red-600');
        parentNode.querySelector('.status').classList.remove('text-green-600', 'text-gray-400');

        const jobInfo = { companyName, position, location, type, salary, description, status: 'Rejected' };

        const plantExist = rejectedList.find(item => item.companyName == jobInfo.companyName)

        if (!plantExist) {
            rejectedList.push(jobInfo)
        }

        interviewList = interviewList.filter(item => item.companyName != jobInfo.companyName);

        if (currentStatus == 'interview-filter-btn'){
          renderInterview();
        }
        calculateCount();
    }

    // Delete Button Clicked
    else if (event.target.classList.contains('btn-delete')) {
        const parentNode = event.target.closest('.job-card');
        const companyName = parentNode.querySelector('.companyName').innerText;

        interviewList = interviewList.filter(item => item.companyName !== companyName);
        rejectedList = rejectedList.filter(item => item.companyName !== companyName);

        parentNode.remove();

        calculateCount();

        if(currentStatus === 'interview-filter-btn'){
          renderInterview();
        }
        if(currentStatus === 'rejected-filter-btn') {
          renderRejected();
        }

    }
});

// step 3  html file create
function renderInterview() {
    // make the filterSection empty every time
    filterSection.innerHTML = ''

    if (interviewList.length === 0) {
        filterSection.innerHTML = `
            <div class="bg-white p-10 text-center rounded shadow"><p class="text-3xl mb-2">📋</p><h3 class="text-lg font-bold">No Interview Jobs</h3><p class="text-gray-500">Keep applying!</p></div>
        `;
        return;
    }

    // crating innerHtml
    for (let interview of interviewList) {
        console.log(interview);

        let div = document.createElement('div');
    div.className = 'job-card bg-white p-6 rounded shadow flex justify-between';
    div.innerHTML = `
        <div class="space-y-2">
            <div>
                <h3 class="companyName text-xl font-bold">${interview.companyName}</h3>
                <p class="position text-blue-600 font-medium">${interview.position}</p>
                <p class="text-sm text-gray-500"><span class="location">${interview.location}</span> • <span class="type">${interview.type}</span></p>
                <p class="salary text-sm font-bold mt-1">${interview.salary}</p>
            </div>
            <p class="status text-sm font-semibold ${interview.status === 'Interview' ? 'text-green-600' : 'text-red-600'}">Status: ${interview.status}</p>
            <p class="description text-gray-600 text-sm">${interview.description}</p>
            <div class="flex gap-3 mt-4">
              <button class="interview-btn bg-green-200 text-green-700 px-4 py-1 rounded">Interview</button>
              <button class="rejected-btn bg-red-200 text-red-700 px-4 py-1 rounded">Rejected</button>
            </div>
        </div>
        <button class="btn-delete text-red-500 font-bold self-start">Delete</button>
    `;
        filterSection.appendChild(div)
    }
}

// step 3  html file create
function renderRejected() {
    // make the filterSection empty every time
    filterSection.innerHTML = ''

    if (rejectedList.length === 0) {
        filterSection.innerHTML = `
            <div class="bg-white p-10 text-center rounded shadow"><p class="text-3xl mb-2">📋</p><h3 class="text-lg font-bold">No Rejected Jobs</h3><p class="text-gray-500">Keep applying!</p></div>
        `;
        return;
    }

    // crating innerHtml
    for (let reject of rejectedList) {


        let div = document.createElement('div');
    div.className = 'job-card bg-white p-6 rounded shadow flex justify-between';
    div.innerHTML = `
        <div class="space-y-2">
            <div>
                <h3 class="companyName text-xl font-bold">${reject.companyName}</h3>
                <p class="position text-blue-600 font-medium">${reject.position}</p>
                <p class="text-sm text-gray-500"><span class="location">${reject.location}</span> • <span class="type">${reject.type}</span></p>
                <p class="salary text-sm font-bold mt-1">${reject.salary}</p>
            </div>
            <p class="status text-sm font-semibold ${reject.status === 'Interview' ? 'text-green-600' : 'text-red-600'}">Status: ${reject.status}</p>
            <p class="description text-gray-600 text-sm">${reject.description}</p>
            <div class="flex gap-3 mt-4">
              <button class="interview-btn bg-green-200 text-green-700 px-4 py-1 rounded">Interview</button>
              <button class="rejected-btn bg-red-200 text-red-700 px-4 py-1 rounded">Rejected</button>
            </div>
        </div>
        <button class="btn-delete text-red-500 font-bold self-start">Delete</button>
    `;
        filterSection.appendChild(div)
    }
}



