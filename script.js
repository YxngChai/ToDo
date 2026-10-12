const listContainer = document.getElementById('js-list-container');
const addBtn = document.getElementById('js-add-btn');
const userInput = document.getElementById('js-user-input');
let currentFilter = 'all';


//check storage
const oldSave = localStorage.getItem('save') ?? null;



if(oldSave){
    // restore if there is a save and recreated rows
    const save = JSON.parse(oldSave);
    save.forEach((item, index) => {
        if(item.completed){
            const newRow = `
                    <div data-index="${index}" class="row bg-dark border border-black border-top-0 js-completed">
                    <div class="col-2 col-sm-1 p-2  d-flex justify-content-center align-items-center" ><button class="js-check-btn btn btn-primary rounded-5 border border-dark-subtle w-100 h-100"></button></div>
                    <div class="col p-0 " ><p class="js-text mb-0 px-3 py-2  w-100 h-100 d-flex align-items-center text-white"></p></div>
                    <div class="col-2 col-lg-1 p-0" style><button type="button" class="js-edit-btn  btn btn-secondary  w-100 h-100 rounded-0">Edit</button></div>
                    <div class="col-2 col-lg-1 p-0" ><button type="button" class="js-delete-btn btn btn-danger  w-100 h-100 rounded-0">Delete</button></div>
                    </div>
                `
                listContainer.insertAdjacentHTML('beforeend', newRow);

                const row = listContainer.lastElementChild;
                row.querySelector('.js-text').textContent = item.text;

        } else {
            
            const newRow = `
                    <div data-index="${index}" class="row bg-light border border-black border-top-0 js-active">
                    <div class="col-2 col-sm-1 p-2 d-flex justify-content-center align-items-center" ><button class="js-check-btn btn btn-light rounded-5 border border-dark-subtle w-100 h-100"></button></div>
                    <div class="col p-0" ><p  class="js-text mb-0 px-3 py-2  w-100 h-100 d-flex align-items-center text-black"></p></div>
                    <div class="col-2 col-lg-1 p-0" style><button type="button" class="js-edit-btn btn btn-secondary  w-100 h-100 rounded-0">Edit</button></div>
                    <div class="col-2 col-lg-1 p-0" ><button type="button" class="js-delete-btn btn btn-danger  w-100 h-100 rounded-0">Delete</button></div>
                    </div>
                `
                listContainer.insertAdjacentHTML('beforeend', newRow);
                const row = listContainer.lastElementChild;
                row.querySelector('.js-text').textContent = item.text;
        }

    })

} else {
    // new user
    const row = `
        <div data-index="0"class="row bg-light border border-black border-top-0 js-active">
          <div class="col-2 col-sm-1 p-2 d-flex justify-content-center align-items-center" ><button class="js-check-btn btn btn-light rounded-5 border border-dark-subtle w-100 h-100"></button></div>
          <div class="col p-0" ><p  class="js-text mb-0 px-3 py-2  w-100 h-100 d-flex align-items-center text-black">Check, Edit or Delete</p></div>
          <div class="col-2 col-lg-1 p-0" style><button type="button" class="js-edit-btn btn btn-secondary  w-100 h-100 rounded-0">Edit</button></div>
          <div class="col-2 col-lg-1 p-0" ><button type="button" class="js-delete-btn btn btn-danger  w-100 h-100 rounded-0">Delete</button></div>
        </div>
        `
      listContainer.insertAdjacentHTML('beforeend', row);

    // save
    const newSave = [];
    const texts = document.querySelectorAll('.js-text');
    texts.forEach((text) => {
        const row = text.closest('.row');
        newSave.push({
            text: text.textContent,
            completed: row.classList.contains('js-completed')
        })

    })

    localStorage.setItem('save', JSON.stringify(newSave));
}

function clean() {
    const rows = document.querySelectorAll('.js-completed, .js-active');
    rows.forEach((row)=>{row.remove()});
}



