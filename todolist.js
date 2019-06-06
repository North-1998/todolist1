window.addEventListener("load",function () {
    let tab = document.querySelectorAll(".top > li");
    let pre = 0;
    let type = "all"
    let list = document.querySelector(".list");
    let todolist = [
        {id:1, content:"端午节不交作业",ctime:"2019/6/4",status:false },
        {id:2, content:"不想交作业",ctime:"2019/6/4",status:false },
        {id:3, content:"不用交作业",ctime:"2019/6/4",status:false },
        {id:4, content:"以上是我的白日梦",ctime:"2019/6/4",status:true },
    ]
    let str =localStorage.getItem("todolist");
    if (!str){
        saveData();
    }
    todolist=JSON.parse(str);
    
    tab.forEach(function (ele,index) {
        ele.onclick = function () {
          tab[pre].classList.remove("hot");
          this.classList.add("hot");
          pre = index;
          type = this.getAttribute("type");
          render(fliterDate(type));

        }
    })
    render(todolist);
    tab[0].onclick();

//switch封装
    function  fliterDate(type) {
        let arr =[];
        switch (type) {
            case "all":
                arr = todolist;
                break;
            case "done":
                arr = todolist.filter(function (ele) {
                    return ele.status;
                });
                break;
            case "doing":
                arr = todolist.filter(function (ele) {
                    return !ele.status;

                });
                break;
        }
        return arr;

    }
    //修改状态
    list.onclick = function (e) {

        let target = e.target;
        let id = target.parentNode.id;
        if (target.nodeName ==="INPUT"){
            let ele = todolist.filter(ele=>ele.id == id)[0];
            console.log(ele);
            ele.status =target.checked;
            // console.log(ele);
            // console.log(ele.status);

        } else if (target.nodeName ==="DEL"){
              let index = todolist.findIndex(ele=>ele.id == id);
              todolist.splice(index,1);

          }
        saveData();
        render(fliterDate(type));
    }
//    本地存储
    function saveData(){
        localStorage.setItem("todolist",JSON.stringify(todolist))
    }
//    增加列表
    let form = document.forms[0];
    let contentBtn = form.elements[0];
    let submitBtn = form.elements[1];
      submitBtn .onclick = function (e) {
          e.preventDefault();
          let obj = createobj();
          todolist.push(obj);
          form.reset();
          render(fliterDate(type))
          saveData();

      };
      function createobj() {
          let id = todolist[todolist.length-1].id+1;
          let content = contentBtn.value;
          let ctime = new Date().toLocaleDateString();
          let status = false;
          return{id,content,ctime,status};
      }
//    渲染列表
    function render(arr) {
        let html =``;
        arr.forEach(function (ele,index) {
            if (ele.status) {
                html +=`
                   <li id ='${ele.id}'>
                       <input type="checkbox" checked>
                       <p>${ele.content}</p>
                       <del>X</del>
                       <time>${ele.ctime}</time>
                      
                   </li>`;
            }else {
                html +=`
                   <li id ='${ele.id}'>
                       <input type="checkbox">
                       <p>${ele.content}</p>
                       <del>X</del>
                       <time>${ele.ctime}</time>
                       
                   </li>`;
            }




        })
        list.innerHTML = html;



    }
})