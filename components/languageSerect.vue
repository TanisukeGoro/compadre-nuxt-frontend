<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-combobox
                    v-model="select"
                    :items="items"
                    label="Target language"
                ></v-combobox>
                <template v-slot:selection="data">
                    <v-chip
                        :key="JSON.stringify(data.item)"
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        :disabled="data.disabled"
                        @click.stop="data.parent.selectedIndex = data.index"
                        @click:close="data.parent.selectItem(data.item)"
                    >
                        <v-avatar class="accent white--text" left>
                            {{ data.item.slice(0, 1).toUpperCase() }}
                        </v-avatar>
                        {{ data.item }}
                    </v-chip>
                </template>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            select: 'Japanese',
            items: [
                'Japanese',
                'English',
                'Chinese',
                'Korean',
                'Russian',
                'Portuguese',
                'Spanish',
                'French',
                'German',
                'Italian',
                'Malay',
                'Tagalog',
                'Vietnamese',
                'Thai',
                'Formosan',
                'other'
            ]
        }
    }
}
</script>
