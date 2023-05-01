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
                <v-card-title align="center">
                    <span class="text-h4 font-weight-bold" >{{ objectTitle }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-col justify="center" align="center">
                            <v-row cols="12" class="fill-space">
                                <v-text-field v-model="roomName" label="Room name*" required/>
                            </v-row>
                            <v-row cols="12" class="fill-space">
                                <v-text-field v-model="device1" label="Device 1*" required/>
                            </v-row>
                            <v-row cols="12" class="fill-space">
                                <v-text-field v-model="device2" label="Device 2"/>
                            </v-row>
                            <v-row cols="12" class="plus-btn" >
                                <v-btn icon="mdi-plus" density="comfortable"/>
                            </v-row>
                            <v-row cols="12" class="fill-space">
                                <v-select :items="['Bedroom', 'Kitchen', 'Living Room', 'Bathroom', 'Garden']" 
                                v-model="roomType" 
                                label="Type*" 
                                required/>
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
                    <v-btn color="blue-darken-1" variant="text" @click="saveRoom">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
    import { ref, defineEmits } from 'vue'

    const dialog = ref(false);
    const roomName = ref('');
    const device1 = ref('');
    const device2 = ref('');
    const roomType = ref('');
    const roomTypes = ref(['Bedroom', 'Kitchen', 'Living Room', 'Bathroom', 'Garden']);
    const emit = defineEmits(['update:modelValue']);

    function saveRoom() {
        const newRoom = {
            
            name: roomName.value,
            device1: device1.value,
            device2: device2.value,
            type: roomType.value
        }
        emit('saveRoom', newRoom);
        dialog.value = false;
        // Reset form values
        roomName.value = '';
        device1.value = '';
        device2.value = '';
        roomType.value = '';
    }


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