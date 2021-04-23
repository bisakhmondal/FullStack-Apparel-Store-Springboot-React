import React from 'react'

const LandingPage = () => {
    return (
<div class="jumbotron" style={{minHeight:"100vh"}}>
  <h1 class="display-2" style={{textAlign:"center"}}>B Store</h1>
  <p class="lead" style={{textAlign:"center"}}>Where fashion follows you!!</p>
  <h1 class="display-4">Hello, Fashion Enthusiast!</h1>
  <p className="lead">B Store - A store of huge collections of latest and greatest clothings of wide category, just for you. </p>
  <hr class="my-4" />
  <h6>Check out out best deals...</h6>
  <p class="lead">
    <a class="ant-btn ant-btn-primary ant-btn-lg" style={{borderRadius:20}} href="/store" >Enter Into Store</a>
  </p>
</div>
    )
}

export default LandingPage
