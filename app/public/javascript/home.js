fetch('/api/friends')
.then(response => response.json())
.then(data => {
    $('#userCount').text(data.length)
})
.catch(err => {
    console.log(err);
});