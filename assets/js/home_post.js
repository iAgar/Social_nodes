{
//method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        //to prevent the form being submitted naturally
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/post/create',
                //this converts the form data into json
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newPost = newPostDOM(data.data);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    new Noty({
                        theme: 'sunset',
                        text: "Post created successfully!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 3000,
                        progressBar: false
                    }).show();
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    //method to create a post in DOM
    let newPostDOM = function(data){
        return $(`<li id="post-${data.post._id}">
        ${data.post.content}
            <a class="delete-post-button" href="/post/delete/${data.post._id}">X</a>
        <br>
        <a href="/user/profile/${data.user._id}">${data.user.name}</a>
    <br>
    <p>Comments:</p>
        <form action="/comment/create" method="POST">
            <input type="text" id="content" name="content" placeholder="Add Comment..." required>
            <input type="hidden" name="post" value="${data.post._id}">
            <button type="submit">Add Comment</button>
        </form>
    </li>`)
    }

    //method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            
            $.ajax({
                type: 'get',
                //this is how we get the value of href present in anchor tag
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.data}`).remove();
                    new Noty({
                        theme: 'sunset',
                        text: "Post deleted successfully!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 3000,
                        progressBar: false
                    }).show();
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    createPost();
}

{
   /* let createComment = function(){
        let newCommentForm = $('#comment-create-form');

        newCommentForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/comment/create',
                data: newCommentForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newComment = newCommentDOM(data.data);
                    $('#comment-list-container>ul').prepend(newComment);
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    let newCommentDOM = function(data){
        return $(`${data.comment.content}
            <a href="/comment/delete/${data.comment._id}">X</a>
        <br>
        <a href="/user/profile/${data.user._id}">${data.user.name}</a>
        <br>`)
    }

    createComment();*/
}