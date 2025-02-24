<script>

	import Particles from "./Particles.svelte";

</script>
<div>
  <h1>&gt; floof<span id="blink">_</span></h1>
  <h2>18, he/him</h2>
  <p>i like making things. not well though.</p>
  <p>projects coming... soon... probably</p>
</div>
<Particles />

<style>
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');

  div {
    z-index: 10;
    position: absolute;
    width: fit-content;
    max-width: 50%;
    position: absolute;
    padding: 16px;
    bottom: 0;
    left: 0;
    font-family: 'JetBrains Mono', monospace;
  }

  p, h1, h2 {
    margin: 0;
  }

  h1 {
    font-size: 1.5em;
    line-height: 1.25em;
    color: #e9ebff;
  }

  h2 {
    font-size: 1em;
    color: #e9ebff;
    margin-bottom: 8px;
  }

  #blink {
    animation: blink 1.5s infinite;
  }

  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
</style>