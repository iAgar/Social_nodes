{let t=function(){let t=$("#new-post-form");t.submit((function(n){n.preventDefault(),$.ajax({type:"post",url:"/post/create",data:t.serialize(),success:function(t){console.log(t);let n=e(t.data);$("#posts-list-container>ul").prepend(n),o($(" .delete-post-button",n)),new Noty({theme:"sunset",text:"Post created successfully!",type:"success",layout:"topRight",timeout:3e3,progressBar:!1}).show()},error:function(t){console.log(t.responseText)}})}))},e=function(t){return $(`<li id="post-${t.post._id}">\n        <img src="${t.user.avatar}" width="20">\n        <a href="/user/profile/${t.user._id}">${t.user.name}</a>\n        ${t.post.content}\n            <a class="delete-post-button" href="/post/delete/${t.post._id}">X</a>\n        <br>\n        <form method="POST" action="/like/toggle/?id=${t.post._id}&type=Post">\n            <button type="submit">0 Likes</button>\n        </form>\n    <p>Comments:</p>\n        <form action="/comment/create" method="POST">\n            <input type="text" id="content" name="content" placeholder="Add Comment..." required>\n            <input type="hidden" name="post" value="${t.post._id}">\n            <button type="submit">Add Comment</button>\n        </form>\n    </li>`)},o=function(t){$(t).click((function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(t){$("#post-"+t.data.data).remove(),new Noty({theme:"sunset",text:"Post deleted successfully!",type:"success",layout:"topRight",timeout:3e3,progressBar:!1}).show()},error:function(t){console.log(t.responseText)}})}))};t()}