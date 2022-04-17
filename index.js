const t11 = new Date()
const t1 = t11.getHours()
const t2 = t11.getMinutes()
const t3 = t11.getSeconds()
let timeinput = t1 + ":" + t2 + ":" + t3

showtask();

let addtaskinput = document.getElementById('addtaskinput');

function addtaskbtn() {

    addtaskinputval = document.getElementById('addtaskinput').value;
    let webtask = localStorage.getItem("localtask")
    if (addtaskinputval.trim() != 0) {
        // console.log(addtaskinputval.trim())  
        const objdata = {
                TaskName: addtaskinputval,
                Time: timeinput
            }
            // console.log(objdata.TaskName)
        if (webtask == null) {
            localStorage.setItem('localtask', '[]');
        }
        let taskobj = JSON.parse(webtask)
// debugger     
       let abc =  taskobj.filter(e =>e.TaskName === addtaskinputval)
     
       if(abc.length){
           console.log(abc.length)
        //  debugger
         alert("Data is already save")
     }else{
         taskobj.push(objdata);
         localStorage.setItem('localtask', JSON.stringify(taskobj))
            alert("Data is Save")
     }
     
    }
     
     
     
        // console.log(taskobj[2].TaskName)
            // taskobj.filter(function(i) {
            // taskobj.filter(function(ind) {
            // console.log(ind)
            // console.log(taskobj[2].TaskName)
        // if (taskobj[ind].TaskName !== addtaskinputval) {

        // })

        showtask();
        addtaskinput.value = ''

        window.location.reload()
    }
// };






/* Show-Data in Table */
function showtask() {
    let webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);
    // console.log(taskobj[].Time)
    let html = '';
    let addedtasklist = document.getElementById("addedtasklist");
    taskobj.forEach((item, index) => {
        html += `<tr>
                 <th>${index+1}</th>
                 <td>${item.TaskName} </td>
                 <td><button type="button"onclick="edittask(${index})">Edit</button></td>
                 <td><button type="button" onclick="deletedata(${index})" >Delete</button></td>
                 </tr>  
                 <br><br>`;


    });
    addedtasklist.innerHTML = html;
}

/* ----- Click Edit to Select data in indexing and get text field ----- */
//  showtime();
function edittask(index) {
    showtime();

    function showtime() { /* Show time in Browser  */
        document.getElementById("Timeshow").innerHTML = '';
        let webtask1 = localStorage.getItem("localtask");
        let taskobj1 = JSON.parse(webtask1);
        let timeshow = taskobj1[index].Time
        document.getElementById("Timeshow").innerHTML += "Adding Time " + `${timeshow}`



        let saveindex = document.getElementById("saveindex");
        let addtaskbtn = document.getElementById("addtaskbtn");
        let savetaskbtn = document.getElementById("savetaskbtn");
        let webtask = localStorage.getItem("localtask");
        let taskobj = JSON.parse(webtask);
        addtaskinput.value = taskobj[index].TaskName;
        addtaskbtn.style.display = "none";
        savetaskbtn.style.display = "block";
        saveindex.value = index;
    };
};



/* ----- Save Edited and Update new data in table ----- */
let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function() {
    let addtaskbtn = document.getElementById("addtaskbtn");
    let webtask = localStorage.getItem("localtask");
    let saveindex = document.getElementById("saveindex").value;
    let taskobj = JSON.parse(webtask);
    taskobj[saveindex].TaskName = addtaskinput.value;
    savetaskbtn.style.display = 'none';
    addtaskbtn.style.display = 'block';
    document.getElementById("Modtime").innerHTML = "Modify Time(" + timeinput + ")"
    localStorage.setItem('localtask', JSON.stringify(taskobj));
    addtaskinput.value = ''
    showtask();
});


/* ----- Delete value on click delete button ----- */
function deletedata(index) {
    let webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);
    taskobj.splice(index, 1);
    localStorage.setItem('localtask', JSON.stringify(taskobj));
    window.location.reload()
    showtask();
}


function searchadd() {
    let filterdata = document.getElementById('passtaskinput').value.toUpperCase();
    if (filterdata.trim() != 0) {
        let webtask = localStorage.getItem("localtask");
        let taskobj = JSON.parse(webtask);
        let addedtasklist = document.getElementById("addedtasklist");
        let searchtasklist = document.getElementById("searchtasklist");
        console.log(taskobj)
        taskobj.filter(function(el, ind) {
            let changecase = el.TaskName.toUpperCase()
            console.log(changecase)
            if (changecase === filterdata) {
                searchtasklist.innerHTML += `<tr>
                <th>${ind+1}</th>
                <td>${el.TaskName} </td>
                <td><button type="button"onclick="edittask(${ind})">Edit</button></td>
                <td><button type="button" onclick="deletedata(${ind})" >Delete</button></td>
                </tr>  
                <br><br>`;

            }
            addedtasklist.style.display = "none";
            searchtasklist.style.display = "block";
        });
    }
}


function reloadbtn() {
    window.location.reload();
}
