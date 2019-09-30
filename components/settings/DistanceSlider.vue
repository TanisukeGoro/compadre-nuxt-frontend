<template>
    <div class="pa-4 lighten-4">
        <v-row align="center" justify="center">
            <v-col cols="12" md="6">
                <v-slider
                    v-model="openDelay"
                    label="距離"
                    min="0"
                    max="100"
                    thumb-label
                ></v-slider>
            </v-col>
        </v-row>
    </div>
</template>
