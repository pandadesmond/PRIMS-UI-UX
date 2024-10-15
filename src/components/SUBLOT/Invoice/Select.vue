<template>
<q-select v-if="!no_label"
class="q-pr-sm q-pt-sm"
color="black"
bg-color="white"
dense
options-dense
filled
emit-value
map-options
:value="value"
:options="options"
:label="componentBehavior.label"
@update:model-value ="handleChange"
filter
filter-placeholder="select"
:for="id"
:name="name"
dropdown-icon="arrow_drop_down"
square
@popup-show="handleClick"
:disable="loading"
>
<template v-slot:no-option>
<q-item>
<q-item-section class="text-italic text-grey">
No options slot
</q-item-section>
</q-item>
</template>

<template v-if="this.$route.name == 'Invoice_edit'" v-slot:selected>
$
</template>
</q-select>

<q-select v-else
class="q-pr-sm q-pt-sm"
color="black"
bg-color="white"
dense
options-dense
filled
emit-value
map-options
:value="value"
:options="options"
@update:model-value ="handleChange"
filter
filter-placeholder="select"
:for="id"
:name="name"
dropdown-icon="arrow_drop_down"
square
@popup-show="handleClick"
:disable="loading"
>
<template v-slot:no-option>
<q-item>
<q-item-section class="text-italic text-grey">
No options slot
</q-item-section>
</q-item>
</template>

<template v-if="this.$route.name == 'Invoice_edit'" v-slot:selected>
$
</template>
</q-select>

</template>

<script>
import { QSelect } from 'quasar'

export default {
props: ['value', 'options', 'label', 'id', 'name','componentBehavior','no_label','loading'],
methods: {
handleChange (newVal) {
this.$emit('receiveChange', newVal)
},
handleClick (newVal) {
this.$emit('receiveClick', newVal)
}
},
components: {
QSelect
},
mounted() {
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
</style>

