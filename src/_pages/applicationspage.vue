<template>
  <div>
    <div id="page-wrapper">
      <div class="container-fluid">
        <h1>Hello World</h1>
      </div>
      <AffReg/>
    </div>
  </div>
</template>

<script>
import AffReg from "../components/salesComponents/AffiliateRegistration";

export default {
  name: "ownerHome",
  components: {
    AffReg
  }
};
</script>