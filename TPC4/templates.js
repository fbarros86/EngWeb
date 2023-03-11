exports.todolist= function(tasks,tasktoedit){
    pagHTML = `
    <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <link rel="stylesheet" href="public/w3.css"/>
        <link rel="icon" href="checked.png"/>
        <title>Tarefas</title>
    </head>
    <body class="w3-light-grey">
        <div class ="header w3-padding-16 w3-card">
            <div class="w3-margin">
                <h1>Introduza dados</h1>
            </div>
            <div clas="container">
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Tarefa</legend>
                        <div style="display: flex;">
                        `
    if (tasktoedit){
        pagHTML+=   `
                        <label class="w3-padding">  Data  </label>
                        <input class="w3-input w3-round" type="text" name="duedate" value="${tasktoedit.duedate}">
                        <label class="w3-padding">  Quem  </label>
                        <input class="w3-input w3-round" type="text" name="who" value="${tasktoedit.who}">
                    </div>
                    <div class="w3-padding">
                        <label>Descrição</label>
                        <input class="w3-input w3-round" type="text" name="what" value="${tasktoedit.what}">
                        <input type="hidden" name="id" value="${tasktoedit.id}" />
                    </div>`

    }
    else{
        pagHTML+=   `
                        <label class="w3-padding">  Data  </label>
                        <input class="w3-input w3-round" type="text" name="duedate">
                        <label class="w3-padding">  Quem  </label>
                        <input class="w3-input w3-round" type="text" name="who">
                    </div>
                    <div class="w3-padding">
                        <label>Descrição</label>
                        <input class="w3-input w3-round" type="text" name="what">
                    </div>`}
                    
    pagHTML+=    `</fieldset>
                <div class="w3-padding-small w3-right w3-left-margin">
                    <button class="w3-btn w3-teal w3-mb-2 w3-round-large" type="submit">Submit</button>
                </div>
            </form>
            </div>
        </div>
        <div class="w3-row-padding  w3-padding w3-card-4" name="content">   
            <div name="to-do" class="w3-half w3-center w3-card w3-row-padding">
                <h1>TAREFAS A REALIZAR</h1>
                <div>
                    <table class="w3-table-all">
                        <tr>
                            <td>
                                Data Limite
                            </td>
                            <td>
                                Quem
                            </td>
                            <td>
                                Info
                            </td>
                        </tr>
                        `
    for(var task of  tasks){
        if (!('done' in task)){
            pagHTML+= `<tr> 
             <td>
                 ${task.duedate}
             </td>
             <td>
             ${task.who}
             </td>
             <td>
             ${task.what}
             </td>
             <td>
                 <div class="w3-padding-small w3-right w3-left-margin">
                     <button class="w3-btn w3-teal w3-mb-2 w3-round-large w3-mar" type="submit"><a href="/edit/${task.id}">Edit</a></button>
                 </div>
                 <div class="w3-padding-small w3-right w3-left-margin">                            
                     <button class="w3-btn w3-teal w3-mb-2 w3-round-large" type="submit"><a href="/done/${task.id}">Done</a></button>
                 </div>
             </td>
         </tr>`
    }
}
    
                          

pagHTML+=`  </table>
                </div>
            </div>
            <div name="done" class="w3-half w3-center w3-card w3-row-padding">
                <h1>TAREFAS REALIZADAS</h1>
                <table class="w3-table-all">
                    <tr>
                        <td>
                            Data Limite
                        </td>
                        <td>
                            Quem
                        </td>
                        <td>
                            Info
                        </td>
                    </tr>`
    for(var task of  tasks){
        if ('done' in task){
            pagHTML+=`<tr> 

            <td>
                ${task.duedate}
            </td>
            <td>
            ${task.who}
            </td>
            <td>
            ${task.what}
            </td>
            </tr>`}
    }

    pagHTML+=`     
                </table>
            </div>
        </div>
    </body>
</html>
    `
    return pagHTML
}