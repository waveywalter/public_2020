<template>

   <div class="card">
       
                            <div class="card-body p-b-0">
                                <h4 class="card-title">Read and Sign these forms.</h4>
  
                            <!-- Nav tabs -->
                            <ul class="nav nav-tabs customtab" role="tablist">
                                <li class="nav-item"> <a class="nav-link show active" data-toggle="tab" href="#form1" role="tab" aria-selected="true"><span class="hidden-sm-up"><i class="ti-home"></i></span> <span class="hidden-xs-down">Accident Reporting</span></a> </li>
                                <li class="nav-item"> <a class="nav-link show " data-toggle="tab" href="#form2" role="tab" aria-selected="false"><span class="hidden-sm-up"><i class="ti-user"></i></span> <span class="hidden-xs-down">Background Screening</span></a> </li>
                                <li class="nav-item"> <a class="nav-link show" data-toggle="tab" href="#form3" role="tab" aria-selected="false"><span class="hidden-sm-up"><i class="ti-email"></i></span> <span class="hidden-xs-down">CDC Fact Sheet</span></a> </li>
                            </ul>
                            <!-- Tab panes -->
                            <div class="tab-content">
                                <div class="tab-pane show active" id="form1" role="tabpanel">
                                    <div class="p-20">
                                       <div>
                                        <h2>Accident Reporting Procedure</h2>
                                        <ul>
                                        <li>Notify Clinical Director and/or available clinical office staff who will administer First Aid or call 911.</li>
                                        <li>Clinical office staff will follow the call order and advise of incident immediately. Post accident drug/alcohol testing is required. All injuries are required to be reported immediately.</li>
                                        <li>Clinical office staff will complete an Incident Report Form and submit to Administration.</li>
                                        <li>A Safety Consultant will be contacting injured person(s) for specifics.</li>
                                        </ul>
                                        <div>
                                                                <div class="icheckbox_square-red checked" style="position: relative;"><input type="checkbox" class="check" id="square-checkbox-1" data-checkbox="icheckbox_square-red" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div>
                                                                <label for="square-checkbox-1" class="">Checkbox 1</label>
                                                            </div>
                                        <div class="custom-control custom-checkbox mr-sm-2 mb-3">
                                        <input type="checkbox" class="custom-control-input" id="checkbox0" value="check">
                                        <label class="custom-control-label" for="checkbox0">I have received and reviewed the Accident Reporting Procdure.</label>
                                    </div>
                                        </div>
                                        <button class="btn btn-primary">Sign Form</button>
                                    </div>
                                </div>
                                <div class="tab-pane p-20 " id="form2" role="tabpanel">2</div>
                                <div class="tab-pane p-20" id="form3" role="tabpanel">3</div>
                            </div>
                        </div>
    </div>

</template>
<script>

    export default {
        name: "practicefields",
                data(){
            return{
            }
        },
        components: {

        }
    }
</script>
<style scoped>

</style>