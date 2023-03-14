const { json } = require("body-parser");

let getButton = document.getElementById("get");
let postButton = document.getElementById("post");

getButton.addEventListener("click", () => {
  fetch("http://localhost:8080/feed/posts")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((resData) => {
      console.log(resData, "resdata");
    })
    .catch((err) => {
      console.log(err);
    });
});
// output :-
// {
//   "posts": [
//       {
//           "title": "First Post",
//           "content": "This is the first post !!"
//       }
//   ]
// }

postButton.addEventListener("click", () => {
  fetch("http://localhost:8080/feed/post", {
    method: "POST",
    body: JSON.stringify({
      title: "A codepen Post",
      content: "Created via Codepen",
    }),
    // headers: {
    //   'Content-Type':'application/json'
    // }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((resData) => {
      console.log(resData, "resdata");
    })
    .catch((err) => {
      console.log(err);
    });
});

// output :-
// {
//   "message": "Post created successfully !",
//   "post": {
//       "id": "2023-01-02T04:45:10.946Z"
//   }
// }
