import React from "react"
import { Text, StyleSheet, View, TouchableHighlight } from "react-native"

const cita = ({ item, deleteClient }) => {
    const deleteText = id => {
        console.log("deleting....", id);
        deleteClient(id);
    }
    return (
        <View style={styles.cita}>
            <View>
                <Text style={styles.label}>Paciente: </Text>
                <Text style={styles.text}>{item.paciente}</Text>
            </View>
            <View>
                <Text style={styles.label}>Propietario: </Text>
                <Text style={styles.text}>{item.propietario}</Text>
            </View>
            <View>
                <Text style={styles.label}>Síntomas: </Text>
                <Text style={styles.text}>{item.sintomas}</Text>
            </View>

            <View>
                <TouchableHighlight onPress={() => deleteText(item.id)} style={styles.btnDelete}>
                    <Text style={styles.deleteText}>Eliminar &times;</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cita:{
        backgroundColor: '#FFF',
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    label:{
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    text:{
        fontSize: 18
    },
    btnDelete:{
        padding: 10,
        backgroundColor: 'red',
        marginVertical: 10
    },
    deleteText:{
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default cita;