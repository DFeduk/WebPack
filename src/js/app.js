import TodosController from `./controller/TodosController`;

$(() => {
  new TodosController($(`.card`));
});
