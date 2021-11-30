<template>
  <div class="app-container p-3 bg-black m-auto">
    <StreamList />
  </div>
</template>

<script>
import StreamList from './components/StreamList'

export default {
  components: {
    StreamList
  }
}
</script>

<style lang="css">
.app-container {
  width: 380px;
  height: 700px;
  overflow: auto;
}
::-webkit-scrollbar {
    width: 10px;
}
 
/* Track */
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    -webkit-border-radius: 10px;
    box-shadow: 0cm;
    border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: rgba(110, 109, 109, 0.8); 
    box-shadow: 0cm;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
}
::-webkit-scrollbar-thumb:window-inactive {
	background: rgba(255,0,0,0.4); 
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
