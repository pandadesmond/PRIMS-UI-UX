
<template>

      <q-select
        filled
        v-model="bind_value"
        use-input
        input-debounce="0"
        :options="bind_options"
        @filter="filterFn"
        behavior="menu"
        :rules="dbComponentBehavior.rules"
        @update:model-value ="handleChange"
        :placeholder="bind_value ? '' : dbComponentBehavior.label"
        map-options
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>

</template>

<script>
export default {
    data ()
    {
        return{
            bind_options: this.options,
            bind_value: this.pass_value,
        }
    },
    props: ['options', 'pass_value', 'dbComponentBehavior'],
    methods:{
        handleChange(newVal)
        {
            if(Object.keys(newVal).length >= 2)
            {
                newVal = newVal.value;
            }
            this.$emit('receiveChange', newVal)
            this.$emit('update:pass_value', newVal)
        },
        filterFn (val, update) {
            if (val === '') {
                update(() => {
                    this.bind_options = this.options
                })
                return
            }

            update(() => {
                const needle = val.toLowerCase()

                // var filter = this.bind_options.filter((v)=>{
                //     return v.value.toLowerCase().indexOf(needle) > -1
                // });
                // console.log(filter);
                this.bind_options = this.options.filter(v => v.value.toLowerCase().indexOf(needle) > -1 ||  v.label.toLowerCase().indexOf(needle) > -1)
            })
        }
    },
    watch:{
        pass_value(newVal)
        {
            //new add in
            var filter_value = this.options.filter((entry)=>{
                return entry.value == newVal
            });

            this.bind_value = filter_value[0]
        }
    }
}
</script>

<style scoped>
* >>> .q-field__native
{
    flex-wrap: unset;
}

.q-field
{
    padding-top:0px;
    padding-left:0px;
    padding-right:0px;
    padding-bottom:0px;
}

.q-field--error
{
    padding-bottom:20px;
}

/* For text input border colour */
* >>> .q-field__inner
{
    border: 1px solid #d2d6de;
}

/* when hover on text input */
.q-field--filled >>> .q-field__control:before {
    background: white;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    opacity: 0;
    transition: opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1), background 0.36s cubic-bezier(0.4, 0, 0.2, 1); */
}

/* readonly field
.q-field--readonly >>> .q-field__control:before
{
    background: yellow ;
} */

/* readonly field*/
.q-field--filled.q-field--readonly >>> .q-field__control:before {
    opacity: 1;
    background: #ccc;
    border-bottom-style: none;
}


/* hide error message when no error validation*/
.q-field >>> .q-field__bottom
{
    display: none;
}

.q-field--error >>> .q-field__bottom
{
    display: block;
}

* >>> .q-field__bottom {
    padding: 3px 0px 0;
}

/* .q-field
{
    height: 42px;
} */

* >>> .q-field__control
{
    height: 42px;
    min-height: 42px;
}

* >>> .q-field__append
{
    height: 42px;
}

/* * >>> .field__inner {
    border: 1px solid #d2d6de !important;
} */

* >>> .q-field__native
{
    height: 42px;
    min-height: 42px;
}

* >>> .q-field__control
{
    border-bottom: 1px solid #d2d6de !important;
}

/* to make description too long can scroll */
* >>> .q-field__control-container
{
    overflow-y: scroll;
}

* >>> .q-field__control-container::-webkit-scrollbar {
    display: none;
}

/* top and bottom over, it will cannot see top and bottom when description is 3 line */
* >>> .q-field__control-container > .q-field__native > span
{
    height: 100%;
    padding-top: 7px;
}

</style>