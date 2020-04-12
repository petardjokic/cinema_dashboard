<template>
<div>
    <b-table :stacked=vertical borderless responsive :items="convertForTable"></b-table>
</div>
</template>

<script>
export default {
    data() {
        return {
            variants: ['warning', 'danger', 'success', 'light']
        }
    },
    props: {
        item: Object,
        type: String,
        vertical: Boolean
    },
    computed: {
        convertForTable() {
            var value = null
            if (this.type === 'display') {
                this.convertTicket()
                value = this.convertDisplay()
            } else if (this.type === 'movie') {
                value = this.convertMovie()
            } else if (this.type === 'ticket') {
                value = this.convertTicket()
            }
            return value
        }
    },
    methods: {
        convertDisplay() {
            var display = {
                date: this.item.startsAt,
                time: this.item.startsAt,
                movie: this.item.movie.title,
                hall: this.item.hall.name
            }
            return [display]
        },
        convertMovie() {
            var movie = {
                title: this.item.title,
                genres: this.listString(this.item.genres),
                productionCompanies: this.listString(this.item.productionCompanies),
                releaseYear: this.item.releaseYear,
                duration: this.item.duration,
                description: this.item.description
            }
            return [movie]
        },
        convertTicket() {
            var arr = []
            var br = 0
            this.item.prices.forEach(displayPrice => {
                arr.push({
                    seat: displayPrice.seatType.name,
                    price: displayPrice.price,
                    _rowVariant: this.variants[br++ % 4]
                })
            });
            return arr
        },
        countTaken(type, tickets) {
            var typeTaken = []
            type.forEach(seat => {
                var arr = tickets.filter(ticket => ticket.seatId === seat.id)
                typeTaken.push(...arr)
            })
            return typeTaken.length
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
