<template>
<div>
    <b-table :stacked=vertical borderless responsive :items="convertForTable"></b-table>
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
            // const tickets = this.item.tickets
            // const classic = this.item.hall.seats.filter(seat => seat.seatType.id === 1)
            // const vip = this.item.hall.seats.filter(seat => seat.seatType.id === 2)
            // const love = this.item.hall.seats.filter(seat => seat.seatType.id === 3)

            // var classicFree = classic.length - this.countTaken(classic, tickets)
            // var vipFree = vip.length - this.countTaken(vip, tickets)
            // var loveFree = love.length - this.countTaken(love, tickets)
            return [{
                    type: "Classic",
                    price: this.item.prices[0].price,
                    free: 0,
                    total: 0,
                    _rowVariant: 'primary'
                },
                {
                    type: "VIP",
                    price: this.item.prices[1].price,
                    free: 0,
                    total: 0,
                    _rowVariant: 'success'
                },
                {
                    type: "Love",
                    price: this.item.prices[2].price,
                    free: 0,
                    total: 0,
                    _rowVariant: 'danger'
                }
            ]
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
