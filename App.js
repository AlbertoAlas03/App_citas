import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
import Cita from "./components/cita"
import Form from './components/form'
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "./src/utils/colors"

const App = () => {
  //state citas
  const [citas, setCitas] = useState([]);
  const [ShowForm, SaveShowForm] = useState(false);

  useEffect(() => {
    const obtenerCitasStorage = async () => {
      try {
        const citasStorage = await AsyncStorage.getItem('citas')
        if (citasStorage) {
          setCitas(JSON.parse(citasStorage))
        }
      } catch (error) {
        console.log(error);
      }
    }
    obtenerCitasStorage();
  }, []);

  //eliminacion de pacientes
  const deletePaciente = id => {
    const citasFiltradas = citas.filter(cita => cita.id !== id)
    setCitas(citasFiltradas);
    SaveCitasStorage(JSON.stringify(citasFiltradas));
  }

  //mostrar u ocultar el formulario
  const showform = () => {
    SaveShowForm(!ShowForm);
  }

  //ocultando el teclado
  const CloseKeyboard = () => {
    Keyboard.dismiss();
  }

  //guardar citas en storage
  const SaveCitasStorage = async (citasJSON) => {
    try {
      await AsyncStorage.setItem('citas', citasJSON)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => CloseKeyboard()}>
      <View style={styles.container}>
        <Text style={styles.title}>Administrador de citas</Text>
        <View>
          <TouchableHighlight onPress={() => showform()} style={styles.btnShowForm}>
            <Text style={styles.textShowForm}>{ShowForm ? 'Cancelar Cita' : 'Crear nueva cita'}</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.content}>
          {ShowForm ? (
            <>
              <Text style={styles.title}>Crear nueva cita</Text>
              <Form
                citas={citas}
                setCitas={setCitas}
                SaveShowForm={SaveShowForm}
                SaveCitasStorages={SaveCitasStorage}
              />
            </>
          ) : (
            <>
              <Text style={styles.title}>{citas.length > 0 ? 'Administrar tus citas' : 'No hay citas, agregue una'}</Text>
              <FlatList
                style={styles.list}
                data={citas}
                renderItem={({ item }) => <Cita item={item} deleteClient={deletePaciente} />}
                keyExtractor={cita => cita.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback >
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY_COLOR,
    flex: 1
  },
  title: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  content: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  list: {
    flex: 1,
  },
  btnShowForm: {
    padding: 10,
    backgroundColor: colors.BUTTON_COLOR,
    marginVertical: 10
  },
  textShowForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});


export default App