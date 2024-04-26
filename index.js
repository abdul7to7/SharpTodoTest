let crudcurdKey = "61854dc1641547368b40383c4093259d";

window.document.addEventListener("DOMContentLoaded", async () => {
  let res =
    (await axios.get(`https://crudcrud.com/api/${crudcurdKey}/todos`)) || [];
  let remaining = [];
  let done = [];
  //   console.log(res.data);
  res?.data?.forEach((i) => {
    if (i.isCompleted) done.push(i);
    else remaining.push(i);
  });
  remaining.forEach((item) => {
    let li = document.createElement("li");
    let title = document.createTextNode(" " + item.todoTitle + "  ||");
    let desc = document.createTextNode(" " + item.todoDesc + "  ");
    let btn = document.createElement("button");
    btn.appendChild(document.createTextNode("done"));
    btn.setAttribute("_id", item._id);
    btn.setAttribute("completed", "false");
    btn.classList.add("doneBtn");

    // btn.setAttribute("disabled", "true");
    let btn2 = document.createElement("button");
    btn2.classList.add("delBtn");
    btn2.setAttribute("_id", item._id);

    btn2.appendChild(document.createTextNode("delete"));

    li.appendChild(title);
    li.appendChild(desc);
    li.appendChild(btn);
    li.appendChild(btn2);

    document.querySelector(".remUl").appendChild(li);
  });
  done.forEach((item) => {
    let li = document.createElement("li");
    let title = document.createTextNode(" " + item.todoTitle + "  ||");
    let desc = document.createTextNode(" " + item.todoDesc + "  ");
    let btn = document.createElement("button");
    btn.appendChild(document.createTextNode("done"));
    btn.setAttribute("_id", item._id);
    btn.setAttribute("completed", "true");
    btn.classList.add("doneBtn");
    let btn2 = document.createElement("button");
    btn2.classList.add("delBtn");
    btn2.setAttribute("_id", item._id);
    btn2.appendChild(document.createTextNode("delete"));

    li.appendChild(title);
    li.appendChild(desc);
    li.appendChild(btn);
    li.appendChild(btn2);

    document.querySelector(".compUl").appendChild(li);
  });
  console.log("rem", remaining);
  console.log("done", done);
});

document.querySelector(".add-todo").addEventListener("click", () => {
  console.log("clicked");
  let todoTitle = document.querySelector(".todo-title").value.trim();
  let todoDesc = document.querySelector(".todo-desc").value.trim();
  console.log(todoTitle, todoDesc);
  axios.post(`https://crudcrud.com/api/${crudcurdKey}/todos`, {
    todoTitle: todoTitle,
    todoDesc: todoDesc,
    isCompleted: false,
  });
  //   location.reload();
});

document.querySelector(".remUl").addEventListener("click", handleItems);
document.querySelector(".compUl").addEventListener("click", handleItems);

async function handleItems(e) {
  if (e.target.classList.contains("delBtn")) {
    e.target.parentElement.parentElement.removeChild(e.target.parentElement);
    await axios.delete(
      `https://crudcrud.com/api/${crudcurdKey}/todos/${e.target.getAttribute(
        "_id"
      )}`
    );
  }
  if (e.target.classList.contains("doneBtn")) {
    // let status = e.target.getAttribute("status");
    // if (status === "false") status = true;
    // else status = false;
    let item = await axios.get(
      `https://crudcrud.com/api/${crudcurdKey}/todos/${e.target.getAttribute(
        "_id"
      )}`
    );
    console.log(item.data);
    // const headers = {
    //   "Access-Control-Allow-Origin": "*",
    // };

    await axios.put(
      `https://crudcrud.com/api/${crudcurdKey}/todos/${e.target.getAttribute(
        "_id"
      )}`,
      {
        ...item.data,
        isCompleted: !item.data.isCompleted,
      }
    );
  }
  //   console.log(e.target);
}