function render(filter) {
    const save = JSON.parse(localStorage.getItem('save'));

    switch(filter){
        case 'all':
        save.forEach((item, index) => {
            if(item.completed){
                const newRow = `
                        <div data-index="${index}" class="row bg-dark border border-black border-top-0 js-completed">
                            <div class="col-2 col-sm-1 p-2  d-flex justify-content-center align-items-center" ><button class="js-check-btn btn btn-primary rounded-5 border border-dark-subtle w-100 h-100"></button></div>
                            <div class="col p-0 " ><p class="js-text mb-0 px-3 py-2  w-100 h-100 d-flex align-items-center text-white"></p></div>
                            <div class="col-2 col-lg-1 p-0" style><button type="button" class="js-edit-btn  btn btn-secondary  w-100 h-100 rounded-0">Edit</button></div>
                            <div class="col-2 col-lg-1 p-0" ><button type="button" class="js-delete-btn btn btn-danger  w-100 h-100 rounded-0">Delete</button></div>
                        </div>
                    `
                    listContainer.insertAdjacentHTML('beforeend', newRow);

                    const row = listContainer.lastElementChild;
                    row.querySelector('.js-text').textContent = item.text;

            } else {
                
                const newRow = `
                        <div  data-index="${index}"class="row bg-light border border-black border-top-0 js-active">
                            <div class="col-2 col-sm-1 p-2 d-flex justify-content-center align-items-center" ><button class="js-check-btn btn btn-light rounded-5 border border-dark-subtle w-100 h-100"></button></div>
                            <div class="col p-0" ><p  class="js-text mb-0 px-3 py-2  w-100 h-100 d-flex align-items-center text-black"></p></div>
                            <div class="col-2 col-lg-1 p-0" style><button type="button" class="js-edit-btn btn btn-secondary  w-100 h-100 rounded-0">Edit</button></div>
                            <div class="col-2 col-lg-1 p-0" ><button type="button" class="js-delete-btn btn btn-danger  w-100 h-100 rounded-0">Delete</button></div>
                        </div>
                    `
                    listContainer.insertAdjacentHTML('beforeend', newRow);

                    const row = listContainer.lastElementChild;
                    row.querySelector('.js-text').textContent = item.text;
            }
        });
        break;

        case 'active':
            save.forEach((item, index) => {
                if(!item.completed){
                    const newRow = `
                            <div data-index="${index}" class="row bg-light border border-black border-top-0 js-active">
                                <div class="col-2 col-sm-1 p-2 d-flex justify-content-center align-items-center" ><button class="js-check-btn btn btn-light rounded-5 border border-dark-subtle w-100 h-100"></button></div>
                                <div class="col p-0" ><p  class="js-text mb-0 px-3 py-2  w-100 h-100 d-flex align-items-center text-black"></p></div>
                                <div class="col-2 col-lg-1 p-0" style><button type="button" class="js-edit-btn btn btn-secondary  w-100 h-100 rounded-0">Edit</button></div>
                                <div class="col-2 col-lg-1 p-0" ><button type="button" class="js-delete-btn btn btn-danger  w-100 h-100 rounded-0">Delete</button></div>
                            </div>
                        `
                        listContainer.insertAdjacentHTML('beforeend', newRow);

                        const row = listContainer.lastElementChild;
                        row.querySelector('.js-text').textContent = item.text;

                } 
            });
        break;

        case 'completed':
            save.forEach((item, index) => {
            if(item.completed){
                const newRow = `
                        <div data-index="${index}" class="row bg-dark border border-black border-top-0 js-completed">
                            <div class="col-2 col-sm-1 p-2  d-flex justify-content-center align-items-center" ><button class="js-check-btn btn btn-primary rounded-5 border border-dark-subtle w-100 h-100"></button></div>
                            <div class="col p-0 " ><p class="js-text mb-0 px-3 py-2  w-100 h-100 d-flex align-items-center text-white"></p></div>
                            <div class="col-2 col-lg-1 p-0" style><button type="button" class="js-edit-btn  btn btn-secondary  w-100 h-100 rounded-0">Edit</button></div>
                            <div class="col-2 col-lg-1 p-0" ><button type="button" class="js-delete-btn btn btn-danger  w-100 h-100 rounded-0">Delete</button></div>
                        </div>
                    `
                    listContainer.insertAdjacentHTML('beforeend', newRow);

                    const row = listContainer.lastElementChild;
                    row.querySelector('.js-text').textContent = item.text;

            } 
        });
        break;

        default: return
    }
}


