<template>
    <q-select
    :v-model="cselect == undefined ? select : cselect"
    class="q-pr-sm q-pt-sm"
    color="black"
    bg-color="white"
    dense
    options-dense
    filled
    emit-value
    map-options
    :value="value"
    :options="opt.length == 0 ? options : opt"
    @update:model-value="handleChange"
    filter
    filter-placeholder="select"
    :for="id"
    :name="name"
    dropdown-icon="arrow_drop_down"
    square
    :rules="dbComponentBehavior.rules"
    @popup-show="handleClick"
    :disable="loading"
    >
      <template v-slot:selected>
        <template v-if="cselect == undefined ? select : cselect">
          {{ select_label }}
        </template>
        <template v-else>
            <div style="color: grey">{{ placeholder }}</div>
        </template>
      </template>
    </q-select>
</template>


<script>
// import Select from 'src/components/Base/Select';
  import { QSelect } from 'quasar'

export default {
    data() {
        return {
            select_label: "",
            pass_value: this.select,
            opt: [],

            // bind_loading: this.loading
        };
    },
    props: ['value', 'options', 'label', 'id', 'name','dbComponentBehavior', 'no_label', 'loading','select', 'placeholder','coptions','cselect'],
    methods: {
      handleChange (newVal) {
        this.$nextTick(()=>{
          setTimeout(()=>{
            var filter_label = [];
            var opts = this.opt.length == 0 ? this.options : this.opt;

            for (var i = 0; i < opts.length; i++) {

              if (typeof newVal == 'object'){
                newVal = newVal.category_guid;
              }

              if (opts[i].value == newVal) {
                filter_label.push(opts[i]);
              }
            }
            this.select_label = filter_label[0].label;

            this.$emit('receiveChange', newVal)
          },150)
        })
      },
      handleClick (newVal) {
        this.$emit('receiveClick', newVal)
      }
    },
    components: {
      QSelect
    },
    watch:{
      select(newVal)
      {
        if(newVal !== undefined)
        {
          this.handleChange(newVal)
        }
      },
      cselect(newVal)
      {
        if(newVal !== undefined)
        {
          this.handleChange(newVal)
        }
      },
      coptions(n) {
        if (n.length > 0) {
          this.opt = n;
        } else {
          const prevN = this.coptions;
          setTimeout(() => {
            if (this.coptions === prevN && this.coptions.length === 0) {
              this.opt = [];
            }
          }, 500);
        }
      },
    }
}
</script>

<style scoped>
/* For dropdown padding removal */
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
    background: #ededed;
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

.q-field >>> .q-field__native {
  /* max-height: 29px; */
  overflow: auto;
}

* >>> .q-field__bottom {
    padding: 3px 0px 0;
}
</style>
