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
        return $(
    //         `<li id="post-${data.post._id}">
    //     <img src="${data.user.avatar}" width="20">
    //     <a href="/user/profile/${data.user._id}">${data.user.name}</a>
    //     ${data.post.content}
    //         <a class="delete-post-button" href="/post/delete/${data.post._id}">X</a>
    //     <br>
    //     <form method="POST" action="/like/toggle/?id=${data.post._id}&type=Post">
    //         <button type="submit">0 Likes</button>
    //     </form>
    // <p>Comments:</p>
    //     <form action="/comment/create" method="POST">
    //         <input type="text" id="content" name="content" placeholder="Add Comment..." required>
    //         <input type="hidden" name="post" value="${data.post._id}">
    //         <button type="submit">Add Comment</button>
    //     </form>
    // </li>`
    `<div class="w-400 mw-full" id="post-${data.post._id}"> 
    <div class="card p-0"> 
      <div class="content">
        <div> 
          <li id="post-${data.post._id}" style="list-style: none;">
            <b>${data.post.content}</b>
                <a class="delete-post-button" href="/post/delete/${data.post._id}">X</a>
            <br>
            <img src="${data.user.avatar}" width="20">
            <a href="/user/profile/${data.user._id}">${data.user.name}</a>
          </li>
          <li style="list-style: none;">
            <form method="POST" action="/like/toggle/?id=${data.post._id}&type=Post">
                <button type="submit">0 Likes</button>
            </form>
          </li>
            <p>Comments: </p>
            <li style="list-style: none;">
                <form action="/comment/create" id="comment-create-form" method="POST">
                    <input type="text" id="content" name="content" placeholder="Add Comment..." required>
                    <input type="hidden" name="post" value="${data.post._id}">
                    <button type="submit">Add Comment</button>
                </form>
            </li>
        </div>
      </div>
    </div>
  </div>`
)
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

