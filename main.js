//AXIOS globals say if have whole bunch of protected routes so can't to for every single routes here comes global
axios.defaults.headers.common['X-Auth-Token']='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    //above pssed token but generally you get token on authentication and use it for matching and then accessing protected routes


// GET REQUEST
function getTodos() {

  //USiNG Promises===============

 /*axios({
  method:'get',
  url: 'https://jsonplaceholder.typicode.com/todos'
  //all data records will be shonwn to trim to 5 use params:
  ,params: {
      _limit:5
  }
})
  //.then(res=>console.log(res.data))
.then(res=>showOutput(res))
 .catch(err=>console.log('error occured: ',err));
      */

   //USiNG Promises===============


   //USiNG Other Simple Method===============

 axios
 //with a timeout of 5s of request if not fetched within this time return timeout error
        //.get('https://jsonplaceholder.typicode.com/todos?_limit=5',{timeout:5000})
 //withouttimeout:
 .get('https://jsonplaceholder.typicode.com/todos?_limit=5')
  .then(res=>showOutput(res))
  .catch(err=>console.error(err));
  
   //USiNG Other Simple Method===============
}

// POST REQUEST
function addTodo() {

//USiNG Promises===============
/*
 axios({
  method:'post',
  url: 'https://jsonplaceholder.typicode.com/todos',
  //as sending data so need data key values to send data
  data: {
    title:'New todo by ATul',
    completed: false
  }
})
  //.then(res=>console.log(res.data))
.then(res=>showOutput(res))
 .catch(err=>console.log('error occured: ',err));
      */
   //USiNG Promises===============

   //USiNG Other Simple Method==Passing data obj as parameter with .post request=============
   axios
   .post('https://jsonplaceholder.typicode.com/todos',{
    title:'New todo by ATul',
    completed: false
  })
   .then(res=>showOutput(res))
   .catch(err=>console.error(err)); 
   //USiNG Other Simple Method===============

  }


// PUT/PATCH REQUEST
//can use any of put or patch only difference is;
    //PUT will update all the data completely while Patch is sort of updation udating only requested part
    //we pass keyId to update the data
   
    function updateTodo() { 
//USiNG Put= this will update that particular (todos/1 here id=1) data block completely say will remove other keys and values otherthan newly updated one==============

/*
axios
   .put('https://jsonplaceholder.typicode.com/todos/1',{
    title:'updated todo by ATul',
    completed: true
  })
   .then(res=>showOutput(res))
   .catch(err=>console.error(err)); 
   */

    //IT REMOVED USERID FROM ID1 DATA
//USiNG PUT ENDS===============

   //USiNG PATCH=====it also takes id but only updates requested key do not delete rest keys=============
   
   axios
   .patch('https://jsonplaceholder.typicode.com/todos/1',{
    title:'updated todo by ATul',
    completed: true
  })
   .then(res=>showOutput(res))
   .catch(err=>console.error(err));
   //USiNG Other Simple Method===============

  
}

// DELETE REQUEST
function removeTodo() {
  axios
   .delete('https://jsonplaceholder.typicode.com/todos/1')
   .then(res=>showOutput(res))
   .catch(err=>console.error(err));
}

// SIMULTANEOUS DATA: when need to get various different datasets simultaneously(together in one call)
function getData() {
  //USE axios.all lets say get 5-5 data of todos and posts ===acts similar to promise.all by passing in array 
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
  ,axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
])
   .then(axios.spread((todos,posts)=>showOutput(posts)))
   .catch(err=>console.error(err));
}

// CUSTOM HEADERS: basically (access protected routes after login )used when have authentication using json tokens validated login and get auth. token 
// then sending that token in the header to access the protected routes
//Showing below to add tokens to custom header and using them to access post method only after token found

function customHeaders() {
  //say to make posts you need to be logged in first.....
  const config={
    headers:{ //header that we want
      'Content-Type':'application/json',
      Authorization: 'sometoken'
    }
  }
  axios
  .post('https://jsonplaceholder.typicode.com/todos',{
   title:'New todo by ATul',
   completed: false
 },config)
  .then(res=>showOutput(res))
  .catch(err=>console.error(err)); 

}

// TRANSFORMING REQUESTS & RESPONSES ...rarely used to transform request/response in some sort of format
function transformResponse() {
  //transforming 'post' data into uppercase no matter what we send
  const options={
    method:'post',
    url:'https://jsonplaceholder.typicode.com/todos',
    data:{
      title:'Hello World this is transformed data'
    },
    transformResponse: axios.defaults.transformResponse.concat(data=>{
      data.title=data.title.toUpperCase();
      return data;
    })
  } 
  axios(options).then(res=>showOutput(res))
}

// ERROR HANDLING==handling  error doing something say ib gewt request
function errorHandling() {
  axios
  .get('https://jsonplaceholder.typicode.com/todos?_limit=5')
  .then(res=>showOutput(res))
  .catch(err=>{
    if(err.response){
      //i.e server responded with a status other than 200 range which is success range
          // console.log(err.response.data)
          // console.log(err.response.status)
          // console.log(err.response.headers)
      if(err.response.status===404)
        alert('Error: Page not found');    
    } else if(err.request){
      console.error(err.request);
    } else{
      console.error(err.message);
    }
  });

}

// CANCEL TOKEN===>if for any reason you want to cancel the request 
function cancelToken() {
  const source=axios.CancelToken.source();
  axios
  .get('https://jsonplaceholder.typicode.com/todos',{
    cancelToken:source.token
  })
  .then(res=>showOutput(res))
  .catch(thrown=>{
    if(axios.isCancel(thrown)){
      console.log('Request Cancelled', thrown.message);
    }
  });
  if(true){
    source.cancel('Request Cancelled');
  }
}

// INTERCEPTING REQUESTS & RESPONSES i.e intersepting timestamp printing log time of click time
axios.interceptors.request.use(config=>{
  console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${(new Date().getTime())/1000}`);
  return config;
},error=>{
  return Promise.reject(error);
})

// AXIOS INSTANCES ====say getting /comments instance from jsonholder api....
const axiosInstance=axios.create({
  //other custom settings
baseURL: 'https://jsonplaceholder.typicode.com'
});
//tagging with axios instance
axiosInstance.get('/comments').then(res=>showOutput(res));


// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
