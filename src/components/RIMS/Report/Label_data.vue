<template>
<div class="row" style="margin:2px;">
    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <Label :text="json_container.label1" />
    </div>
    <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 label_data">
        <Basiclabel style="word-break: break-word;" :text="json_container.label2 != '' ? json_container.label2 : '-'" />
    </div>
</div>
</template>

<script>
import Label from 'src/components/RIMS/Base/Label';
import Basiclabel from 'src/components/Base/Label';
// import Input from 'src/components/RIMS/Base/Input';

export default {
    name: "Label_input",
    data() {
        return {
            json_container: this.json,
        };
    },
    props: ['json'],
    computed: {},
    components: {
        Label,
        Basiclabel
    },
    methods: {

    },
    watch: {

    }
}
</script>

<style scoped>
.label_title {
    min-width:105px;
}

.label_data {
    padding-left:5px;
}
</style>
