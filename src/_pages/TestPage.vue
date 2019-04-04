<template>
    <div>
     <h1>testpage test</h1>
   <v-container
      id="scroll-target"
      style="max-height: 400px"
      class="scroll-y"
    >
      <v-layout
        v-scroll:#scroll-target="onScroll"
        column
        align-center
        justify-center
        style="height: 1000px"
      >
      </v-layout>
    </v-container>
    </div>
</template>

<script>
export default {
    name: 'Testpage'
}

</script>