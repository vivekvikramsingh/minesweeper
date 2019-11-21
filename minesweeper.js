// create two array and shuffle it to generate random index 

var row_ = [0,7,5,8,3,2,6,4,1,9]
shuffle(row_)
var column_ = [5,3,7,4,2,8,9,0,1,6]
shuffle(column_);
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
};
for (var i = 1; i <row_.length; i++) {
    column_.push(column_[i]);
}
column_.push(column_[0]);
row_=row_.concat(row_);

// creating a zero matrix of size 12X12 to palnt numbers according to bomb
var game = Array(12).fill().map(() => Array(12).fill(0));
for(var i=0;i<12;i++)
{
    game[0][i]=1;
    game[11][i]=1;
    game[i][0]=1;
    game[i][11]=1;
}


var table = document.getElementById("table1").rows;
var y;
for(var i = 0; i < 15; i++)
{   
    table[row_[i]].cells[column_[i]].style.background = 'url(' + "bomb.png" + ')';
    // increament number around bombs
    var m=row_[i]+1
    var n=column_[i]+1
    game[m][n]=-9;                          
    game[m-1][n-1]=game[m-1][n-1]+1;   
    game[m-1][n]=game[m-1][n]+1;
    game[m-1][n+1]=game[m-1][n+1]+1;
    game[m][n-1]=game[m][n-1]+1;
    game[m][n+1]=game[m][n+1]+1;
    game[m+1][n-1]=game[m+1][n-1]+1;
    game[m+1][n]=game[m+1][n]+1;
    game[m+1][n+1]=game[m+1][n+1]+1;
}


//  apply these incremented number to origional table



for (var i = 0; i < 10; i++) { 
    var x = document.getElementById("table1").rows[i].cells;
    for (var j = 0; j < 10; j++) { 
        if(game[i+1][j+1]>0){          // write only that number which is greater than 0
            x[j].innerHTML = game[i+1][j+1]; 
        }
    } 
}

var table = document.getElementById("table2"),rIndex,cIndex;
var flag=15;
var count=0;
var str="`";
var string=str.fontcolor("#ff5c33")

for(var i = 0; i < table.rows.length; i++)
    {
        for(var j = 0; j < table.rows[i].cells.length; j++)
        {
            table.rows[i].cells[j].onmousedown = function(event)
            {
                if(event.button===0)
                {
                    if(this.innerHTML==string)
                    {
                        flag++;
                        var flag_ = document.getElementById('Flag');
                        flag_.innerHTML = flag;
                    }
                    this.style.visibility="hidden";
                    rIndex = this.parentElement.rowIndex+1;
                    cIndex = this.cellIndex+1;
                    if(game[rIndex][cIndex]<0){
                        setInterval(function()
                        {
                            disablescreen();
                        },1000)
                    }

                    var sol = Array(12).fill().map(() => Array(12).fill(0));
                    if(game[rIndex][cIndex]===0){
                        func(game,rIndex,cIndex,sol);
                    }
                    for (var i = 0; i < 10; i++) { 
                        var x = document.getElementById("table2").rows[i].cells;
                        for (var j = 0; j < 10; j++) { 
                            if(sol[i+1][j+1]===1){
                                x[j].style.visibility="hidden"; 
                            }
                        } 
                    }
                };
                if(event.button===2)
                {
                    if(this.innerHTML!=string && flag>0)
                    {
                        rIndex = this.parentElement.rowIndex+1;
                        cIndex = this.cellIndex+1;
                        this.innerHTML=string;
                        flag--;
                        this.style.background = 'url(' + "flag.png" + ')';
                        var flag_ = document.getElementById('Flag');
                        flag_.innerHTML = flag;

                        if(game[rIndex][cIndex]<0){
                            count=count+1
                        }
                        if(count==15 && flag==0){
                        setInterval(function()
                        {
                            disablescreen(count);
                        },3000)}
                        }
                    }
                };
            }
        }






//#################################################################################
//function for opening null places onclick    

function disablescreen(count) 
{
    var div1= document.createElement("div");
    div1.className += "overlay";
    document.body.appendChild(div1);
    screen(count);
}

function screen(count) 
{
    var div2= document.createElement("div");
    div2.className += "overlay2";
    document.body.appendChild(div2);
    div2.style.fontSize="100px";
    div2.style.padding="25px";
    if(count==15){
        div2.innerHTML="YOU WIN";
        div2.style.paddingLeft="250px";
    }
    else{
        div2.innerHTML="GAME OVER";
        div2.style.paddingLeft="150px";
    }
    setTimeout(function(){window.location.reload(true)},3000)
}

function sleep(milliseconds) { 
    let timeStart = new Date().getTime(); 
    while (true) { 
        let elapsedTime = new Date().getTime() - timeStart; 
        if (elapsedTime > milliseconds) { 
            break; 
        } 
    } 
} 

function func(maze,m,n,sol)
{
    if(sol[m][n]!==1){
        sol[m][n]=1
        
        if(maze[m-1][n-1]===0){
            func(maze,m-1,n-1,sol)
        }
        else{
            sol[m-1][n-1]=1
        }

        if(maze[m-1][n]===0){
            func(maze,m-1,n,sol)
        }
        else{
            sol[m-1][n]=1
        }

        if(maze[m-1][n+1]===0){
            func(maze,m-1,n+1,sol)
        }
        else{
            sol[m-1][n+1]=1
        }

        if(maze[m][n-1]===0){
            func(maze,m,n-1,sol)
        }
        else{
            sol[m][n-1]=1
        }

        if(maze[m][n+1]===0){
            func(maze,m,n+1,sol)
        }
        else{
            sol[m][n+1]=1
        }

        if(maze[m+1][n-1]===0){
            func(maze,m+1,n-1,sol)
        }
        else{
            sol[m+1][n-1]=1
        }

        if(maze[m+1][n]===0){
            func(maze,m+1,n,sol)
        }
        else{
            sol[m+1][n]=1
        }

        if(maze[m+1][n+1]===0){
            func(maze,m+1,n+1,sol)
        }
        else{
            sol[m+1][n+1]=1
        }
    }
};
