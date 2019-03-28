<template>
  <div>
    <div id="page-wrapper">
      <div class="container-fluid">
        <h1>Hello World</h1>
      </div>
      <applicationslist/>
    </div>
  </div>
</template>

<script>
import applicationslist from "../components/salesComponents/applicationslist";

export default {
  name: "ownerHome",
  components: {
    applicationslist
  }
};
</script>