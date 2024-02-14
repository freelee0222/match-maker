let friends;
let user;
let match;

$('#matchBox').hide();
$('#errorMsg').hide();

if (sessionStorage.hasOwnProperty('submitted')) {
    $('form').hide();
    $('#matchBox').show();
    fetch('/api/friends')
        .then(response => response.json())
        .then(data => {
            user = data[data.length - 1];
            friends = data.filter(friend => friend.name !== user.name)
        })
        .then(() => {
            let diffArr = [];
            let matchArr = [];
            friends.forEach(friend => {
                diffNum = 0;
                for (let i = 0; i < user.scores.length; i++) {
                    diffNum += (Math.abs(Number(user.scores[i]) - Number(friend.scores[i])));
                }
                diffArr.push(diffNum);
                matchArr.push(diffNum);
            });

             match = friends[diffArr.indexOf(matchArr.sort((a, b) => a - b)[0])];


 
           
        })
        .then(() => {
            $('#matchPic').attr('src', match.photo).attr('alt', `Photo of ${match.name}`);
            $('#matchName').text(match.name);
        })
        .catch(err => {
            console.log(err);
        });
}

$('#submitBtn').click((e) => {
    e.preventDefault();
    $('#errorMsg').hide();
    $('#feedback').text("");
    if ($('#userName').val() === "") {
        $('#errorMsg').show();
        $('#feedback').text('Please enter your name');
        return;
    }
    if ($('#userPic').val() === "") {
        $('#errorMsg').show();
        $('#feedback').text('Please provide a photo URL');
        return;
    }
    if ($('.active').length < 10) {
        $('#errorMsg').show();
        $('#feedback').text(`You missed ${10 - $('.active').length} questions...Please answer all questions.`);
        return;
    }
    sessionStorage.setItem('submitted', true);
    $('form').submit();
});

$('#homeBtn').click(() => {
    sessionStorage.clear();
});