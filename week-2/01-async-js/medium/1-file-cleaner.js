// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```



const fs=require('fs')
let readdata

fs.readFile('a.txt','utf-8',(err,data)=>{
    // let readdata=data.split(" ").filter((str)=>str.trim()!=="").join(" ")  can do this

     readdata=data.split(" ").reduce((acc,curr)=>{
        if(curr.trim()!=="")acc.push(curr);
         return acc; //we have to return in any case
    },[]).join(" ")

    fs.writeFile('a.txt',readdata,'utf-8',(err)=>{
        if(err)console.log(err)
    })
})

