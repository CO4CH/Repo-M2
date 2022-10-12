var URL = 'http://localhost:5000/amigos';

var ShowFriends = function() {

    $('#lista').empty();

    $.get(`${URL}`, function(friends) {

        friends.forEach( e => {
            let li = document.createElement('li');
            li.id = e.id;
            li.innerText =` ${e.name} X`;
            let list = document.getElementById('lista')
            list.appendChild(li);
        });
    });
}

$('#boton').click(ShowFriends);

$('#search').click(function() {

    let id = $('#input').val()
    
    if(id){
        $.get(`${URL}/${id}`, function(friend){

            $('#amigo').text(`${friend.name} ${friend.age} ${friend.email}`);
            $('#input').val('')
        });
    } else  $('#amigo').text('Tienes que ingresar un ID')
})

$('#delete').click(function() {

    let id = $('#inputDelete').val()
    
    let friend;


    
    if(id){
        $.get(`${URL}/${id}`, function(f){ friend = f.name });

        $.ajax({

            url: `${URL}/${id}`,
            type: 'delete',
            success: function(){
                $('#success').text(`Tu amigo ${friend} fue eliminado correctamente`);
                $('#inputDelete').val('')
                ShowFriends()
            } 
        });
    } else  $('#success').text('Tienes que ingresar un ID')
})