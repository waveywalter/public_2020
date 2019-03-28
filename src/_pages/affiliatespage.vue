<template>
    <div>
        <div id="page-wrapper">
                  <div class="container-fluid">

        <h1>Hello World</h1>
        <affiliateApplication/>
        </div>
        </div>
        </div>
</template>

<script>
import affiliateApplication from '../components/affiliateComponents/affiliateApplication'

    export default {
        name: "ownerHome",
        components: {
            affiliateApplication
        }
    }

</script>