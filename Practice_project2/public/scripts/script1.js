async function save(event) {
    let title = document.getElementById('title').value;
    let desc = document.getElementById('description').value;
    if(!title) {
        alert('Please enter title')
        return;
    } else if(!desc) {
        alert('Please enter description')
        return
    }
    
    // await fetch('/').then((result)=>{
    //     alert(result);
    // }).catch(error=>alert(error+' error he'));
    // event.preventDefault();
    //     // this.reset();
}
function showDetails(event) {
    event.preventDefault();
}

function reset() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
}

function prevent(event) {
    console.log(event)
    event.preventDefault();
    return;
}
