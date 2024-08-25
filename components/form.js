import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import shortid from 'react-id-generator'
import colors from '../src/utils/colors'

const form = ({ citas, setCitas, SaveShowForm, SaveCitasStorages }) => {
    //variables para el formulario
    const [paciente, SavePaciente] = useState('');
    const [propietario, SavePropietrario] = useState('');
    const [Telefono, SaveTelefono] = useState('');
    const [Fecha, SaveFecha] = useState('');
    const [hora, SaveHora] = useState('');
    const [sintomas, Savesintomas] = useState('');

    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [isTimePickerVisible, setTimePickerVisible] = useState(false);

    //mostrar u ocultar el date picker
    const showDatePicker = () => {
        setDatePickerVisible(true);
    }

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    }

    const ConfirmDate = date => {
        const opciones = {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        }
        SaveFecha(date.toLocaleDateString('es-Es', opciones))
        hideDatePicker();
    };

    //mostrar u ocultar el time picker
    const showTimePicker = () => {
        setTimePickerVisible(true);
    }

    const hideTimePicker = () => {
        setTimePickerVisible(false);
    }

    const confirmHour = hour => {
        const opciones = {
            hour: 'numeric',
            minute: '2-digit',
            hour12: false
        }
        SaveHora(hour.toLocaleString('es-Es', opciones));
        hideTimePicker();
    }

    //crear nueva cita
    const NewCita = () => {
        //validacion
        if (paciente.trim() === '' || propietario.trim() === '' || Telefono.trim() === '' || Fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            //fala
            ShowError();
            return;
        }

        //creando nueva cita
        const cita = { paciente, propietario, Telefono, Fecha, hora, sintomas }
        cita.id = shortid();

        const newcita = [...citas, cita];
        setCitas(newcita);

        SaveCitasStorages(JSON.stringify(newcita))
        SaveShowForm(false);

        //form reset
        Savesintomas('');
        SavePropietrario('');
        SavePaciente('');
        SaveHora('');
        SaveFecha('');
        SaveTelefono('');
    }

    const ShowError = () => {
        Alert.alert(
            'Error', //title
            'Todos los campos son obligatorios', //message
            [{
                text: 'OK' //botones
            }]
        )
    }

    return (
        <>
            <ScrollView style={styles.form}>
                <View>
                    <Text style={styles.label}>Paciente: </Text>
                    <TextInput style={styles.input} onChangeText={text => SavePaciente(text)}></TextInput>
                </View>
                <View>
                    <Text style={styles.label}>Dueño: </Text>
                    <TextInput style={styles.input} onChangeText={text => SavePropietrario(text)}></TextInput>
                </View>
                <View>
                    <Text style={styles.label}>Télefono: </Text>
                    <TextInput style={styles.input} onChangeText={text => SaveTelefono(text)} keyboardType="numeric"></TextInput>
                </View>
                <View>
                    <Text style={styles.label}>Fecha: </Text>
                    <Button title="Seleccionar fecha " onPress={showDatePicker} />
                    <DateTimePicker
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={ConfirmDate}
                        onCancel={hideDatePicker}
                        locale="es_Es"
                        headerTextIOS="Elige la fecha"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Aceptar"
                    />
                    <Text>{Fecha}</Text>
                </View>

                <View>
                    <Text style={styles.label}>Hora: </Text>
                    <Button title="Seleccionar Hora" onPress={showTimePicker} />
                    <DateTimePicker
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={confirmHour}
                        onCancel={hideTimePicker}
                        locale="es_Es"
                        headerTextIOS="Elige una hora"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Aceptar"
                    />
                    <Text>{hora}</Text>
                </View>

                <View>
                    <Text style={styles.label}>Síntomas: </Text>
                    <TextInput multiline style={styles.input} onChangeText={text => Savesintomas(text)}></TextInput>
                </View>

                <View>
                    <TouchableHighlight onPress={() => NewCita()} style={styles.btnSubmit}>
                        <Text style={styles.textSubmit}>Crear una cita</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    form: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit: {
        padding: 10,
        backgroundColor:colors.BUTTON_COLOR,
        marginVertical: 10
    },
    textSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default form;
 
