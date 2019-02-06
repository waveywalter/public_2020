<template>
    <div>
        <!-- <link rel="stylesheet" href="/src/formBuilder/css/bootstrap.min.css"/> -->
        <!-- <link rel="stylesheet" href="/src/formBuilder/css/tether.min.css"/> -->
        <link rel="stylesheet" href="/src/formBuilder/css/form_builder.css" />


        <!-- <sideBar></sideBar>
        <topHeader></topHeader> -->
        <div id="page-wrapper" class="example">
            <div class="container-fluid">
                <nav class="">
                    <div class="clearfix">
                        <div class="container">
                            <button style="cursor: pointer;display: none" class="btn btn-info export_html mt-2 pull-right">Export
                                HTML</button>
                            <h3 class="mr-auto">Drag & Drop Bootstrap Form Builder</h3>
                        </div>
                    </div>
                </nav>
                <br />
                <div class="clearfix"></div>
                <div class="" style="margin-top: 25px">
                    <div class="">
                        <div class="col-sm-2">
                            <nav class="">
                                <ul class="">
                                    <li class="form_bal_textfield">
                                        <a href="javascript:;">Text Field </a>
                                    </li>
                                    <li class="form_bal_textarea">
                                        <a href="javascript:;">Text Area </a>
                                    </li>
                                    <li class="form_bal_select">
                                        <a href="javascript:;">Select </a>
                                    </li>
                                    <li class="form_bal_radio">
                                        <a href="javascript:;">Radio Button </a>
                                    </li>
                                    <li class="form_bal_checkbox">
                                        <a href="javascript:;">Checkbox </a>
                                    </li>
                                    <li class="form_bal_email">
                                        <a href="javascript:;">Email </a>
                                    </li>
                                    <li class="form_bal_number">
                                        <a href="javascript:;">Number </a>
                                    </li>
                                    <li class="form_bal_password">
                                        <a href="javascript:;">Password </a>
                                    </li>
                                    <li class="form_bal_date">
                                        <a href="javascript:;">Date </a>
                                    </li>
                                    <li class="form_bal_button">
                                        <a href="javascript:;">Button </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div class="col-md-5">
                            <div class="col-md-12">
                                <form class="form-horizontal" @submit.prevent="handleSubmit">
                                    <div class="preview"></div>
                                    <div style="display: none" class="form-group plain_html"><textarea ref="hrFormContent"
                                            v-model="forminfo.hrFormContent" rows="50" class="form-control"></textarea></div>
                                    <code>{{forminfo.hrFormContent}}</code>
                                    <button type="submit" class="btn btn-success waves-effect waves-light m-r-10 save-form">Submit</button>
                                </form>

                            </div>
                        </div>
                    </div>
                    <button v-on:click="getForm()" class="btn btn-success waves-effect waves-light m-r-10">Get</button>
                    <span v-if="formdata" v-html="formdata.hrFormContent"></span>
                    <div v-if="formdata">{{formdata.hrFormContent}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.example{
    min-height:0px !important;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

</style>

<script>
import TopHeader from '../components/layoutComponents/SideBar'
import SideBar from '../components/layoutComponents/TopHeader'
import { mapState, mapActions } from "vuex";

    export default {
        name: "formBuilder",
        data(){
            return{
                forminfo: {
                    hrFormContent: "",
                    hrFormTitle: "test"
                }
                
            }
        },
        computed: {
        ...mapState("form",['formdata'])
       },
        components: {
            TopHeader,
            SideBar
        },
        methods: {
            ...mapActions("form", ["saveform","getform"]),
            handleSubmit(e) {
          this.getHTML();
          
          this.$refs.hrFormContent.dispatchEvent(new Event('input'))
          this.saveform(this.forminfo);
        //   this.forminfo = {
        //     formContent: ""
        //   };
    },
    getHTML() {
        alert("start");
        var el = $('.form_builder_area .form_output');
        var html = '';
        el.each(function () {
            var data_type = $(this).attr('data-type');
            //var field = $(this).attr('data-field');
            var label = $(this).find('.form_input_label').val();
            var name = $(this).find('.form_input_name').val();
            if (data_type === 'text') {
                var placeholder = $(this).find('.form_input_placeholder').val();
                var checkbox = $(this).find('.form-check-input');
                var required = '';
                if (checkbox.is(':checked')) {
                    required = 'required';
                }
                html += '<div class="form-group"><label class="control-label">' + label + '</label><input type="text" name="' + name + '" placeholder="' + placeholder + '" class="form-control" ' + required + '/></div>';
            }
            if (data_type === 'number') {
                var placeholder = $(this).find('.form_input_placeholder').val();
                var checkbox = $(this).find('.form-check-input');
                var required = '';
                if (checkbox.is(':checked')) {
                    required = 'required';
                }
                html += '<div class="form-group"><label class="control-label">' + label + '</label><input type="number" name="' + name + '" placeholder="' + placeholder + '" class="form-control" ' + required + '/></div>';
            }
            if (data_type === 'email') {
                var placeholder = $(this).find('.form_input_placeholder').val();
                var checkbox = $(this).find('.form-check-input');
                var required = '';
                if (checkbox.is(':checked')) {
                    required = 'required';
                }
                html += '<div class="form-group"><label class="control-label">' + label + '</label><input type="email" name="' + name + '" placeholder="' + placeholder + '" class="form-control" ' + required + '/></div>';
            }
            if (data_type === 'password') {
                var placeholder = $(this).find('.form_input_placeholder').val();
                var checkbox = $(this).find('.form-check-input');
                var required = '';
                if (checkbox.is(':checked')) {
                    required = 'required';
                }
                html += '<div class="form-group"><label class="control-label">' + label + '</label><input type="password" name="' + name + '" placeholder="' + placeholder + '" class="form-control" ' + required + '/></div>';
            }
            if (data_type === 'textarea') {
                var placeholder = $(this).find('.form_input_placeholder').val();
                var checkbox = $(this).find('.form-check-input');
                var required = '';
                if (checkbox.is(':checked')) {
                    required = 'required';
                }
                html += '<div class="form-group"><label class="control-label">' + label + '</label><textarea rows="5" name="' + name + '" placeholder="' + placeholder + '" class="form-control" ' + required + '></textarea></div>';
            }
            if (data_type === 'date') {
                var checkbox = $(this).find('.form-check-input');
                var required = '';
                if (checkbox.is(':checked')) {
                    required = 'required';
                }
                html += '<div class="form-group"><label class="control-label">' + label + '</label><input type="date" name="' + name + '" class="form-control" ' + required + '/></div>';
            }
            if (data_type === 'button') {
                var btn_class = $(this).find('.form_input_button_class').val();
                var btn_value = $(this).find('.form_input_button_value').val();
                html += '<button name="' + name + '" type="submit" class="' + btn_class + '">' + btn_value + '</button>';
            }
            if (data_type === 'select') {
                var option_html = '';
                $(this).find('select option').each(function () {
                    var option = $(this).html();
                    var value = $(this).val();
                    option_html += '<option value="' + value + '">' + option + '</option>';
                });
                html += '<div class="form-group"><label class="control-label">' + label + '</label><select class="form-control" name="' + name + '">' + option_html + '</select></div>';
            }
            if (data_type === 'radio') {
                var option_html = '';
                $(this).find('.mt-radio').each(function () {
                    var option = $(this).find('p').html();
                    var value = $(this).find('input[type=radio]').val();
                    option_html += '<div class="form-check"><label class="form-check-label"><input type="radio" class="form-check-input" name="' + name + '" value="' + value + '">' + option + '</label></div>';
                });
                html += '<div class="form-group"><label class="control-label">' + label + '</label>' + option_html + '</div>';
            }
            if (data_type === 'checkbox') {
                var option_html = '';
                $(this).find('.mt-checkbox').each(function () {
                    var option = $(this).find('p').html();
                    var value = $(this).find('input[type=checkbox]').val();
                    option_html += '<div class="form-check"><label class="form-check-label"><input type="checkbox" class="form-check-input" name="' + name + '[]" value="' + value + '">' + option + '</label></div>';
                });
                html += '<div class="form-group"><label class="control-label">' + label + '</label>' + option_html + '</div>';
            }
        });
        if (html.length) {
            $('.save-form').show();
        } else {
            $('.save-form').hide();
        }
        $('.plain_html').find('textarea').val(html);
        console.log($('.plain_html').find('textarea').val())    
    },
    getForm() {
        this.getform();
        
  },
  }
    }
</script>