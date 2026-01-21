// using placeholder images for now, swap these URLs later
const imgBase = "https://placehold.co/600x400?text=";

const tools = [
    { name: "Prusa MK3S+", img: `${imgBase}Prusa`, type: "3D Print" },
    { name: "Stratasys F170", img: `${imgBase}Stratasys`, type: "3D Print" },
    { name: "Epilog Laser", img: `${imgBase}Laser`, type: "Laser" },
    { name: "CNC Router", img: `${imgBase}CNC`, type: "CNC" },
    { name: "Soldering Station", img: `${imgBase}Solder`, type: "Electronics" },
    { name: "Band Saw", img: `${imgBase}Saw`, type: "Wood" },
    { name: "Metal Lathe", img: `${imgBase}Lathe`, type: "Metal" },
    { name: "Drill Press", img: `${imgBase}Drill`, type: "Shop" },
    { name: "Safety Orientation", img: `${imgBase}Safety`, type: "General" },
    // fill rest...
];

// populating the rest of the list for the grid demo
for (let i = tools.length; i < 30; i++) {
    tools.push({ 
        name: `Equipment ${i + 1}`, 
        img: `${imgBase}Tool+${i+1}`, 
        type: "General" 
    });
}

// DOM elements
const grid = document.getElementById('app-grid');
const modal = document.getElementById('modal-overlay');
const els = {
    title: document.getElementById('tool-name'),
    img: document.getElementById('tool-img'),
    status: document.getElementById('status-label'),
    completeBtn: document.getElementById('toggle-btn'),
    calBtn: document.getElementById('cal-btn')
};

// get saved progress
let progress = JSON.parse(localStorage.getItem('elko_progress')) || [];
let activeTool = null; // tracks current modal item

function init() {
    grid.innerHTML = '';
    
    tools.forEach(tool => {
        const el = document.createElement('div');
        el.className = 'tile';
        el.innerText = tool.name;

        if (progress.includes(tool.name)) {
            el.classList.add('is-done');
        }

        el.addEventListener('click', () => showDetails(tool));
        grid.appendChild(el);
    });
}

function showDetails(tool) {
    activeTool = tool.name;
    
    els.title.innerText = tool.name;
    els.img.src = tool.img;
    
    // smart search link for Elko calendar
    els.calBtn.href = `https://elkogarageualberta.libcal.com/calendar/training?q=${encodeURIComponent(tool.name)}`;

    updateModalUI();
    modal.classList.remove('hidden');
}

function updateModalUI() {
    const isDone = progress.includes(activeTool);
    
    if (isDone) {
        els.status.innerText = "Certified ✓";
        els.status.style.color = "green";
        els.completeBtn.innerText = "Unmark Complete";
        els.completeBtn.className = "btn danger";
    } else {
        els.status.innerText = "Not Started";
        els.status.style.color = "#666";
        els.completeBtn.innerText = "Mark Complete";
        els.completeBtn.className = "btn success";
    }
}

// Event Listeners
document.querySelector('.close-btn').onclick = () => modal.classList.add('hidden');

// close on background click
modal.onclick = (e) => {
    if (e.target === modal) modal.classList.add('hidden');
};

els.completeBtn.onclick = () => {
    if (progress.includes(activeTool)) {
        progress = progress.filter(item => item !== activeTool);
    } else {
        progress.push(activeTool);
    }
    
    localStorage.setItem('elko_progress', JSON.stringify(progress));
    
    // refresh UI
    init();
    updateModalUI();
};

// start app
init();