// ============================================================
// DADOS DE EXEMPLO (MOCK) - LEADS
// ============================================================
const leadsData = [{
    id: 1,
    name: 'João Silva',
    company: 'TechCorp Soluções',
    role: 'Head de Vendas',
    email: 'joao@techcorp.com',
    category: 'Hot',
    status: 'Pronto',
    score: 78,
    initials: 'JS',
    color: '#027075',
    time: 'Há 2 horas',
    origin: 'Inbound'
}, {
    id: 2,
    name: 'Ana Santos',
    company: 'DataFlow Analytics',
    role: 'CEO',
    email: 'ana@dataflow.com',
    category: 'Hot',
    status: 'Em Qualificação',
    score: 85,
    initials: 'AS',
    color: '#059669',
    time: 'Há 1 hora',
    origin: 'Outbound'
}, {
    id: 3,
    name: 'Carlos Mendes',
    company: 'InovaTech Group',
    role: 'Gerente de Marketing',
    email: 'carlos@inovatech.com',
    category: 'Warm',
    status: 'Pronto',
    score: 62,
    initials: 'CM',
    color: '#F7B31C',
    time: 'Há 4 horas',
    origin: 'Indicação'
}, {
    id: 4,
    name: 'Fernanda Lima',
    company: 'GreenEnergy Brasil',
    role: 'Diretora Comercial',
    email: 'fernanda@greenenergy.com',
    category: 'Warm',
    status: 'Em Qualificação',
    score: 55,
    initials: 'FL',
    color: '#f59e0b',
    time: 'Há 6 horas',
    origin: 'Evento'
}, {
    id: 5,
    name: 'Roberto Alves',
    company: 'FinTech Solutions',
    role: 'CFO',
    email: 'roberto@fintech.com',
    category: 'Cold',
    status: 'Em Qualificação',
    score: 28,
    initials: 'RA',
    color: '#6b7280',
    time: 'Há 1 dia',
    origin: 'Inbound'
}, {
    id: 6,
    name: 'Patrícia Souza',
    company: 'HealthCare Plus',
    role: 'Head de Produto',
    email: 'patricia@healthcare.com',
    category: 'Hot',
    status: 'Pronto',
    score: 92,
    initials: 'PS',
    color: '#047857',
    time: 'Há 30 min',
    origin: 'Outbound'
}, {
    id: 7,
    name: 'Marcos Oliveira',
    company: 'EduTech Brasil',
    role: 'Coordenador de Vendas',
    email: 'marcos@edutech.com',
    category: 'Warm',
    status: 'Em Qualificação',
    score: 48,
    initials: 'MO',
    color: '#d97706',
    time: 'Há 3 horas',
    origin: 'Indicação'
}, {
    id: 8,
    name: 'Juliana Costa',
    company: 'Logística Expressa',
    role: 'Gerente Operacional',
    email: 'juliana@logexpress.com',
    category: 'Cold',
    status: 'Em Qualificação',
    score: 15,
    initials: 'JC',
    color: '#9ca3af',
    time: 'Há 2 dias',
    origin: 'Evento'
}];

// ============================================================
// FUNÇÃO PARA RENDERIZAR OS LEADS
// ============================================================
function renderLeads(leads) {
    const container = document.getElementById('leadsContainer');
    container.innerHTML = '';

    leads.forEach(lead => {
        const scorePercent = lead.score;
        let scoreClass = 'high';
        if (scorePercent < 40) scoreClass = 'low';
        else if (scorePercent < 70) scoreClass = 'medium';

        const card = document.createElement('div');
        card.className = 'lead-card';
        card.innerHTML = `
            <div class="lead-left">
                <div class="lead-avatar" style="background:${lead.color}">
                    ${lead.initials}
                </div>
                <div class="lead-info">
                    <div class="name-row">
                        <span class="lead-name">${lead.name}</span>
                        <span class="badge-category ${lead.category.toLowerCase()}">${lead.category}</span>
                        <span class="badge-status ${lead.status === 'Pronto' ? 'ready' : ''}">${lead.status}</span>
                    </div>
                    <div class="company-row">
                        ${lead.company} • ${lead.role}
                    </div>
                    <div class="meta-row">
                        <span><i class="far fa-clock"></i> ${lead.time}</span>
                        <span>•</span>
                        <span><i class="fas fa-tag"></i> ${lead.origin}</span>
                    </div>
                </div>
            </div>
            <div class="lead-right">
                <div class="score">
                    <div class="number">${lead.score}<span>/100</span></div>
                    <div class="bar">
                        <div class="fill ${scoreClass}" style="width:${scorePercent}%"></div>
                    </div>
                </div>
                <a href="#" class="action-link" onclick="alert('Abrindo detalhes do lead: ${lead.name}')">Ver Detalhes →</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// ============================================================
// FUNÇÃO DE BUSCA (com debounce)
// ============================================================
let searchTimeout;

function filterLeads(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    if (!term) {
        renderLeads(leadsData);
        return;
    }
    const filtered = leadsData.filter(lead =>
        lead.name.toLowerCase().includes(term) ||
        lead.company.toLowerCase().includes(term)
    );
    renderLeads(filtered);
}

// Evento de busca com debounce (500ms)
document.getElementById('searchInput').addEventListener('input', function(e) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        filterLeads(e.target.value);
    }, 500);
});

// ============================================================
// FILTROS POR CATEGORIA
// ============================================================
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const category = this.textContent.trim();
        if (category === 'Todos') {
            renderLeads(leadsData);
        } else {
            const filtered = leadsData.filter(lead => lead.category === category);
            renderLeads(filtered);
        }
    });
});

// ============================================================
// CLICK NOS CARDS DE ESTATÍSTICA (aplica filtro)
// ============================================================
document.querySelectorAll('.stat-card').forEach((card, index) => {
    card.addEventListener('click', function() {
        const label = this.querySelector('.stat-label').textContent;

        const filterMap = {
            'Hot': 'Hot',
            'Warm': 'Warm',
            'Prontos p/ Closer': 'Pronto'
        };

        if (filterMap[label]) {
            const btns = document.querySelectorAll('.filter-btn');
            btns.forEach(b => b.classList.remove('active'));
            if (label === 'Hot') btns[1].classList.add('active');
            else if (label === 'Warm') btns[2].classList.add('active');
            else if (label === 'Prontos p/ Closer') {
                const filtered = leadsData.filter(lead => lead.status === 'Pronto');
                renderLeads(filtered);
                return;
            }

            const category = label === 'Hot' ? 'Hot' : 'Warm';
            const filtered = leadsData.filter(lead => lead.category === category);
            renderLeads(filtered);
        } else {
            renderLeads(leadsData);
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('.filter-btn:first-child').classList.add('active');
        }
    });
});

// ============================================================
// INICIALIZAÇÃO - MOSTRA TODOS OS LEADS
// ============================================================
renderLeads(leadsData);

// ============================================================
// PAGINAÇÃO SIMULADA
// ============================================================
document.querySelectorAll('.pagination .controls button:not(:disabled)').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.textContent.trim() === '1' || this.textContent.trim() === '2') {
            document.querySelectorAll('.pagination .controls button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const container = document.getElementById('leadsContainer');
            container.style.opacity = '0.5';
            setTimeout(() => {
                container.style.opacity = '1';
            }, 200);
        }
    });
});

console.log('✅ Dashboard SDR carregado com sucesso!');
console.log(`📊 Total de leads: ${leadsData.length}`);
