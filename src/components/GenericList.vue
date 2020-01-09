<template>
<div>
    <b-row>
        <b-col><b>{{ title }}:</b></b-col>
    </b-row>
    <b-row>
        <b-col>{{ listString }}</b-col>
    </b-row>
</div>
</template>

<script>
export default {
    props: {
        title: String,
        items: Array
    },
    methods: {
        formatList() {

        }
    },
    computed: {
        listString: function () {
            var ret = ''
            this.items.forEach(item => {
                ret += item.name + ', '

            });
            if (ret.length > 2) {
                ret = ret.substr(0, ret.length - 2)
            }
            return ret
        }
    }
}
</script>

<style>

</style>
