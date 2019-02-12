<template>
 <div>

     <textarea :id="id" :value="defaultcontent"></textarea>

     </div>

</template>
<script>
import Vue from 'vue';
export default {
    name: 'tinymceEditor',
    props: {
        id: {
            type: String,
            default: 'tmceeditor'
        },
        defaultcontent:{
            type: String,
            default: ""
        }
    },
    data() {
        return {
            tinymceOptions: {
                selector: '#'+this.id,
  height: 200,
  menubar: true,
  plugins: [
    'advlist autolink lists link image charmap print preview hr anchor pagebreak',
    'searchreplace wordcount visualblocks visualchars code fullscreen',
    'insertdatetime media nonbreaking save table contextmenu directionality',
    'emoticons template paste textcolor colorpicker textpattern imagetools toc'
  ],
  toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor | TextInput CheckboxInput AuthInput',
  valid_elements:"*[*]",
  content_css: '',
  images_upload_url: 'postAcceptor.php',
  images_upload_base_path: '/some/basepath',
  images_upload_credentials: true,
  images_upload_handler: function (blobInfo, success, failure) {
    var xhr, formData;
    xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open('POST', 'postAcceptor.php');
    xhr.onload = function() {
      var json;

      if (xhr.status != 200) {
        failure('HTTP Error: ' + xhr.status);
        return;
      }
      json = JSON.parse(xhr.responseText);

      if (!json || typeof json.location != 'string') {
        failure('Invalid JSON: ' + xhr.responseText);
        return;
      }
      success(json.location);
    };
    formData = new FormData();
    formData.append('file', blobInfo.blob(), fileName(blobInfo));
    xhr.send(formData);
  },
  image_title: true, 
  // enable automatic uploads of images represented by blob or data URIs
  automatic_uploads: true,
  // URL of our upload handler (for more details check: https://www.tinymce.com/docs/configure/file-image-upload/#images_upload_url)
  images_upload_url: 'postAcceptor.php',
  // here we add custom filepicker only to Image dialog
  file_picker_types: 'image', 
  // and here's our custom image picker
  file_picker_callback: function(cb, value, meta) {
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    
    // Note: In modern browsers input[type="file"] is functional without 
    // even adding it to the DOM, but that might not be the case in some older
    // or quirky browsers like IE, so you might want to add it to the DOM
    // just in case, and visually hide it. And do not forget do remove it
    // once you do not need it anymore.

    input.onchange = function() {
      var file = this.files[0];
      
      // Note: Now we need to register the blob in TinyMCEs image blob
      // registry. In the next release this part hopefully won't be
      // necessary, as we are looking to handle it internally.
      var id = 'blobid' + (new Date()).getTime();
      var blobCache = tinymce.activeEditor.editorUpload.blobCache;
      var blobInfo = blobCache.create(id, file);
      blobCache.add(blobInfo);
      
      // call the callback and populate the Title field with the file name
      cb(blobInfo.blobUri(), { title: file.name });
    };
    
    input.click();
  }
            }
        }
    },
    mounted(){
        var options=$.extend(true, {}, this.tinymceOptions);
        var vm = this;
        options.setup=function(editor){
      options.selector = '#${this.id}';



    editor.addButton('AuthInput', {
      icon: 'lock',
      onclick: function (_) {
        editor.insertContent('<input type="text" name="name" id="name" placeholder="Auth Code">');
      }
    });
    editor.addButton('CheckboxInput', {
      
      icon:'checkmark',
      onclick: function (_) {
        editor.insertContent('<input type="checkbox">');
      }
    });
       
  editor.addButton('TextInput', {
      icon: 'info',
      onclick: function (_) {
        editor.insertContent('<input type="text">');
      }
    });
    
      editor.on("keyup",function(e){
        vm.$emit('input', editor.getContent());
      });
      editor.on('Change', (e) => {
        vm.$emit('input', editor.getContent());
      });
      editor.setContent(vm.defaultcontent);
    };
    
    tinymce.init(options);
    }
}

</script>

