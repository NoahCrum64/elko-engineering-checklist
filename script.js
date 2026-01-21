const baseImgUrl = "https://placehold.co/600x400?text=";

const tools = [
    /* Basics & Safety */
    { name: "Safety Orientation", img: `${baseImgUrl}Safety`, type: "General" },
    { name: "Hand Tools", img: `${baseImgUrl}Tools`, type: "General" },
    
    /* 3D Printing */
    { name: "Prusa MK3S+", img: `${baseImgUrl}Prusa`, type: "3D Print" },
    { name: "Stratasys F170", img: `${baseImgUrl}Stratasys`, type: "3D Print" },
    { name: "SLA Resin Printer", img: `${baseImgUrl}Resin`, type: "3D Print" },
    { name: "Markforged Onyx", img: `${baseImgUrl}Markforged`, type: "3D Print" },

    /* Laser & Cutting */
    { name: "Epilog Laser", img: `${baseImgUrl}Epilog`, type: "Laser" },
    { name: "Trotec Laser", img: `${baseImgUrl}Trotec`, type: "Laser" },
    { name: "Fiber Laser", img: `${baseImgUrl}Fiber+Laser`, type: "Laser" },
    { name: "Vinyl Cutter", img: `${baseImgUrl}Vinyl`, type: "2D" },
    { name: "Waterjet Cutter", img: `${baseImgUrl}Waterjet`, type: "Heavy" },

    /* Electronics */
    { name: "Soldering Station", img: `${baseImgUrl}Solder`, type: "Electronics" },
    { name: "Oscilloscope", img: `${baseImgUrl}Scope`, type: "Electronics" },
    { name: "Function Generator", img: `${baseImgUrl}Func+Gen`, type: "Electronics" },
    { name: "Bench Power Supply", img: `${baseImgUrl}Power`, type: "Electronics" },
    { name: "Digital Multimeter", img: `${baseImgUrl}Multimeter`, type: "Electronics" },

    /* Woodshop */
    { name: "CNC Router", img: `${baseImgUrl}CNC`, type: "Wood" },
    { name: "Band Saw", img: `${baseImgUrl}Band+Saw`, type: "Wood" },
    { name: "Drill Press", img: `${baseImgUrl}Drill`, type: "Wood" },
    { name: "Miter Saw", img: `${baseImgUrl}Miter+Saw`, type: "Wood" },
    { name: "Scroll Saw", img: `${baseImgUrl}Scroll+Saw`, type: "Wood" },
    { name: "Belt Sander", img: `${baseImgUrl}Sander`, type: "Wood" },

    /* Metalworking */
    { name: "Manual Mill", img: `${baseImgUrl}Mill`, type: "Metal" },
    { name: "Metal Lathe", img: `${baseImgUrl}Lathe`, type: "Metal" },
    { name: "Haas Mini Mill", img: `${baseImgUrl}Haas`, type: "Metal" },
    { name: "Vacuum Former", img: `${baseImgUrl}Vac+Form`, type: "Plastics" },

    /* Textiles */
    { name: "Sewing Machine", img: `${baseImgUrl}Sewing`, type: "Textiles" },
    { name: "Serger", img: `${baseImgUrl}Serger`, type: "Textiles" },
    { name: "Embroidery Machine", img: `${baseImgUrl}Embroidery`, type: "Textiles" },
    { name: "Button Maker", img: `${baseImgUrl}Button`, type: "Textiles" }
];

// DOM Cache
const grid = document.getElementById('app-grid');
const modal = document.getElementById('modal-overlay');
const ui = {
    title: document.getElementById('tool-name'),
    img: document.getElementById('tool-img'),
    status: document.getElementById('status-label'),
    completeBtn: document.getElementById('toggle-btn'),
    calBtn: document.getElementById('cal-btn')
};

// State
let progress = JSON.parse(localStorage.getItem('elko_progress')) || [];
let activeTool = null;

function init() {
    grid.innerHTML = '';
    
    tools.forEach(tool => {
        const el = document.createElement('div');
        el.className = 'tile';
        el.innerText = tool.name;

        if (progress.includes(tool.name)) {
            el.classList.add('is-done');
        }

        el.addEventListener('click', () => openModal(tool));
        grid.appendChild(el);
    });
}

function openModal(tool) {
    activeTool = tool.name;
    
    ui.title.innerText = tool.name;
    ui.img.src = tool.img;
    ui.calBtn.href = `https://elkogarageualberta.libcal.com/calendar/training?q=${encodeURIComponent(tool.name)}`;

    renderModalState();
    modal.classList.remove('hidden');
}

function renderModalState() {
    const isDone = progress.includes(activeTool);
    
    if (isDone) {
        ui.status.innerText = "Certified ✓";
        ui.status.style.color = "green";
        ui.completeBtn.innerText = "Unmark Complete";
        ui.completeBtn.className = "btn danger";
    } else {
        ui.status.innerText = "Not Started";
        ui.status.style.color = "#666";
        ui.completeBtn.innerText = "Mark Complete";
        ui.completeBtn.className = "btn success";
    }
}

// Event Bindings
document.querySelector('.close-btn').onclick = () => modal.classList.add('hidden');

modal.onclick = (e) => {
    if (e.target === modal) modal.classList.add('hidden');
};

ui.completeBtn.onclick = () => {
    if (progress.includes(activeTool)) {
        progress = progress.filter(item => item !== activeTool);
    } else {
        progress.push(activeTool);
    }
    
    localStorage.setItem('elko_progress', JSON.stringify(progress));
    
    init();
    renderModalState();
};

init();
