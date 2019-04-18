<template>
  <div>
    <form>
      <div class="white-box form-body form-material">

                  <div class="row float-right">
        <div class="row float-right">
<toggle-button :value="false" color="green" :sync="true" :width="120" :labels="{checked: 'Approved!', unchecked: 'Click to Approve'}" />

</div>

</div>

        <h3 class="box-title">Address</h3>

        <hr class="m-t-0 m-b-40">
        <!--/row-->
        <div class="row">
          <div class="col-md-6">
            <div class="form-group row">
              <label class="control-label text-right col-md-3">Address 1</label>
              <div class="col-md-9">
                <input type="text" class="form-control">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group row">
              <label class="control-label text-right col-md-3">Address 2</label>
              <div class="col-md-9">
                <input type="text" class="form-control">
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group row">
              <label class="control-label text-right col-md-3">City</label>
              <div class="col-md-9">
                <input type="text" class="form-control">
              </div>
            </div>
          </div>
          <!--/span-->
          <div class="col-md-6">
            <div class="form-group row">
              <label class="control-label text-right col-md-3">State</label>
              <div class="col-md-9">
                <input type="text" class="form-control">
              </div>
            </div>
          </div>
          <!--/span-->
        </div>
        <!--/row-->
        <div class="row">
          <div class="col-md-6">
            <div class="form-group row">
              <label class="control-label text-right col-md-3">Post Code</label>
              <div class="col-md-9">
                <input type="text" class="form-control">
              </div>
            </div>
          </div>
          <!--/span-->
          <div class="col-md-6">
            <div class="form-group row">
              <label class="control-label text-right col-md-3">Country</label>
              <div class="col-md-9">
                <select class="form-control custom-select">
                  <option>Country 1</option>
                  <option>Country 2</option>
                </select>
              </div>
            </div>
          </div>
          <!--/span-->
        </div>
        <!--/row-->
      </div>
      <div>
        <span class="badge badge-pill badge-info float-right">
          <i class="ti-plus"></i>Add another location
        </span>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "practicefields",
  data() {
    return {};
  },
  components: {}
};
</script>
<style scoped>
.badge {
  cursor: pointer;
}
</style>