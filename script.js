const listContainer = document.getElementById('js-list-container');
const addBtn = document.getElementById('js-add-btn');
const userInput = document.getElementById('js-user-input');


//check storage
const oldSave = localStorage.getItem('save') ?? null;

if(oldSave){
    // restore if there is a save and recreated rows
    const save = JSON.parse(oldSave);
    save.forEach((item) => {
        if(item.completed){
            const newRow = `
                    <div class="row bg-dark border border-black border-top-0 js-completed">
                    <div class="col-2 col-sm-1 p-2  d-flex justify-content-center align-items-center" ><button class="js-check-btn btn btn-primary rounded-5 border border-dark-subtle w-100 h-100"></button></div>
                    <div class="col p-0 " ><p class="js-text mb-0 px-3 py-2  w-100 h-100 d-flex align-items-center text-white">${item.text}</p></div>
                    <div class="col-2 col-lg-1 p-0" style><button type="button" class="js-edit-btn  btn btn-secondary  w-100 h-100 rounded-0">Edit</button></div>
                    <div class="col-2 col-lg-1 p-0" ><button type="button" class="js-delete-btn btn btn-danger  w-100 h-100 rounded-0">Delete</button></div>
                    </div>
                `
                listContainer.insertAdjacentHTML('beforeend', newRow);

        } else {
            
            const newRow = `
                    <div class="row bg-light border border-black border-top-0 js-active">
                    <div class="col-2 col-sm-1 p-2 d-flex justify-content-center align-items-center" ><button class="js-check-btn btn btn-light rounded-5 border border-dark-subtle w-100 h-100"></button></div>
                    <div class="col p-0" ><p  class="js-text mb-0 px-3 py-2  w-100 h-100 d-flex align-items-center text-black">${item.text}</p></div>
                    <div class="col-2 col-lg-1 p-0" style><button type="button" class="js-edit-btn btn btn-secondary  w-100 h-100 rounded-0">Edit</button></div>
                    <div class="col-2 col-lg-1 p-0" ><button type="button" class="js-delete-btn btn btn-danger  w-100 h-100 rounded-0">Delete</button></div>
                    </div>
                `
                listContainer.insertAdjacentHTML('beforeend', newRow);
        }

    })

} else {
    // new user
    const row = `
        <div class="row bg-light border border-black border-top-0 js-active">
          <div class="col-2 col-sm-1 p-2 d-flex justify-content-center align-items-center" ><button class="js-check-btn btn btn-light rounded-5 border border-dark-subtle w-100 h-100"></button></div>
          <div class="col p-0" ><p  class="js-text mb-0 px-3 py-2  w-100 h-100 d-flex align-items-center text-black">Enter a new task</p></div>
          <div class="col-2 col-lg-1 p-0" style><button type="button" class="js-edit-btn btn btn-secondary  w-100 h-100 rounded-0">Edit</button></div>
          <div class="col-2 col-lg-1 p-0" ><button type="button" class="js-delete-btn btn btn-danger  w-100 h-100 rounded-0">Delete</button></div>
        </div>
        `
      listContainer.insertAdjacentHTML('beforeend', row);
}


// save in local storage
function saveLocalStorage() {
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




// Add new row
addBtn.addEventListener('click', () =>{
    const newInput = userInput.value;

    if(!newInput) {
        return;
    }

    const newRow = `
    <div class="row bg-light border border-black border-top-0 js-active">
          <div class="col-2 col-sm-1 p-2 d-flex justify-content-center align-items-center" ><button class="js-check-btn btn btn-light rounded-5 border border-dark-subtle w-100 h-100"></button></div>
          <div class="col p-0" ><p  class="js-text mb-0 px-3 py-2  w-100 h-100 d-flex align-items-center"></p></div>
          <div class="col-2 col-lg-1 p-0" style><button type="button" class="js-edit-btn btn btn-secondary  w-100 h-100 rounded-0">Edit</button></div>
          <div class="col-2 col-lg-1 p-0" ><button type="button" class="js-delete-btn btn btn-danger w-100 h-100 rounded-0">Delete</button></div>
    </div>
    `
    listContainer.insertAdjacentHTML('beforeend', newRow);

    const row = listContainer.lastElementChild;
    row.querySelector('p').textContent = newInput;
    userInput.value = '';

    saveLocalStorage();

});

// delete a row

document.addEventListener('click', (e) => {
    const deleteButton = e.target.closest('.js-delete-btn');

    if (!deleteButton) return;

    deleteButton.closest('.row').remove();

    saveLocalStorage();
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

    saveLocalStorage();
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

    saveLocalStorage();

    return;
    }
});

