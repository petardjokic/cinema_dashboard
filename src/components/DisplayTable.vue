<template>
<div>
    <b-table dark hover small responsive :table-class="`text-center text-${theme.TEXT_PRIMARY}`" :items=displays :fields=fields >
        <template v-slot:cell(date)="row">
            {{new Date(row.item.startsAt).toLocaleString().split(',')[0]}}
        </template>
        <template v-slot:cell(time)="row">
            {{new Date(row.item.startsAt).toLocaleString().split(',')[1]}}
        </template>
        <template v-slot:cell(movie)="row">
            {{row.item.movie.title}}
        </template>
        <template v-slot:cell(hall)="row">
            {{row.item.hall.name}}
        </template>
        <template v-slot:cell(status)="row">
            <span :class="`text-${resolveDisplayStatusColor(row.item)}`">{{resolveDisplayStatus(row.item)}}</span>
        </template>
        <template v-slot:cell(details)="row">
            <b-button size='sm' block variant='outline-light' :to="`displays/${row.item.id}`">Details</b-button>
        </template>
    </b-table>
</div>
</template>

<script>
import {
    Theme
} from '../_static/Theme'
export default {
    data() {
        return {
            theme: Theme,
            fields: ['date', 'time', 'movie', 'hall', 'status', 'details'],
            selected: null
        }
    },
    props: {
        displays: Array
    },
    computed: {
        items() {
            var mapped = []
            this.displays.forEach(disp => {
                if (disp != null) {
                    mapped.push({
                        id: disp.id,
                        date: disp.startsAt.split('T')[0],
                        time: disp.startsAt.split('T')[1],
                        movie: disp.movie.title,
                        hall: disp.hall.name,
                        active: disp.active
                    })
                }
            })
            return mapped
        }
    },
    methods: {
        resolveDisplayStatus(display) {
            if (!display.active)
                return 'Canceled'
            if (new Date(display.startsAt) < new Date())
                return 'Finished'
            return 'Active'
        },
        resolveDisplayStatusColor(display) {
            if (!display.active)
                return 'danger'
            if (new Date(display.startsAt) < new Date())
                return 'primary'
            return 'success'
        }
        // cancelDisplay() {
        //     const urlDisplay = cinemaApi.BASE_URL + cinemaApi.DISPLAYS + this.selected.id
        //     var displayId = this.selected.id
        //     axios.delete(urlDisplay).then(response => {
        //         this.selected = response.data
        //         this.$emit('cancelDisplay', displayId)
        //         this.$bvModal.hide('display-cancel-modal')
        //     }).catch(err => {
        //         console.log(err)
        //     })
        // }
    }
}
</script>
