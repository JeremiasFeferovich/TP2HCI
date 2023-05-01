<template>
    <div class="add-btn">
        <v-dialog v-model="dialog" persistent width="1024">
            <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props">
                    Add
                    <v-icon
                        end
                        icon="mdi-plus-circle"
                    ></v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ objectTitle }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-col justify="center" align="center">
                            <v-row cols="12" class="fill-space">
                                <v-text-field label="Room name*" required/>
                            </v-row>
                            <v-row cols="12" class="fill-space">
                                <v-text-field label="Device 1*" required/>
                            </v-row>
                            <v-row cols="12" class="fill-space">
                                <v-text-field label="Device 2"/>
                            </v-row>
                            <v-row cols="12" class="plus-btn" >
                                <v-btn icon="mdi-plus" density="comfortable" flat="true"/>
                            </v-row>
                            <v-row cols="12" class="fill-space">
                                <v-select :items="['Bedroom', 'Kitchen', 'Living Room', 'Bathroom', 'Garden']" label="Type*" required/>
                            </v-row>
                        </v-col>
                    </v-container>
                    <small class="required">*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                        Close
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const dialog = ref(false)

    const prop = defineProps({
        objectTitle: String
    })
</script>


<style scoped>
    .add-btn {
        margin-top: 15px;
        margin-bottom: 15px;
        display: flex;
        justify-content: right;
        margin-right: 20%;

    }

    .fill-space {
        max-width: 60%;
    }

    .plus-btn {
        justify-content: center;
        margin-bottom:40px;
    }

    .required {
        color: red;
    }
</style>