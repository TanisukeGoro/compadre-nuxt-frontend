<template>
    <v-app>
        <CustomButtonWithProps
            :button-text="'I\'m a button'"
            :button-text-color="'red'"
            :show-icon-before="true"
            :show-icon-after="true"
        />
        <CustomButtonWithSlots>
            <template v-slot:icon-before>
                <i class="fas fa-user"></i>
            </template>
            <template v-slot:button-text>
                Completely different text
            </template>
            <template v-slot:icon-after>
                <i class="fas fa-cog"></i>
            </template>
        </CustomButtonWithSlots>
    </v-app>
</template>

<script>
import CustomButtonWithProps from '~/components/test/CustomButtonWithProps'
import CustomButtonWithSlots from '~/components/test/CustomButtonWithSlots'
export default {
    components: {
        CustomButtonWithProps,
        CustomButtonWithSlots
    }
}
</script>
