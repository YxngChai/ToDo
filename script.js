const listContainer = document.getElementById('js-list-container');
const addBtn = document.getElementById('js-add-btn');
const userInput = document.getElementById('js-user-input');


addBtn.addEventListener('click', () =>{
    const newInput = userInput.value;

    if(!newInput) {
        return;
    }
    console.log(newInput);

    const newRow = `
    <div class="row border border-black border-top-0 js-active">
          <div class="col-2 col-sm-1 p-2 bg-secondary-subtle d-flex justify-content-center align-items-center" ><button class="btn btn-light rounded-5 border border-dark-subtle w-100 h-100"></button></div>
          <div class="col p-0 bg-light" ><p  class="mb-0 px-3 py-2  w-100 h-100 d-flex align-items-center"></p></div>
          <div class="col-2 col-lg-1 p-0" style><button type="button" class="btn btn-secondary  w-100 h-100 rounded-0">Edit</button></div>
          <div class="col-2 col-lg-1 p-0" ><button type="button" class="js-delete-btn btn btn-danger w-100 h-100 rounded-0">Delete</button></div>
    </div>
    `
    listContainer.insertAdjacentHTML('beforeend', newRow);

    const row = listContainer.lastElementChild;
    row.querySelector('p').textContent = newInput;
    userInput.value = '';

});


document.addEventListener('click', (e) => {
    const deleteButton = e.target.closest('.js-delete-btn');

    if (!deleteButton) return;

    deleteButton.closest('.row').remove();
})

