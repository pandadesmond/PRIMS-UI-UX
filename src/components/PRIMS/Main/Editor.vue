<template>
    <form autocorrect="off" autocapitalize="off" autocomplete="off" :spellcheck="spellcheck">
      <q-editor
        ref="editorRef"
        :readonly="readonly"
        :disable="readonly"
        @paste="onPaste"
        @input="handleChange"
        v-model="editor"
      />
    </form>
</template>

<script>
export default {
    props:['pass_value','spellcheck','readonly'],
    data(){
        return{
            editor: this.pass_value,
        }
    },
    methods: {
        handleChange(event){
            this.$emit('update:pass_value',event.target.innerHTML);
            this.$emit('receiveChange',event.target.innerHTML);
        },
        onPaste (evt) {
            if (evt.target.nodeName === 'INPUT'){
                return
            }

            evt.preventDefault()
            evt.stopPropagation()

            var text, onPasteStripFormattingIEPaste;

            if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
                text = evt.originalEvent.clipboardData.getData('text/plain')
                this.$refs.editorRef.runCmd('insertText', text)
            }
            else if (evt.clipboardData && evt.clipboardData.getData) {
                text = evt.clipboardData.getData('text/plain')
                this.$refs.editorRef.runCmd('insertText', text)
            }
            else if (window.clipboardData && window.clipboardData.getData) {
                if (!onPasteStripFormattingIEPaste) {
                    onPasteStripFormattingIEPaste = true
                    this.$refs.editorRef.runCmd('ms-pasteTextOnly', text)
                }
                onPasteStripFormattingIEPaste = false
            }
        }
    },
    watch:{
        pass_value(newVal)
        {
            this.editor = newVal;
        }
    }
}
</script>

<style scoped>
.q-editor--disabled >>> .q-editor__inner > .q-editor__control
{
  background-color: #ebebeb !important;
}
</style>