const BTN_SELECTOR = `.btn`;
const DELETE_BTN_SELECTOR = `.fa-times`;
const ITEM_SELECTOR = `.collection-item`;
class TodosView {
  constructor($el, config = {}) {
    this._container = $el;
    this._$list = null;
    this._$todo = null;
    this._$ul = null;
    this._config = config;
    this.initView();
    this.$taskInput = $(`#task`);
  }
  initView() {
    console.log(this.$taskInput);
    this._$list = $(this.getContainer());
    this._$ul = $(`<ul class="collection"></ul>`);
    this._$list.prepend(this._$ul);
    this._container.append(this._$list);
    this._$list.on(`click`, DELETE_BTN_SELECTOR, this.onlistClick.bind(this));
    this._$list.on(`click`, ITEM_SELECTOR, this.onItemClick.bind(this));
    this._container.on(`click`, BTN_SELECTOR, this.onAddBtnClick.bind(this));
  }
  onAddBtnClick() {
    const todo = {
      isDone: false,
      title: this.$taskInput.val(),
    };

    this._config.onAdd(todo);
    this.clearInput();
  }

  clearInput() {
    this.$taskInput.val("");
  }
  onlistClick(e) {
    e.stopPropagation();
    const id = this.getElementId($(e.target));

    this._config.onDelete(id);
  }
  onItemClick(e) {
    const id = this.getElementId($(e.target));

    this._config.onToggle(id);
  }
  renderList(list) {
    this._$ul.html(list.map(this.getListItemHtml).join(""));
  }
  getContainer() {
    return ` <div class="card-action d-flex flex-column">
              <div class="input-field col s12"></div>
                <div class="row">
                <ul class="collection"></ul>
                 <div class="input-field col s12">
                  <input type="text" name="task" id="task" />
                  <label for="task">Task</label>
                 </div>
                </div>
                <div class="row col-sm-7 col-md-4">
                <button class="btn">Add task</button>
              </div>
             </div>`;
  }
  getListItemHtml({ id, title, isDone }) {
    return `<li class="collection-item ${
      isDone ? `green` : ``
    }" id="${id}">${title}
                <a class="remove-item secondary-content">
                <i class="fas fa-times"></i>
                </a>
            </li>`;
  }
  getElementId($el) {
    return $el.closest(ITEM_SELECTOR).attr("id");
  }
}