// Filters

const allFilter = document.querySelector('.js-filter-all');
const activeFilter = document.querySelector('.js-filter-active');
const completedFilter = document.querySelector('.js-filter-completed');

function updateSelectedFilter(filter){
    const previousFilter = document.querySelector('.js-selected');
    previousFilter.classList.remove('js-selected');
    previousFilter.classList.remove('py-2');

    filter.classList.add('js-selected');
    filter.classList.add('py-2');
}


allFilter.addEventListener('click', () => {
    clean();
    render('all');

    currentFilter = 'all';

    updateSelectedFilter(allFilter);
})
activeFilter.addEventListener('click', () => {
    clean();
    render('active');

    currentFilter = 'active';

    updateSelectedFilter(activeFilter)
})
completedFilter.addEventListener('click', () => {
    clean();
    render('completed');

    currentFilter = 'completed';

    updateSelectedFilter(completedFilter);
})



// Add new row
function addRow(){
     const newInput = userInput.value;

    if(!newInput) {
        return;
    }

    const save = JSON.parse(localStorage.getItem('save'));


    save.push({ 
        text: newInput,
        completed: false
    })
    localStorage.setItem('save', JSON.stringify(save));

    clean();
    render(currentFilter);

    userInput.value = '';
}

addBtn.addEventListener('click', addRow );

userInput.addEventListener('keydown', (e)=> {
    if(e.key === 'Enter') {
        addRow();
    }
});

// delete a row

document.addEventListener('click', (e) => {
    const deleteButton = e.target.closest('.js-delete-btn');

    if (!deleteButton) return;

    const row = deleteButton.closest('.row');
    const rowIndex = row.dataset.index;
    console.log(rowIndex);

    const save = JSON.parse(localStorage.getItem('save'));
    save.splice(rowIndex, 1);
    localStorage.setItem('save', JSON.stringify(save));

    clean();
    
    render(currentFilter);
})


// mark / unmark row as completed / active
document.addEventListener('click', (e) => {
    const checkButton = e.target.closest('.js-check-btn');

    if(!checkButton) return;


    const row = checkButton.closest('.row');

    const text =  row.querySelector('.js-text');

    if (row.classList.contains('js-active') || row.classList.contains('js-completed')){

        row.classList.toggle('js-active');
        row.classList.toggle('js-completed');
        row.classList.toggle('bg-light');
        row.classList.toggle('bg-dark');
        checkButton.classList.toggle('btn-light');
        checkButton.classList.toggle('btn-primary');
        text.classList.toggle('text-black');
        text.classList.toggle('text-white');
    } 

    const save = JSON.parse(localStorage.getItem('save'));
    save[row.dataset.index].completed = !save[row.dataset.index].completed;

    localStorage.setItem('save', JSON.stringify(save));
});


// Edit a task
document.addEventListener('click', (e) => {

    const editButton = e.target.closest('.js-edit-btn');

    if(editButton){ 

    const row = editButton.closest('.row');
    const text =  row.querySelector('.js-text');

    const currentText = text.textContent;

    text.innerHTML = '<input type="text" class="js-input-update w-100 rounded-3 border border-black">';

    const input = text.querySelector('.js-input-update');
    input.value = currentText;


    editButton.textContent = 'Save';
    editButton.classList.remove('js-edit-btn');
    editButton.classList.add('js-save-btn');
    
    return;
    }


    // Save after edit
    const saveButton = e.target.closest('.js-save-btn');

    if(saveButton) {

    const row = saveButton.closest('.row');
    const text =  row.querySelector('.js-text');
    const userInput =row.querySelector('.js-input-update');

    
    text.textContent = userInput.value;

    saveButton.textContent = 'Edit';
    saveButton.classList.remove('js-save-btn');
    saveButton.classList.add('js-edit-btn');

    const save = JSON.parse(localStorage.getItem('save') ?? '[]');
    save[row.dataset.index].text = userInput.value;
    localStorage.setItem('save', JSON.stringify(save));

    return;
    }
});

document.addEventListener('click', (e) => {

    const editButton = e.target.closest('.js-filter-active');

    if(editButton){ 

    }

})


