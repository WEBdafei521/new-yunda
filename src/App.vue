<template>
  <div id="app">
    
    <!-- <div class="l-bg-img">
      <img style="width:100%;height:100%;" src="./assets/login-bg.jpg" alt="" srcset="">
    </div> -->
    <transition>
			<router-view/>
		</transition>
  </div>
</template>

<script>

export default {
  
  name: 'App',
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
.l-bg-img{
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: -1;
}
</style>
