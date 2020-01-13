<template>
<div>
    <b-table :stacked=vertical borderless fixed :items="convertForTable"></b-table>
</div>

</template>

<script>
export default {
    props: {
        item: Object,
        type: String,
        vertical: Boolean
    },
    computed: {
        convertForTable() {
            var value = null
            if (this.type === 'display') {
                value = this.convertDisplay()
            } else if (this.type === 'movie') {
                value = this.convertMovie()
            }
            return value
        }
    },
    methods: {
        toggle(){
            this.hor= !this.hor
        },
        convertDisplay() {
            var display = {
                "Date": this.item.starts_at.toLocaleDateString(),
                "Time": this.item.starts_at.toLocaleTimeString(),
                "Movie": this.item.movie.title,
                "Hall": this.item.hall.title
            }
            return [display]
        },
        convertMovie() {
            var movie = {
                "Title": this.item.title,
                "Genre": this.listString(this.item.genres),
                "Prod. Company": this.listString(this.item.prodComps),
                "Year": this.item.year,
                "Duration": this.item.duration,
                "Description": this.item.description
            }
            return [movie]
        },
        listString(arr) {
            var ret = ''
            arr.forEach(item => {
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
